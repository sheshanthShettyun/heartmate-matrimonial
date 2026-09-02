"use client";

import { useState, useEffect } from "react";
import { userApi, User } from "@/lib/api";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";

export default function RegisterPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const res = await userApi.getAll();
      setUsers(res.data);
    } catch {
      setError("Backend not running. Start Spring Boot on localhost:8080");
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (editingId) {
        await userApi.update(editingId, { name, email });
        setMessage("User updated");
      } else {
        await userApi.create({ name, email });
        setMessage("User created");
      }
      setName("");
      setEmail("");
      setEditingId(null);
      await loadUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try {
      await userApi.delete(id);
      await loadUsers();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <main className="match-page">
      <div className="match-stage" style={{ display: "block", padding: "2rem clamp(1rem, 4vw, 4rem)" }}>
        <h1 className="pixel-page-title">User Management</h1>

        <div className="pixel-border pixel-card" style={{ maxWidth: 560, marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "Press Start 2P", fontSize: "0.7rem", color: "var(--pixel-pink)", marginBottom: "1rem" }}>
            {editingId ? "Update User" : "Add User"}
          </h2>
          {message && <div className="pixel-alert-success">{message}</div>}
          {error && <div className="pixel-alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <PixelInput label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <PixelInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <PixelButton type="submit">{editingId ? "Update" : "Create"}</PixelButton>
              {editingId && (
                <PixelButton variant="secondary" type="button" onClick={() => { setEditingId(null); setName(""); setEmail(""); }}>
                  Cancel
                </PixelButton>
              )}
            </div>
          </form>
        </div>

        <div className="pixel-border pixel-card">
          <h2 style={{ fontFamily: "Press Start 2P", fontSize: "0.7rem", color: "var(--pixel-pink)", marginBottom: "1rem" }}>
            All Users
          </h2>
          {users.map(u => (
            <div key={u.userId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "2px dashed var(--pixel-pink-soft)" }}>
              <span style={{ fontFamily: "Press Start 2P", fontSize: "0.5rem", color: "var(--pixel-ink)" }}>
                #{u.userId} {u.name} — {u.email}
              </span>
              <span style={{ display: "flex", gap: "0.5rem" }}>
                <PixelButton variant="secondary" onClick={() => { setEditingId(u.userId!); setName(u.name); setEmail(u.email); }}>
                  Edit
                </PixelButton>
                <PixelButton variant="danger" onClick={() => handleDelete(u.userId!)}>
                  Delete
                </PixelButton>
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
