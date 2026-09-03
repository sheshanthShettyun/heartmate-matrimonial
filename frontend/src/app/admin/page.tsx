"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PixelButton } from "@/components/PixelButton";
import { UserMenu } from "@/components/UserMenu";

const crudSections = [
  {
    title: "User CRUD",
    copy: "View all registered system accounts, update user credentials, and remove accounts.",
    action: "Manage Users",
    path: "/register",
  },
  {
    title: "Profile CRUD",
    copy: "Create, view, update candidate profiles, and delete profiles from MySQL database.",
    action: "Manage Profiles",
    path: "/edit-profile",
  },
  {
    title: "Interest CRUD",
    copy: "View system-wide interest requests, accept pending requests, and delete records.",
    action: "Manage Interests",
    path: "/interests",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.userId === 60 || user?.email === "admin@example.com";

  useEffect(() => {
    if (user && !isAdmin) {
      router.push("/");
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return (
      <main className="match-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "Press Start 2P", fontSize: "0.6rem", color: "var(--pixel-ink)" }}>
          {"You don't have admin access."}
        </p>
      </main>
    );
  }

  const openSection = (path: string) => {
    router.push(path);
  };

  return (
    <main className="match-page" style={{ minHeight: "100vh" }}>
      <UserMenu />
      <div className="match-stage" style={{ display: "block", padding: "2rem clamp(1rem, 4vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Navigation & Title Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <PixelButton variant="secondary" onClick={() => router.push("/")}>
            ← Back to Catalog
          </PixelButton>
          <h1 className="pixel-page-title" style={{ margin: 0, fontSize: "1.2rem" }}>
            👑 System Admin Dashboard
          </h1>
        </div>

        <div className="pixel-border pixel-card" style={{ marginBottom: "1.5rem", background: "var(--pixel-pink-soft)" }}>
          <p style={{ fontFamily: "Press Start 2P", fontSize: "0.55rem", lineHeight: 1.8, color: "var(--pixel-ink)", margin: "0 0 0.5rem" }}>
            LOGGED IN AS: <strong>{user?.name?.toUpperCase()}</strong> ({user?.email})
          </p>
          <p style={{ fontFamily: "Press Start 2P", fontSize: "0.45rem", color: "var(--pixel-pink-deep)", margin: 0 }}>
            Master administrator control panel for HeartMate database and entity records.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {crudSections.map((sec) => (
            <div key={sec.title} className="pixel-border pixel-card">
              <h2 style={{ fontFamily: "Press Start 2P", fontSize: "0.75rem", color: "var(--pixel-pink)", margin: "0 0 0.5rem" }}>
                {sec.title}
              </h2>
              <p style={{ fontFamily: "Press Start 2P", fontSize: "0.5rem", color: "var(--pixel-ink)", lineHeight: 1.8, marginBottom: "1rem" }}>
                {sec.copy}
              </p>
              <PixelButton onClick={() => openSection(sec.path)}>
                {sec.action} ➔
              </PixelButton>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
