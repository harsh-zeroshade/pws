import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Content from "@/models/Content";

// In Next.js App Router, getServerSession can't read headers without the request.
// Use getToken() instead — it reads the JWT directly from the cookie.
async function requireAdmin(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// GET /api/content?page=home&section=hero  (public — no auth)
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page    = searchParams.get("page");
    const section = searchParams.get("section");
    const query   = {};
    if (page)    query.page    = page;
    if (section) query.section = section;
    const docs = await Content.find(query).lean();
    return Response.json(docs);
  } catch (e) {
    console.error("[content GET]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/content  { page, section, data }
export async function POST(req) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;
  try {
    await connectDB();
    const body = await req.json();
    const { page, section, data } = body;
    if (!page || !section) {
      return Response.json({ error: "page and section are required" }, { status: 400 });
    }
    const doc = await Content.findOneAndUpdate(
      { page, section },
      { $set: { data } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return Response.json({ ok: true, doc });
  } catch (e) {
    console.error("[content POST]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/content?page=x&section=y
export async function DELETE(req) {
  const authErr = await requireAdmin(req);
  if (authErr) return authErr;
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    await Content.deleteOne({
      page:    searchParams.get("page"),
      section: searchParams.get("section"),
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[content DELETE]", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
