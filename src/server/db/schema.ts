import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  index,
  integer,
  pgTable,
  jsonb,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

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
  name: varchar("name", { length: 255 }).notNull().default(""),
  firstName: varchar("firstName", { length: 255 }).notNull().default(""),
  lastName: varchar("lastName", { length: 255 }).notNull().default(""),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  isPremium: boolean("isPremium").default(false).notNull(),
  isAdmin: boolean("isAdmin").default(false).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  registered: boolean("registered").default(false).notNull(),
});

export const tags = pgTable("tag", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
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
    tagId: integer("tagId")
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
  ratingsSum: integer("ratings"),
  votes: integer("votes"),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  price: doublePrecision("price").notNull(),
  shortDescription: varchar("shortDescription", { length: 255 }).notNull(),
  longDescription: text("longDescription").notNull(),
  locationName: varchar("locationName", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  // TODO temporary solution while drizzle has a bug with geometry type, fix eventually
  location: jsonb("location").notNull().$type<{ x: number; y: number }>(),
  // location: pointType("location").notNull(),
  distance: integer("distance").default(0).notNull(),
  files: jsonb("files").$type<{ url: string; type: string; name: string }[]>(),
});

export const offersRelations = relations(offers, ({ many, one }) => ({
  users: one(users, { fields: [offers.userId], references: [users.id] }),
  offerTags: many(offerTags),
  reviews: many(reviews),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  offers: one(offers),
  accounts: many(accounts),
  reviews: many(reviews),
}));

export const reviews = pgTable("review", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id),
  offerId: varchar("offerId", { length: 255 })
    .notNull()
    .references(() => offers.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  // TODO: Out of MVP scope - Add later
  // replyTo: integer("replyTo"), // id of the review this is a reply to,
  // replies: integer("replies").default(0),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  offer: one(offers, { fields: [reviews.offerId], references: [offers.id] }),
}));
