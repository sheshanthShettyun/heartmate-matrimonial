"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/register", label: "Users" },
  { href: "/profiles", label: "Profiles" },
  { href: "/edit-profile", label: "Edit Profile" },
  { href: "/interests", label: "Interests" },
  { href: "/admin", label: "Admin" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "var(--pixel-ink)", borderBottom: "4px solid var(--pixel-pink)",
      padding: "0 clamp(1rem, 4vw, 4rem)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60,
    }}>
      <Link href="/" style={{
        fontFamily: "Press Start 2P", fontSize: "0.7rem",
        color: "var(--pixel-pink)", textDecoration: "none",
      }}>
        ♥ Heartmate
      </Link>
      <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            fontFamily: "Press Start 2P", fontSize: "0.45rem",
            color: pathname === l.href ? "var(--pixel-pink)" : "var(--pixel-cream)",
            textDecoration: "none", padding: "0.4rem 0.6rem",
            borderRadius: "0.2rem",
            background: pathname === l.href ? "rgba(232,101,138,0.15)" : "transparent",
            transition: "background 150ms ease",
          }}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
