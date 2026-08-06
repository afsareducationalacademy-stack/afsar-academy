import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Sanity webhook → Next.js on-demand revalidation
// This endpoint is called by Sanity every time content is published/updated
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType = body?._type as string | undefined;

    // Revalidate relevant pages based on which document type changed
    const pathsToRevalidate: string[] = ["/"];

    if (docType === "faculty") pathsToRevalidate.push("/faculty");
    if (docType === "course") pathsToRevalidate.push("/courses");
    if (docType === "achievement" || docType === "topperPoster" || docType === "groupBatch")
      pathsToRevalidate.push("/gallery", "/");
    if (docType === "heroSlide") pathsToRevalidate.push("/");
    if (docType === "review") pathsToRevalidate.push("/");
    if (docType === "stat") pathsToRevalidate.push("/about", "/");
    if (docType === "siteConfig") {
      // Site config touches all pages
      pathsToRevalidate.push("/", "/about", "/courses", "/faculty", "/gallery", "/contact");
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
