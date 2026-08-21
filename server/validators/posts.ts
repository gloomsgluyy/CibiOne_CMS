import { z } from "zod";
import { sanitizeMarkdown } from "@/server/content/markdown";

const nullableUrl = z.union([z.url(), z.string().startsWith("/")]).nullable().optional();

export const postQuerySchema = z.object({
  type: z.enum(["berita", "pengumuman", "prestasi", "agenda"]).optional(),
  category: z.string().trim().min(1).optional(),
  jurusan_id: z.coerce.number().int().positive().optional(),
  featured: z.enum(["true", "false"]).optional(),
  highlighted: z.enum(["true", "false"]).optional(),
  sort: z.enum(["latest", "popular"]).default("latest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const postInputSchema = z.object({
  type: z.enum(["berita", "pengumuman", "prestasi", "agenda"]),
  title: z.string().trim().min(1).max(240),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(240),
  excerpt: z.string().trim().max(500).nullable().optional(),
  body: z.string().max(50_000).transform(sanitizeMarkdown).nullable().optional(),
  imageUrl: nullableUrl,
  galleryUrls: z.array(z.union([z.url(), z.string().startsWith("/")])).max(20).optional(),
  categoryId: z.number().int().positive().nullable().optional(),
  jurusanId: z.number().int().positive().nullable().optional(),
  eventDate: z.coerce.date().nullable().optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.coerce.date().nullable().optional(),
  isFeatured: z.boolean().default(false),
  featuredOrder: z.number().int().min(0).nullable().optional(),
  isHighlighted: z.boolean().default(false),
  highlightOrder: z.number().int().min(0).nullable().optional(),
  isPopularOverride: z.boolean().default(false),
}).superRefine((value, ctx) => {
  if (value.type === "agenda" && !value.eventDate) ctx.addIssue({ code: "custom", message: "Tanggal agenda wajib diisi.", path: ["eventDate"] });
  if (value.isPublished && !value.publishedAt) value.publishedAt = new Date();
  if (!value.isFeatured) value.featuredOrder = null;
  if (!value.isHighlighted) value.highlightOrder = null;
});

export const postIdSchema = z.coerce.number().int().positive();
