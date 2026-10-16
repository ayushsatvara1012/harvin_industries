const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function base(resource: "image" | "video") {
  if (!CLOUD_NAME) throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resource}/upload`;
}

// f_auto / q_auto serve AVIF or WebP at a sensible quality; c_limit never upscales.
export function cloudinaryUrl(publicId: string, width: number): string {
  return `${base("image")}/f_auto,q_auto,c_limit,w_${width}/${publicId}`;
}

// f_auto:video picks MP4 or WebM for the browser; the plain `f_auto` can answer
// with an animated image when the request's Accept header lists images first.
export function cloudinaryVideoUrl(publicId: string): string {
  return `${base("video")}/f_auto:video,q_auto/${publicId}`;
}

// A fixed-crop copy for link previews (Open Graph wants 1200x630).
export function cloudinaryCoverUrl(publicId: string, width: number, height: number): string {
  return `${base("image")}/f_auto,q_auto,c_fill,g_auto,w_${width},h_${height}/${publicId}`;
}

// The original file untouched, for vector logos where a raster transform is wrong.
export function cloudinaryOriginalUrl(publicId: string, extension: string): string {
  return `${base("image")}/${publicId}.${extension}`;
}
