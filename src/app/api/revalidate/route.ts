import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const ALL_PATHS = ["/", "/about", "/courses", "/faculty", "/gallery", "/contact"];

function getPathsForDocType(docType: string | undefined): string[] {
  const paths: string[] = ["/"];
  if (!docType) return ALL_PATHS; // no type = revalidate everything
  if (docType === "faculty") paths.push("/faculty");
  if (docType === "course") paths.push("/courses");
  if (docType === "achievement" || docType === "topperPoster" || docType === "groupBatch")
    paths.push("/gallery", "/");
  if (docType === "heroSlide") paths.push("/");
  if (docType === "review") paths.push("/");
  if (docType === "stat") paths.push("/about", "/");
  if (docType === "siteConfig") return ALL_PATHS;
  return paths;
}

// ─── GET: manual browser trigger ─────────────────────────────────────────────
// Visit: /api/revalidate?secret=afsar-academy-webhook-2024&type=faculty
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const docType = req.nextUrl.searchParams.get("type") ?? undefined;
  const paths = getPathsForDocType(docType);

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}

// ─── POST: Sanity webhook ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType = body?._type as string | undefined;
    const paths = getPathsForDocType(docType);

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
