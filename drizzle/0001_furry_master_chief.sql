ALTER TABLE "chatbot_knowledge" ALTER COLUMN "jurusan_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD COLUMN "is_published" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "chatbot_knowledge" ADD CONSTRAINT "chatbot_knowledge_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;