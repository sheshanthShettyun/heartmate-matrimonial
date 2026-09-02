"use client";

export function PixelCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`pixel-border pixel-card ${className}`}>{children}</div>
  );
}
