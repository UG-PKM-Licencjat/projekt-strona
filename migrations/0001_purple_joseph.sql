ALTER TABLE "offer" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ALTER COLUMN "location" SET DATA TYPE geometry(point);--> statement-breakpoint
ALTER TABLE "offer" ALTER COLUMN "location" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "shortDescription" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "longDescription" text NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "locationName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" ADD COLUMN "distance" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN IF EXISTS "about";--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN IF EXISTS "skills";--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN IF EXISTS "links";