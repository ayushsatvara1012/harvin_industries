import { NextResponse } from "next/server";
import { auth } from "@/auth";

const FOLDER = "harvin/machines";
const ALLOWED_FORMATS = "jpg,jpeg,png,webp";

async function sha1Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// The browser uploads straight to Cloudinary; the secret never leaves the server.
// Signed params pin the folder and file types, so a leaked signature cannot be
// reused for anything else.
export async function POST() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await sha1Hex(
    `allowed_formats=${ALLOWED_FORMATS}&folder=${FOLDER}&timestamp=${timestamp}${apiSecret}`,
  );

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: FOLDER,
    allowedFormats: ALLOWED_FORMATS,
  });
}
