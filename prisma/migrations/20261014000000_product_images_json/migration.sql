-- Keeps existing rows: text[] becomes a JSON array of the same strings.
-- The media migration then rewrites each entry as { publicId, alt }.
ALTER TABLE "Product" ALTER COLUMN "images" TYPE JSONB USING to_jsonb("images");
ALTER TABLE "Product" ALTER COLUMN "images" SET DEFAULT '[]';
