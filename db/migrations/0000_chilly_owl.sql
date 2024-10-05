CREATE TABLE IF NOT EXISTS "curriculums" (
	"id" text PRIMARY KEY NOT NULL,
	"curriculum_name" text NOT NULL,
	"curriculum_data" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
