"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      await login(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="match-page">
      <div className="match-stage" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "2rem 1rem" }}>
        <div className="pixel-border pixel-card" style={{ maxWidth: 420, width: "100%", background: "var(--pixel-pink-soft)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h1 className="pixel-page-title" style={{ fontSize: "1.2rem", color: "var(--pixel-pink)" }}>
              ♥ Heartmate
            </h1>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.55rem", color: "var(--pixel-ink)", margin: 0 }}>
              LOGIN TO YOUR ACCOUNT
            </p>
          </div>

          {error && <div className="pixel-alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <PixelInput
              label="EMAIL"
              type="email"
              placeholder="sriyaan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PixelInput
              label="PASSWORD"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={{ marginTop: "1.5rem" }}>
              <PixelButton type="submit" disabled={loading} style={{ width: "100%" }}>
                {loading ? "LOGGING IN..." : "LOGIN ♥"}
              </PixelButton>
            </div>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem", color: "var(--pixel-ink)", lineHeight: 1.6 }}>
              Don't have an account?{" "}
              <Link href="/register" style={{ color: "var(--pixel-pink)", textDecoration: "underline" }}>
                REGISTER HERE
              </Link>
            </p>
          </div>

          <div style={{ marginTop: "1rem", padding: "0.6rem", background: "rgba(255,255,255,0.4)", borderRadius: "4px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.4rem", color: "var(--pixel-ink)", margin: 0 }}>
              💡 Demo Login: sriyaan@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
