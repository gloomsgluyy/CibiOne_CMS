import { boolean, integer, jsonb, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["super_admin", "jurusan_admin"]);
export const postType = pgEnum("post_type", ["berita", "pengumuman", "prestasi", "agenda"]);
export const jurusanCategory = pgEnum("jurusan_category", ["IT", "Teknik"]);

export const jurusan = pgTable("jurusan", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  slug: text("slug").notNull().unique(),
  category: jurusanCategory("category").notNull(),
  description: text("description").notNull(),
  kompetensi: jsonb("kompetensi").$type<string[]>().notNull(),
  fokusKeahlian: jsonb("fokus_keahlian").$type<Array<{ title: string; icon: string }>>().notNull(),
  prospek: text("prospek").notNull(),
  logoUrl: text("logo_url").notNull(),
  bgImageUrl: text("bg_image_url"),
  websiteUrl: text("website_url"),
  isActive: boolean("is_active").notNull().default(true),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").notNull(),
  jurusanId: integer("jurusan_id").references(() => jurusan.id),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  jurusanId: integer("jurusan_id").references(() => jurusan.id),
  type: postType("type").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  body: text("body"),
  imageUrl: text("image_url"),
  eventDate: timestamp("event_date", { withTimezone: true }),
  isPublished: boolean("is_published").notNull().default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedBy: integer("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const chatbotKnowledge = pgTable("chatbot_knowledge", {
  id: serial("id").primaryKey(),
  jurusanId: integer("jurusan_id").notNull().references(() => jurusan.id),
  contentText: text("content_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
