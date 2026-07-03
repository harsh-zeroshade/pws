import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Media from "@/models/Media";
import { unlink } from "fs/promises";
import { join } from "path";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const media = await Media.find().sort({ createdAt: -1 }).limit(200).lean();
    return Response.json(media);
  } catch (e) {
    console.error("[media GET]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await connectDB();
    const media = await Media.findById(id);
    if (!media) return Response.json({ error: "Not found" }, { status: 404 });
    try { await unlink(join(process.cwd(), "public", media.url)); } catch {}
    await Media.deleteOne({ _id: id });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[media DELETE]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
