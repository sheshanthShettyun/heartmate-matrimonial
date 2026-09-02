"use client";

import Image from "next/image";

type PixelAvatarProps = {
  gender?: string;
  size?: "card" | "large";
};

export function PixelAvatar({ gender, size = "card" }: PixelAvatarProps) {
  const variant = gender === "Female" ? "girl" : "boy";

  return (
    <div className={`pixel-avatar pixel-avatar-${size}`}>
      <Image
        className="pixel-avatar-image"
        src={`/avatar-${variant}.png`}
        alt={variant === "girl" ? "Girl avatar" : "Boy avatar"}
        width={64}
        height={64}
      />
    </div>
  );
}
