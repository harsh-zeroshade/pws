import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Media from "@/models/Media";

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ts       = Date.now();
    const safeName = `${ts}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, safeName), buffer);

    const url  = `/uploads/${safeName}`;
    const type = file.type.startsWith("video") ? "video"
               : file.type.startsWith("image") ? "image" : "document";

    await connectDB();
    const media = await Media.create({ filename: safeName, url, type, size: buffer.length });

    return Response.json({ url, id: media._id, type });
  } catch (e) {
    console.error("[upload POST]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
