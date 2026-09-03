"use client";

import { useState } from "react";
import { profileApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { PixelInput } from "@/components/PixelInput";
import { PixelTextarea } from "@/components/PixelTextarea";
import { PixelDropdown } from "@/components/PixelDropdown";
import { PixelButton } from "@/components/PixelButton";

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export default function CreateProfilePage() {
  const { user, refreshUser } = useAuth();
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user || !user.userId) {
      setError("User session missing. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      await profileApi.create(user.userId, {
        age: parseInt(age),
        gender,
        city,
        education,
        occupation,
        about,
      });

      await refreshUser();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="match-page">
      <div className="match-stage" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "2rem 1rem" }}>
        <div className="pixel-border pixel-card" style={{ maxWidth: 540, width: "100%", background: "var(--pixel-pink-soft)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h1 className="pixel-page-title" style={{ fontSize: "1.2rem", color: "var(--pixel-pink)" }}>
              ♥ Heartmate Profile Setup
            </h1>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "var(--pixel-ink)", lineHeight: 1.6 }}>
              WELCOME {user?.name?.toUpperCase() || "USER"}! CREATE YOUR CANDIDATE PROFILE TO BEGIN MATCHING.
            </p>
          </div>

          {error && <div className="pixel-alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <PixelInput
                label="AGE"
                type="number"
                min="18"
                max="99"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <div className="pixel-field">
                <label className="pixel-field-label">GENDER</label>
                <PixelDropdown
                  placeholder="Gender"
                  value={gender}
                  onChange={setGender}
                  options={GENDER_OPTIONS}
                />
              </div>
            </div>

            <PixelInput
              label="CITY"
              placeholder="e.g. Mumbai, Delhi, Bangalore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <PixelInput
              label="EDUCATION"
              placeholder="e.g. B.Tech CSE, MBA Finance"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />

            <PixelInput
              label="OCCUPATION"
              placeholder="e.g. Software Developer, Architect"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />

            <PixelTextarea
              label="ABOUT YOURSELF"
              placeholder="Tell prospective matches a little bit about yourself, hobbies, and interests..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
            />

            <div style={{ marginTop: "1.5rem" }}>
              <PixelButton type="submit" disabled={loading} style={{ width: "100%" }}>
                {loading ? "SAVING PROFILE..." : "COMPLETE PROFILE & START MATCHING ♥"}
              </PixelButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
