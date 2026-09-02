"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PixelDropdown } from "@/components/PixelDropdown";
import { PixelInput } from "@/components/PixelInput";
import { PixelTextarea } from "@/components/PixelTextarea";
import { PixelButton } from "@/components/PixelButton";
import { profileApi, Profile } from "@/lib/api";
import { ProfileCard } from "@/components/ProfileCard";
import { UserMenu } from "@/components/UserMenu";
import { PhysicsCupid } from "@/components/PhysicsCupid";

const lookingForOptions = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "other", label: "Other" },
];

const ageOptions = Array.from({ length: 50 }, (_, i) => ({
  value: String(i + 18),
  label: String(i + 18),
}));


const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

type Stage = "landing" | "results" | "create";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [lookingFor, setLookingFor] = useState<string>("");
  const [ageFrom, setAgeFrom] = useState<string>("");
  const [ageTo, setAgeTo] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Create profile fields
  const [userId, setUserId] = useState("");
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");

  // Search form → check profiles
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const genderMapped = lookingFor
        ? { woman: "Female", man: "Male", other: "Other" }[lookingFor]
        : undefined;

      // Send all filters to backend
      const params: { gender?: string; city?: string; age?: number } = {};
      if (genderMapped) params.gender = genderMapped;

      const res = Object.keys(params).length > 0
        ? await profileApi.search(params)
        : await profileApi.getAll();

      // Client-side age range filter
      let filtered = res.data;
      if (ageFrom) filtered = filtered.filter(p => p.age >= parseInt(ageFrom));
      if (ageTo) filtered = filtered.filter(p => p.age <= parseInt(ageTo));

      setProfiles(filtered);
      if (filtered.length > 0) {
        setStage("results");
      } else {
        setStage("create");
      }
    } catch {
      setError("Could not connect to backend. Make sure it's running on localhost:8080");
    } finally {
      setLoading(false);
    }
  };

  // Create profile
  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!userId) { setError("Please enter your User ID"); return; }
    localStorage.setItem("userId", userId);
    try {
      await profileApi.create(parseInt(userId), {
        age: parseInt(age),
        gender,
        city,
        education,
        occupation,
        about,
      });
      setMessage("Profile created! Loading matches...");
      const res = await profileApi.getAll();
      setProfiles(res.data);
      setStage("results");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create profile");
    }
  };

  // ===== Results =====
  if (stage === "results") {
    return (
      <main className="match-page" style={{ minHeight: "100vh" }}>
        <UserMenu />
        <div className="match-stage">
          {/* Background elements */}
          <div className="pixel-sky-object pixel-cloud cloud-one" aria-hidden="true" />
          <div className="pixel-sky-object pixel-cloud cloud-two" aria-hidden="true" />
          <div className="pixel-sky-object pixel-cloud cloud-three" aria-hidden="true" />
          <div className="pixel-sky-object pixel-cloud cloud-four" aria-hidden="true" />
          <div className="pixel-sky-object pixel-spark spark-one" aria-hidden="true" />
          <div className="pixel-sky-object pixel-spark spark-two" aria-hidden="true" />
          <div className="pixel-sky-object pixel-spark spark-three" aria-hidden="true" />
          <div className="pixel-sky-object pixel-spark spark-four" aria-hidden="true" />
          <div className="pixel-sky-object pixel-spark spark-five" aria-hidden="true" />
          <div className="pixel-sky-object pixel-heart heart-one" aria-hidden="true" />
          <div className="pixel-sky-object pixel-heart heart-two" aria-hidden="true" />
          <div className="pixel-sky-object pixel-heart heart-three" aria-hidden="true" />
          <div className="pixel-sky-object pixel-heart heart-four" aria-hidden="true" />

          {/* Cupids with real physics */}
          <PhysicsCupid side="left" />
          <PhysicsCupid side="right" />

          <div style={{ position: "relative", zIndex: 10, padding: "2rem clamp(1rem, 4vw, 4rem)", maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <h1 style={{ fontFamily: "Press Start 2P", fontSize: "0.9rem", color: "var(--pixel-ink)", marginBottom: "0.5rem" }}>
                ♥ Your Matches
              </h1>
              <p style={{ fontFamily: "Press Start 2P", fontSize: "0.5rem", color: "var(--pixel-ink)", marginBottom: "1rem" }}>
                {profiles.length} profiles found
              </p>
              <PixelButton variant="secondary" onClick={() => { setStage("landing"); setProfiles([]); }}>
                Start Over
              </PixelButton>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {profiles.map(p => <ProfileCard key={p.profileId} profile={p} />)}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ===== Create Profile =====
  if (stage === "create") {
    const ageOpts = Array.from({ length: 50 }, (_, i) => ({
      value: String(i + 18),
      label: String(i + 18),
    }));

    return (
      <main className="match-page">
        <UserMenu />
        <div className="match-stage">
          <PhysicsCupid side="left" />
          <PhysicsCupid side="right" />
          <section className="match-content">
            <h1 className="pixel-title">
              Create Your
              <span>Profile</span>
            </h1>
            <p className="pixel-copy">
              No profiles yet!<br />Be the first to join.
            </p>
            <div className="heart-divider" aria-hidden="true">♥</div>
            {message && <div className="pixel-alert-success">{message}</div>}
            {error && <div className="pixel-alert-error">{error}</div>}
            <form className="match-form pixel-border" onSubmit={handleCreateProfile}>
              <PixelInput label="Your User ID" placeholder="e.g. 1" value={userId} onChange={e => setUserId(e.target.value)} type="number" min="1" required />
              <div className="form-sentence">
                <span className="form-label">I am</span>
                <div className="form-age-row">
                  <PixelDropdown value={age} onChange={setAge} placeholder="25" options={ageOpts} />
                  <span className="form-label-inline">years old,</span>
                </div>
                <span className="form-label">a</span>
                <PixelDropdown value={gender} onChange={setGender} placeholder="Gender" options={genderOptions} />
                <span className="form-label">living in</span>
              </div>
              <PixelInput placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
              <PixelInput label="Education" placeholder="e.g. B.Tech" value={education} onChange={e => setEducation(e.target.value)} />
              <PixelInput label="Occupation" placeholder="e.g. Software Engineer" value={occupation} onChange={e => setOccupation(e.target.value)} />
              <PixelTextarea label="About you" placeholder="Tell something about yourself..." value={about} onChange={e => setAbout(e.target.value)} rows={3} />
              <PixelButton type="submit">Create Profile</PixelButton>
              <PixelButton variant="secondary" type="button" onClick={() => setStage("landing")} style={{ marginLeft: "0.5rem" }}>
                Back
              </PixelButton>
            </form>
          </section>
        </div>
      </main>
    );
  }

  // ===== Landing =====
  return (
    <main className="match-page">
      <UserMenu />
      <div className="match-stage">
        <div className="pixel-sky-object pixel-cloud cloud-one" aria-hidden="true" />
        <div className="pixel-sky-object pixel-cloud cloud-two" aria-hidden="true" />
        <div className="pixel-sky-object pixel-cloud cloud-three" aria-hidden="true" />
        <div className="pixel-sky-object pixel-cloud cloud-four" aria-hidden="true" />
        <div className="pixel-sky-object pixel-spark spark-one" aria-hidden="true" />
        <div className="pixel-sky-object pixel-spark spark-two" aria-hidden="true" />
        <div className="pixel-sky-object pixel-spark spark-three" aria-hidden="true" />
        <div className="pixel-sky-object pixel-spark spark-four" aria-hidden="true" />
        <div className="pixel-sky-object pixel-spark spark-five" aria-hidden="true" />
        <div className="pixel-sky-object pixel-heart heart-one" aria-hidden="true" />
        <div className="pixel-sky-object pixel-heart heart-two" aria-hidden="true" />
        <div className="pixel-sky-object pixel-heart heart-three" aria-hidden="true" />
        <div className="pixel-sky-object pixel-heart heart-four" aria-hidden="true" />

        <PhysicsCupid side="left" />
        <PhysicsCupid side="right" />

        <section className="match-content" aria-labelledby="match-title">
          <h1 id="match-title" className="pixel-title">
            Find Your
            <span>Perfect Match</span>
          </h1>
          <p className="pixel-copy">
            Join thousands of happy souls
            <br />
            who found their forever. Meet
            <br />
            someone who feels like home.
          </p>
          <div className="heart-divider" aria-hidden="true">♥</div>

          <form className="match-form pixel-border" onSubmit={handleSearch}>
            {error && <div className="pixel-alert-error" style={{ marginBottom: "1rem" }}>{error}</div>}
            <div className="form-sentence">
              <span className="form-label">I&apos;m looking for a</span>
              <PixelDropdown value={lookingFor} onChange={setLookingFor} placeholder="Select" options={lookingForOptions} />
              <span className="form-label">aged</span>
              <div className="form-age-row">
                <PixelDropdown value={ageFrom} onChange={setAgeFrom} placeholder="22" options={ageOptions} />
                <span className="form-label-inline">to</span>
                <PixelDropdown value={ageTo} onChange={setAgeTo} placeholder="27" options={ageOptions} />
              </div>
            </div>
            <button type="submit" className="pixel-button pixel-lets-begin" disabled={loading}>
              {loading ? "Searching..." : "Let's Begin"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
