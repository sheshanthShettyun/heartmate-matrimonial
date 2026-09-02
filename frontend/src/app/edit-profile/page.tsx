"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { profileApi, Profile } from "@/lib/api";
import { PixelInput } from "@/components/PixelInput";
import { PixelTextarea } from "@/components/PixelTextarea";
import { PixelDropdown } from "@/components/PixelDropdown";
import { PixelButton } from "@/components/PixelButton";

function EditProfileForm() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get("userId") || "");
  const [existing, setExisting] = useState<Profile | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    setMessage("");
    setError("");
    try {
      const res = await profileApi.getByUserId(parseInt(userId));
      const p = res.data;
      setExisting(p);
      setAge(String(p.age));
      setGender(p.gender);
      setCity(p.city);
      setEducation(p.education || "");
      setOccupation(p.occupation || "");
      setAbout(p.about || "");
      setMessage("Profile loaded");
    } catch {
      setExisting(null);
      setMessage("No profile found. You can create one.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = { age: parseInt(age), gender, city, education, occupation, about };
      if (existing) {
        await profileApi.update(existing.profileId!, data);
        setMessage("Profile updated");
      } else {
        await profileApi.create(parseInt(userId), data);
        setMessage("Profile created");
      }
      await loadProfile();
    } catch (err: any) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async () => {
    if (!existing || !confirm("Delete profile?")) return;
    try {
      await profileApi.delete(existing.profileId!);
      setExisting(null);
      setMessage("Profile deleted");
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div className="pixel-border pixel-card" style={{ maxWidth: 560 }}>
      {message && <div className="pixel-alert-success">{message}</div>}
      {error && <div className="pixel-alert-error">{error}</div>}

      <PixelInput label="User ID" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter user ID" />
      <PixelButton variant="secondary" onClick={loadProfile} style={{ marginBottom: "1.5rem" }}>Load Profile</PixelButton>

      {userId && (
        <form onSubmit={handleSubmit}>
          <PixelInput label="Age" type="number" min="18" value={age} onChange={e => setAge(e.target.value)} required />
          <div style={{ marginBottom: "1rem" }}>
            <label className="pixel-field-label" style={{ display: "block", marginBottom: "0.4rem" }}>Gender</label>
            <PixelDropdown value={gender} onChange={setGender} placeholder="Gender" options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]} />
          </div>
          <PixelInput label="City" value={city} onChange={e => setCity(e.target.value)} required />
          <PixelInput label="Education" value={education} onChange={e => setEducation(e.target.value)} />
          <PixelInput label="Occupation" value={occupation} onChange={e => setOccupation(e.target.value)} />
          <PixelTextarea label="About" value={about} onChange={e => setAbout(e.target.value)} rows={4} />
          <PixelButton type="submit">{existing ? "Update Profile" : "Create Profile"}</PixelButton>
        </form>
      )}

      {existing && (
        <PixelButton variant="danger" onClick={handleDelete} style={{ marginTop: "1rem" }}>
          Delete Profile
        </PixelButton>
      )}
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <main className="match-page">
      <div className="match-stage" style={{ display: "block", padding: "2rem clamp(1rem, 4vw, 4rem)" }}>
        <h1 className="pixel-page-title">Create / Edit Profile</h1>
        <Suspense fallback={<p style={{ fontFamily: "Press Start 2P", fontSize: "0.6rem" }}>Loading...</p>}>
          <EditProfileForm />
        </Suspense>
      </div>
    </main>
  );
}
