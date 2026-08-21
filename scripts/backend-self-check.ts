import assert from "node:assert/strict";

import { sanitizeMarkdown } from "@/server/content/markdown";
import { parseSetting } from "@/server/settings";
import { postInputSchema } from "@/server/validators/posts";

const sanitized = sanitizeMarkdown("<script>x</script>[bad](javascript:alert(1))");
assert.ok(!sanitized.includes("<script") && !sanitized.includes("javascript:"));
assert.equal(postInputSchema.parse({ type: "berita", title: "Berita", slug: "berita", body: "<img src=x>", isPublished: false }).body, "");
const vision = parseSetting("school_vision_mission", { backgroundImageUrl: "/banner.jpeg", vision: { title: "Visi", subtitle: "", description: "", points: [] }, mission: { title: "Misi", subtitle: "", description: "", points: [] } });
assert.ok("vision" in vision && vision.vision.title === "Visi");
