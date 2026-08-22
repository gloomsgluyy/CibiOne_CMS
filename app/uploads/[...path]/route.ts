import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const contentTypes: Record<string, string> = {
  avif: "image/avif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path;
  const root = path.resolve(process.cwd(), "public", "uploads");
  const filePath = path.resolve(root, ...segments);
  if (!filePath.startsWith(`${root}${path.sep}`)) return new NextResponse("Not found", { status: 404 });

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filePath).slice(1).toLowerCase();
    return new NextResponse(file as unknown as BodyInit, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
