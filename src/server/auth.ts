import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthOptions, DefaultUser } from "next-auth";
import { getServerSession } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import { db } from "~/server/db";
import { accounts } from "~/server/db/schema";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

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

  interface User extends DefaultUser {
    firstname: string;
    lastname: string;
  }
  export interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    given_name?: string;
    family_name?: string;
  }
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

      const resultNames = await db
        .select({
          firstname: users.firstName,
          lastname: users.lastName,
        })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      const { firstname, lastname } = resultNames[0] || {
        firstname: "",
        lastname: "",
      };

      return {
        ...session,
        user: {
          ...session.user,
          firstName: firstname,
          lastName: lastname,
          id: user.id,
          admin: result[0]?.admin ? true : false,
        },
      };
    },
    async signIn({ user, profile }) {
      const existingUser = await db
        .select({
          firstName: users.firstName,
          lastName: users.lastName,
        })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      if (!existingUser[0]?.firstName || !existingUser[0]?.lastName) {
        await db
          .update(users)
          .set({
            firstName: profile?.given_name,
            lastName: profile?.family_name,
          })
          .where(eq(users.id, user.id));
      }

      return true;
    },
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          firstname: profile.given_name,
          lastname: profile.family_name,
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
