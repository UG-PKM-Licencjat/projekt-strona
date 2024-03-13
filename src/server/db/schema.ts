import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  // serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `projekt-strona_${name}`);

// Example schema

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("createdById", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     createdByIdIdx: index("createdById_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 }).notNull().primaryKey(),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   emailVerified: timestamp("emailVerified", {
//     mode: "date",
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Project schema
// accounts, session, verificationTokens shared from example schema

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  nickname: varchar("nickname", { length: 255 }),
  shortDescription: varchar("shortDescription", { length: 255 }),
  longDescription: text("longDescription"),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  // image: varchar("image", { length: 255 }), // TODO figure out image storage
});

// Don't know if these will work, eyeballing it

export const tags = createTable("tag", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const tagRelations = relations(tags, ({ many }) => ({
  userTags: many(userTags),
}));

export const userTags = createTable(
  "user_tag",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    tagId: varchar("tagId", { length: 255 })
      .notNull()
      .references(() => tags.id),
  },
  (userTag) => ({
    compoundKey: primaryKey({ columns: [userTag.userId, userTag.tagId] }),
  }),
);

export const userTagsRelations = relations(userTags, ({ one }) => ({
  user: one(users, { fields: [userTags.userId], references: [users.id] }),
  tag: one(tags, { fields: [userTags.tagId], references: [tags.id] }),
}));

export const offers = createTable("offer", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  testData: varchar("testData", { length: 255 }),
  // TODO add data
});

export const offerRelations = relations(offers, ({ many }) => ({
  userOffers: many(userOffers),
}));

export const userOffers = createTable(
  "user_offer",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    offerId: varchar("offerId", { length: 255 })
      .notNull()
      .references(() => offers.id),
  },
  (userOffer) => ({
    compoundKey: primaryKey({ columns: [userOffer.userId, userOffer.offerId] }),
  }),
);

export const userOffersRelations = relations(userOffers, ({ one }) => ({
  user: one(users, { fields: [userOffers.userId], references: [users.id] }),
  offer: one(offers, { fields: [userOffers.offerId], references: [offers.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  userTags: many(userTags),
  userOffers: many(userOffers),
}));
