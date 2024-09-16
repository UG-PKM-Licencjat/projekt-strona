CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offerTag" (
	"offerId" varchar(255) NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "offerTag_offerId_tagId_pk" PRIMARY KEY("offerId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"ratings" integer,
	"votes" integer,
	"name" varchar(255) NOT NULL,
	"price" double precision,
	"about" text,
	"skills" jsonb,
	"files" jsonb,
	"links" jsonb,
	"location" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "review_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar(255) NOT NULL,
	"offerId" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userOffer" (
	"userId" varchar(255) NOT NULL,
	"offerId" varchar(255) NOT NULL,
	CONSTRAINT "userOffer_userId_offerId_pk" PRIMARY KEY("userId","offerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"firstName" varchar(255),
	"lastName" varchar(255),
	"nickname" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"isPremium" boolean DEFAULT false NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"registrationStatus" integer DEFAULT 0 NOT NULL,
	"isArtist" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offerTag" ADD CONSTRAINT "offerTag_offerId_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offerTag" ADD CONSTRAINT "offerTag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_offerId_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userOffer" ADD CONSTRAINT "userOffer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userOffer" ADD CONSTRAINT "userOffer_offerId_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" USING btree ("userId");