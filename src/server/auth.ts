import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthOptions, DefaultUser } from "next-auth";
import { getServerSession } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { env } from "~/env.js";
import {
  users,
  sessions,
  accounts,
  verificationTokens,
} from "src/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      admin: boolean;

      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  // interface User extends DefaultUser {
  //   firstname: string;
  //   lastname: string;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token, user }) => {
      const result = await db
        .select({
          admin: accounts.admin,
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

      return {
        ...session,
        user: {
          id: user.id,
          admin: result[0]?.admin ? true : false,
        },
      };
    },
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
