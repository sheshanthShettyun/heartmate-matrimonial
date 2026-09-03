"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  if (!user) return null;

  const isAdmin = user.userId === 60 || user.email === "admin@example.com";

  const go = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <div className="user-menu-wrap">
      <button className="user-menu-icon" onClick={() => setOpen(!open)}>
        👤
      </button>
      {open && (
        <div className="user-menu-dropdown pixel-border">
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem", color: "var(--pixel-pink)", marginBottom: "0.2rem" }}>
            ACCOUNT DETAILS
          </p>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "var(--pixel-ink)", margin: "0 0 0.2rem" }}>
            {user.name}
          </p>
          <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.38rem", color: "var(--pixel-pink-deep)", margin: "0 0 0.75rem", wordBreak: "break-all" }}>
            {user.email} (ID #{user.userId})
          </p>

          <button className="user-menu-item" onClick={() => go("/")}>
            🏠 Home Catalog
          </button>

          <button className="user-menu-item" onClick={() => go("/edit-profile")}>
            ✏️ Edit My Profile
          </button>
          
          <button className="user-menu-item" onClick={() => go("/interests")}>
            💌 My Interests
          </button>

          {isAdmin && (
            <button className="user-menu-item" onClick={() => go("/admin")}>
              👑 Admin Panel
            </button>
          )}

          <button 
            className="user-menu-item" 
            style={{ color: "#e74c3c" }}
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("isMatched");
                window.dispatchEvent(new CustomEvent("heartmate_reset"));
              }
              setOpen(false);
              router.push("/profiles/2");
            }}
          >
            Reset Demo 🔄
          </button>

          <button className="user-menu-item" style={{ color: "#c0392b", fontWeight: "bold" }} onClick={() => logout()}>
            🚪 Logout
          </button>

          <button className="user-menu-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
