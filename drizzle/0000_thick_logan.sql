CREATE TYPE "public"."jurusan_category" AS ENUM('IT', 'Teknik');--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('berita', 'pengumuman', 'prestasi', 'agenda');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'jurusan_admin');--> statement-breakpoint
CREATE TABLE "chatbot_knowledge" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer NOT NULL,
	"content_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guru" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer,
	"category_id" integer,
	"name" text NOT NULL,
	"position" text,
	"bio" text,
	"image_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guru_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guru_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "jurusan" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"full_name" text NOT NULL,
	"slug" text NOT NULL,
	"category" "jurusan_category" NOT NULL,
	"description" text NOT NULL,
	"kompetensi" jsonb NOT NULL,
	"fokus_keahlian" jsonb NOT NULL,
	"prospek" text NOT NULL,
	"logo_url" text NOT NULL,
	"bg_image_url" text,
	"website_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "jurusan_code_unique" UNIQUE("code"),
	CONSTRAINT "jurusan_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "kerjasama_industri" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer,
	"name" text NOT NULL,
	"logo_url" text,
	"description" text,
	"website_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "post_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"jurusan_id" integer,
	"type" "post_type" NOT NULL,
	"category_id" integer,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"body" text,
	"image_url" text,
	"gallery_urls" jsonb,
	"event_date" timestamp with time zone,
	"is_published" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone,
	"is_featured" boolean DEFAULT false NOT NULL,
	"featured_order" integer,
	"is_highlighted" boolean DEFAULT false NOT NULL,
	"highlight_order" integer,
	"view_count" integer DEFAULT 0 NOT NULL,
	"is_popular_override" boolean DEFAULT false NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sarana_prasarana" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text,
	"presentation_slot" text DEFAULT 'standard' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token_hash" text NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_by" integer,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" NOT NULL,
	"jurusan_id" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD CONSTRAINT "chatbot_knowledge_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guru" ADD CONSTRAINT "guru_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guru" ADD CONSTRAINT "guru_category_id_guru_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."guru_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guru" ADD CONSTRAINT "guru_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guru_categories" ADD CONSTRAINT "guru_categories_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guru_categories" ADD CONSTRAINT "guru_categories_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kerjasama_industri" ADD CONSTRAINT "kerjasama_industri_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kerjasama_industri" ADD CONSTRAINT "kerjasama_industri_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sarana_prasarana" ADD CONSTRAINT "sarana_prasarana_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_jurusan_id_jurusan_id_fk" FOREIGN KEY ("jurusan_id") REFERENCES "public"."jurusan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "guru_scope_public_sort_idx" ON "guru" USING btree ("jurusan_id","category_id","is_published","sort_order");--> statement-breakpoint
CREATE INDEX "kerjasama_scope_public_sort_idx" ON "kerjasama_industri" USING btree ("jurusan_id","is_published","sort_order");--> statement-breakpoint
CREATE INDEX "post_categories_jurusan_active_idx" ON "post_categories" USING btree ("jurusan_id","is_active");--> statement-breakpoint
CREATE INDEX "posts_type_published_at_idx" ON "posts" USING btree ("type","is_published","published_at");--> statement-breakpoint
CREATE INDEX "posts_type_featured_order_idx" ON "posts" USING btree ("type","is_featured","featured_order");--> statement-breakpoint
CREATE INDEX "posts_type_highlight_order_idx" ON "posts" USING btree ("type","is_highlighted","highlight_order");--> statement-breakpoint
CREATE INDEX "posts_type_view_count_idx" ON "posts" USING btree ("type","view_count");--> statement-breakpoint
CREATE INDEX "posts_category_id_idx" ON "posts" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "posts_jurusan_id_idx" ON "posts" USING btree ("jurusan_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_unique" ON "sessions" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");