"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

type CloudinaryImageProps = Omit<ImageProps, "src" | "loader"> & { publicId: string };

// Cloudinary does the resizing, so the Worker's Images binding is not used here.
export function CloudinaryImage({ publicId, alt, ...props }: CloudinaryImageProps) {
  return (
    <Image
      {...props}
      src={publicId}
      alt={alt}
      loader={({ src, width }) => cloudinaryUrl(src, width)}
    />
  );
}
