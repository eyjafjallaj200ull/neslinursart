CREATE TABLE "image_dimensions" (
	"image_id" integer NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "image_dimensions" ADD CONSTRAINT "image_dimensions_image_id_artworks_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."artworks"("id") ON DELETE no action ON UPDATE no action;