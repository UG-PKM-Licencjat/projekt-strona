import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  index,
  integer,
  pgTable,
  primaryKey,
  // serial,
  jsonb,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

// NextAuth basics

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
    admin: boolean("admin").default(false).notNull(),
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

export const sessions = pgTable(
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

export const verificationTokens = pgTable(
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

export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  nickname: varchar("nickname", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }), // TODO figure out image storage
  isPremium: boolean("isPremium").default(false).notNull(),
  isAdmin: boolean("isAdmin").default(false).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
});

export const tags = pgTable("tag", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const tagRelations = relations(tags, ({ many }) => ({
  offerTags: many(offerTags),
}));

export const offerTags = pgTable(
  "offerTag",
  {
    offerId: varchar("offerId", { length: 255 })
      .notNull()
      .references(() => offers.id),
    tagId: varchar("tagId", { length: 255 })
      .notNull()
      .references(() => tags.id),
  },
  (userTag) => ({
    compoundKey: primaryKey({ columns: [userTag.offerId, userTag.tagId] }),
  }),
);

export const offerTagsRelations = relations(offerTags, ({ one }) => ({
  offer: one(offers, { fields: [offerTags.offerId], references: [offers.id] }),
  tag: one(tags, { fields: [offerTags.tagId], references: [tags.id] }),
}));

export const offers = pgTable("offer", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // TODO delete this?
  name: varchar("name", { length: 255 }).notNull(),
  price: doublePrecision("price"),
  about: jsonb("about"),
  skills: jsonb("skills"),
  files: jsonb("files"),
  links: jsonb("links"),
  // TODO figure out location
});

export const offerRelations = relations(offers, ({ many }) => ({
  userOffers: many(userOffers),
  offerTags: many(offerTags),
}));

export const userOffers = pgTable(
  "userOffer",
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
  userOffers: many(userOffers),
}));
