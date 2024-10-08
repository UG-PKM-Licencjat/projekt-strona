import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  type DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { db } from "src/server/db";
import { eq, and } from "drizzle-orm";
import { env } from "~/env.js";
import {
  users,
  sessions,
  accounts,
  verificationTokens,
  offers,
} from "src/server/db/schema";
import logEvent from "./log";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    error?: "RefreshTokenError";
    user: {
      id: string;
      admin: boolean;
      firstName: string;
      lastName: string;
      providerAccountId: string;
      idToken: string;
      isArtist: boolean;
      registered: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    firstName: string;
    lastName: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const result = await db
        .select({
          admin: accounts.admin,
          providerAccountId: accounts.providerAccountId,
          idToken: accounts.id_token,
        })
        .from(accounts)
        .where(eq(accounts.userId, user.id))
        .limit(1);
      // console.log("result", result[0]?.admin ? true : false);
      // console.log("result", result);
      // console.log(
      //   "user",
      //   await db.select().from(accounts).where(eq(accounts.userId, user.id)),
      // );
      const [isArtist] = await db
        .select({
          isArtist: offers.userId,
        })
        .from(offers)
        .where(eq(offers.userId, user.id))
        .limit(1);

      const [registered] = await db
        .select({
          registered: users.registered,
        })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      const [googleAccount] = await db
        .select()
        .from(accounts)
        .where(
          and(eq(accounts.userId, user.id), eq(accounts.provider, "google")),
        );

      if (
        googleAccount?.refresh_token &&
        (googleAccount.expires_at ?? 0) * 1000 < Date.now()
      ) {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: env.GOOGLE_CLIENT_ID,
              client_secret: env.GOOGLE_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: googleAccount.refresh_token,
            }),
          });

          console.log("response", response);

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
            id_token: string;
          };

          await db
            .update(accounts)
            .set({
              access_token: newTokens.access_token,
              id_token: newTokens.id_token,
              expires_at: Math.floor(Date.now() / 1000) + newTokens.expires_in,
              refresh_token:
                newTokens.refresh_token ?? googleAccount.refresh_token,
            })
            .where(eq(accounts.userId, googleAccount.userId));
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          session.error = "RefreshTokenError";
        }
      }

      return {
        ...session,
        user: {
          id: user.id,
          providerAccountId: result[0]?.providerAccountId ?? "",
          image: user.image,
          name: user.name,
          idToken: result[0]?.idToken ?? "",
          firstName: user.firstName,
          lastName: user.lastName,
          admin: result[0]?.admin ? true : false,
          isArtist: isArtist?.isArtist ? true : false,
          registered: registered?.registered ? true : false,
        },
      };
    },
    signIn: async ({ user, account }) => {
      // getting new tokens from the provider

      if (!account) {
        logEvent({
          message: "account is undefined",
          tags: ["AUTH"],
        });
        return true;
      }

      const newTokens: {
        access_token: string;
        expires_at: number;
        refresh_token?: string;
        id_token: string;
      } = {
        access_token: account.access_token ?? "",
        expires_at: account.expires_at ?? 0,
        refresh_token: account.refresh_token ?? "",
        id_token: account.id_token ?? "",
      };

      if (
        Object.values(newTokens).some((value) => value === undefined) ||
        Object.values(newTokens).some((value) => value === "") ||
        newTokens.expires_at === 0
      ) {
        logEvent({
          message: "one of newTokens value is undefined",
          additionalInfo: JSON.stringify(newTokens),
          tags: ["AUTH"],
        });
        console.error("one of newTokens value is undefined", newTokens);
        return true;
      }

      await db
        .update(accounts)
        .set({
          access_token: newTokens.access_token,
          id_token: newTokens.id_token,
          expires_at: newTokens.expires_at,
          refresh_token: newTokens.refresh_token,
        })
        .where(eq(accounts.userId, user.id));
      return true;
    },
  },

  pages: {
    newUser: "/createaccount",
  },

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
