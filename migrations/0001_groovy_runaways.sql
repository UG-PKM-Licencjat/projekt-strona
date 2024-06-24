CREATE TABLE IF NOT EXISTS "projekt-strona_offer_tag" (
	"offerId" varchar(255) NOT NULL,
	"tagId" varchar(255) NOT NULL,
	CONSTRAINT "projekt-strona_offer_tag_offerId_tagId_pk" PRIMARY KEY("offerId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projekt-strona_offer" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" double precision
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projekt-strona_tag" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projekt-strona_user_offer" (
	"userId" varchar(255) NOT NULL,
	"offerId" varchar(255) NOT NULL,
	CONSTRAINT "projekt-strona_user_offer_userId_offerId_pk" PRIMARY KEY("userId","offerId")
);
--> statement-breakpoint
DROP TABLE "projekt-strona_post";--> statement-breakpoint
ALTER TABLE "projekt-strona_user" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "projekt-strona_user" ADD COLUMN "lastName" varchar(255);--> statement-breakpoint
ALTER TABLE "projekt-strona_user" ADD COLUMN "nickname" varchar(255);--> statement-breakpoint
ALTER TABLE "projekt-strona_user" ADD COLUMN "shortDescription" varchar(255);--> statement-breakpoint
ALTER TABLE "projekt-strona_user" ADD COLUMN "longDescription" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projekt-strona_offer_tag" ADD CONSTRAINT "projekt-strona_offer_tag_offerId_projekt-strona_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."projekt-strona_offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projekt-strona_offer_tag" ADD CONSTRAINT "projekt-strona_offer_tag_tagId_projekt-strona_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."projekt-strona_tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projekt-strona_user_offer" ADD CONSTRAINT "projekt-strona_user_offer_userId_projekt-strona_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."projekt-strona_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projekt-strona_user_offer" ADD CONSTRAINT "projekt-strona_user_offer_offerId_projekt-strona_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES "public"."projekt-strona_offer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projekt-strona_user" DROP COLUMN IF EXISTS "image";