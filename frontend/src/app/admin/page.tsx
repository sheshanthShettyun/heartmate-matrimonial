"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PixelButton } from "@/components/PixelButton";

const adminUserId = "60";

const crudSections = [
  {
    title: "User CRUD",
    copy: "Create users, view all users, update user details, and delete users.",
    action: "Manage Users",
    path: "/register",
  },
  {
    title: "Profile CRUD",
    copy: "Create profiles, search profiles, update profile details, and delete profiles.",
    action: "Manage Profiles",
    path: "/edit-profile",
  },
  {
    title: "Interest CRUD",
    copy: "Send interests, view sent/received interests, accept interests, and reject/delete interests.",
    action: "Manage Interests",
    path: "/interests",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || "");
  }, []);

  const updateUserId = (value: string) => {
    setUserId(value);
    localStorage.setItem("userId", value);
  };

  const openSection = (path: string) => {
    router.push(`${path}?userId=${adminUserId}`);
  };

  return (
    <main className="match-page">
      <div className="match-stage" style={{ display: "block", padding: "2rem clamp(1rem, 4vw, 4rem)" }}>
        <h1 className="pixel-page-title">Admin Panel</h1>

        <div className="pixel-border pixel-card" style={{ maxWidth: 620, marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "Press Start 2P", fontSize: "0.55rem", lineHeight: 2, color: "var(--pixel-ink)", marginBottom: "1rem" }}>
            Admin access is given to user ID 60.
          </p>
          <input
            className="pixel-input"
            type="number"
            min="1"
            value={userId}
            onChange={event => updateUserId(event.target.value)}
            placeholder="Enter admin user ID"
            style={{ maxWidth: 260 }}
          />
        </div>

        {userId !== adminUserId && (
          <div className="pixel-alert-error" style={{ maxWidth: 620 }}>
            Enter user ID 60 to unlock admin CRUD controls.
          </div>
        )}

        {userId === adminUserId && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {crudSections.map(section => (
              <div key={section.title} className="pixel-border pixel-card">
                <h2 style={{ fontFamily: "Press Start 2P", fontSize: "0.65rem", color: "var(--pixel-pink)", marginBottom: "0.75rem" }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: "Press Start 2P", fontSize: "0.45rem", lineHeight: 2, color: "var(--pixel-ink)", marginBottom: "1rem" }}>
                  {section.copy}
                </p>
                <PixelButton onClick={() => openSection(section.path)}>
                  {section.action}
                </PixelButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
