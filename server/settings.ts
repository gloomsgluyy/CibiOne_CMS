import { z } from "zod";

const point = z.object({ title: z.string().max(160), description: z.string().max(2_000) });
const panel = z.object({ title: z.string().max(160), subtitle: z.string().max(240), description: z.string().max(5_000), points: z.array(point).max(12) });

export const visionMissionSchema = z.object({ backgroundImageUrl: z.string().min(1).max(2_000), vision: panel, mission: panel });
export const accreditationSchema = z.object({ heading: z.string().max(240), description: z.string().max(5_000), cards: z.array(z.object({ slot: z.enum(["featured_large", "standard", "tall", "wide"]), title: z.string().max(240), description: z.string().max(2_000), tag: z.string().max(120), imageUrl: z.string().nullable(), cardType: z.enum(["image", "text"]) })).max(12) });

export function parseSetting(key: "school_vision_mission" | "school_accreditation", value: unknown) {
  return key === "school_vision_mission" ? visionMissionSchema.parse(value) : accreditationSchema.parse(value);
}
