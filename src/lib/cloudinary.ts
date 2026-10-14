const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// f_auto / q_auto serve AVIF or WebP at a sensible quality; c_limit never upscales.
export function cloudinaryUrl(publicId: string, width: number): string {
  if (!CLOUD_NAME) throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_limit,w_${width}/${publicId}`;
}
