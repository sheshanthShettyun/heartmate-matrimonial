"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const isAdmin = userId === "60";

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const go = (path: string) => {
    if (!userId) return;
    router.push(`${path}?userId=${userId}`);
    setOpen(false);
  };

  return (
    <div className="user-menu-wrap">
      <button className="user-menu-icon" onClick={() => setOpen(!open)}>
        👤
      </button>
      {open && (
        <div className="user-menu-dropdown pixel-border">
          <p style={{ fontFamily: "Press Start 2P", fontSize: "0.45rem", color: "var(--pixel-pink)", marginBottom: "0.5rem" }}>
            My Account
          </p>
          <input
            className="pixel-input"
            placeholder="Your User ID"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              localStorage.setItem("userId", e.target.value);
            }}
            type="number"
            min="1"
            style={{ fontSize: "0.4rem", minHeight: 36, padding: "0 0.5rem", marginBottom: "0.75rem" }}
          />
          <button className="user-menu-item" onClick={() => { router.push("/register"); setOpen(false); }}>
            Register / Add User
          </button>
          <button className="user-menu-item" onClick={() => go("/edit-profile")}>
            Edit Profile
          </button>
          <button className="user-menu-item" onClick={() => go("/interests")}>
            My Interests
          </button>
          <button 
            className="user-menu-item" 
            onClick={() => window.open("http://localhost:8080/swagger-ui/index.html", "_blank")}
          >
            Swagger Docs 📖
          </button>
          {isAdmin && (
            <button className="user-menu-item" onClick={() => go("/admin")}>
              Admin Panel
            </button>
          )}
          <button className="user-menu-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
