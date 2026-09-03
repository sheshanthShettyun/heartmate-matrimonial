"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { interestApi, Interest } from "@/lib/api";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";
import { UserMenu } from "@/components/UserMenu";
import { PixelAvatar } from "@/components/PixelAvatar";

function InterestsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userId, setUserId] = useState(() => {
    return (
      searchParams.get("userId") ||
      (typeof window !== "undefined" ? localStorage.getItem("userId") : null) ||
      "1"
    );
  });

  const [sent, setSent] = useState<Interest[]>([]);
  const [received, setReceived] = useState<Interest[]>([]);
  const [activeTab, setActiveTab] = useState<"received" | "sent">(
    (searchParams.get("tab") as "received" | "sent") || "sent"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadInterests = async (targetId?: string) => {
    const idToFetch = targetId || userId;
    if (!idToFetch) return;
    setLoading(true);
    setError("");
    try {
      if (idToFetch === "60") {
        // Admin Mode: Aggregate system interests across users 1 to 12
        const allSent: Interest[] = [];
        for (let uid = 1; uid <= 12; uid++) {
          try {
            const res = await interestApi.getSent(uid);
            allSent.push(...res.data);
          } catch {}
        }
        // Deduplicate by interestId
        const uniqueSent = Array.from(new Map(allSent.map(i => [i.interestId, i])).values());
        setSent(uniqueSent);
        setReceived([]);
      } else {
        const s = await interestApi.getSent(parseInt(idToFetch));
        const r = await interestApi.getReceived(parseInt(idToFetch));
        setSent(s.data);
        setReceived(r.data);
      }
    } catch {
      setError("Failed to load interests from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadInterests(userId);
  }, [userId]);

  const handleAccept = async (id: number) => {
    try {
      await interestApi.accept(id);
      await loadInterests();
    } catch {
      setError("Failed to accept interest");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await interestApi.reject(id);
      await loadInterests();
    } catch {
      setError("Failed to reject interest");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this interest record?")) return;
    try {
      await interestApi.delete(id);
      await loadInterests();
    } catch {
      setError("Failed to delete interest");
    }
  };

  const displayed = activeTab === "received" ? received : sent;

  return (
    <main className="match-page" style={{ minHeight: "100vh" }}>
      <UserMenu />
      <div className="match-stage" style={{ display: "block", padding: "2rem clamp(1rem, 4vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}>
        
        <PixelButton variant="secondary" onClick={() => router.back()} style={{ marginBottom: "1.5rem" }}>
          ← Back
        </PixelButton>

        <h1 className="pixel-page-title">Manage Interests</h1>
        {error && <div className="pixel-alert-error">{error}</div>}

        <div className="pixel-border pixel-card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <PixelInput 
                label="Viewing User ID" 
                value={userId} 
                onChange={e => {
                  setUserId(e.target.value);
                  if (typeof window !== "undefined") localStorage.setItem("userId", e.target.value);
                }} 
                placeholder="Enter User ID" 
                type="number"
                min="1"
              />
            </div>
            <PixelButton onClick={() => loadInterests()}>
              {loading ? "Loading..." : "Refresh"}
            </PixelButton>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <PixelButton 
            variant={activeTab === "sent" ? "primary" : "secondary"} 
            onClick={() => setActiveTab("sent")}
            style={{ flex: 1 }}
          >
            Sent ({sent.length})
          </PixelButton>
          <PixelButton 
            variant={activeTab === "received" ? "primary" : "secondary"} 
            onClick={() => setActiveTab("received")}
            style={{ flex: 1 }}
          >
            Received ({received.length})
          </PixelButton>
        </div>

        {displayed.map(i => {
          const otherUser = activeTab === "sent" ? i.receiver : i.sender;
          return (
            <div key={i.interestId} className="pixel-border pixel-card" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <PixelAvatar gender={activeTab === "sent" ? "Female" : "Male"} size="card" />
                  <div>
                    <h3 style={{ fontFamily: "Press Start 2P", fontSize: "0.65rem", color: "var(--pixel-pink-deep)", margin: "0 0 0.4rem" }}>
                      {userId === "60" 
                        ? `${i.sender?.name || `User #${i.sender?.userId}`} ➔ ${i.receiver?.name || `User #${i.receiver?.userId}`}` 
                        : (otherUser?.name || `User #${otherUser?.userId}`)}
                    </h3>
                    <p style={{ fontFamily: "Press Start 2P", fontSize: "0.45rem", color: "var(--pixel-ink)", margin: "0 0 0.4rem" }}>
                      {userId === "60" ? `Interest ID #${i.interestId} | Sender: ${i.sender?.email}` : otherUser?.email}
                    </p>
                    <span style={{
                      fontFamily: "Press Start 2P", 
                      fontSize: "0.45rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      background: i.status === "ACCEPTED" ? "#27ae6026" : i.status === "REJECTED" ? "#e74c3c26" : "var(--pixel-pink-soft)",
                      border: `2px solid ${i.status === "ACCEPTED" ? "#27ae60" : i.status === "REJECTED" ? "#e74c3c" : "var(--pixel-pink)"}`,
                      color: i.status === "ACCEPTED" ? "#27ae60" : i.status === "REJECTED" ? "#e74c3c" : "var(--pixel-pink-deep)",
                      display: "inline-block"
                    }}>
                      STATUS: {i.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {activeTab === "received" && i.status === "PENDING" && (
                    <>
                      <PixelButton onClick={() => handleAccept(i.interestId!)}>Accept</PixelButton>
                      <PixelButton variant="danger" onClick={() => handleReject(i.interestId!)}>Reject</PixelButton>
                    </>
                  )}
                  <PixelButton variant="danger" onClick={() => handleDelete(i.interestId!)} style={{ fontSize: "0.5rem", padding: "0.5rem 0.75rem" }}>
                    Remove
                  </PixelButton>
                </div>
              </div>
            </div>
          );
        })}

        {displayed.length === 0 && !loading && (
          <div className="pixel-border pixel-card" style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ fontFamily: "Press Start 2P", fontSize: "0.6rem", color: "var(--pixel-ink)" }}>
              No {activeTab} interests stored in MySQL yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function InterestsPage() {
  return (
    <Suspense fallback={<p style={{ fontFamily: "Press Start 2P", fontSize: "0.6rem", padding: "2rem" }}>Loading...</p>}>
      <InterestsContent />
    </Suspense>
  );
}
