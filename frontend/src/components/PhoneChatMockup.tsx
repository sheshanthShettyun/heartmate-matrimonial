"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  sender: "user" | "partner";
  text: string;
  time: string;
}

export function PhoneChatMockup() {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "partner",
      text: "Aww, finally! 🤭 Match toh ho gaya... Ab batao pehli chai kab pila rahe ho? 😉",
      time: "Just now"
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const showCallToast = (type: "voice" | "video") => {
    setToastMessage(`${type === "voice" ? "📞 Voice Call" : "📹 Video Call"} feature coming soon! 😉`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsgList: Message[] = [...messages, { sender: "user", text: userMsgText, time: timeNow }];
    setMessages(newMsgList);
    setInput("");
    setLoading(true);

    try {
      // Map message history for Sarvam AI
      const apiHistory = newMsgList.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiHistory,
          partnerName: "Priya Patel",
          partnerGender: "Female"
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [
          ...prev,
          { sender: "partner", text: data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: "partner", text: "Oops, network issue lag raha hai! 😅 Phir se bolo?", time: timeNow }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "partner", text: "Achha suno, lagta hai signal weak hai! Dobara message karo? 😉", time: timeNow }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, fontFamily: "sans-serif" }}>
      {/* Floating Toggle Phone Icon when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "linear-gradient(135deg, #e8658a, #ff007f)",
            color: "#fff",
            border: "4px solid #fff",
            borderRadius: "30px",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            boxShadow: "0 8px 24px rgba(232, 101, 138, 0.5)",
            cursor: "pointer",
            transition: "transform 0.2s ease"
          }}
        >
          <span style={{ fontSize: "20px" }}>📱</span>
          <span>Chat with Match (Priya)</span>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2ecc71" }} />
        </button>
      )}

      {/* Smartphone Mockup Container when open */}
      {isOpen && (
        <div
          style={{
            width: "360px",
            height: "640px",
            background: "#1e1e24",
            borderRadius: "44px",
            border: "12px solid #2d2d35",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Top Camera Island / Speaker */}
          <div style={{ background: "#2d2d35", height: "26px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ width: "90px", height: "16px", background: "#111", borderRadius: "10px", display: "flex", justifyContent: "flex-end", paddingRight: "8px", alignItems: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1a1a2e", border: "1px solid #333" }} />
            </div>
          </div>

          {/* Phone Header Bar */}
          <div style={{ background: "#e8658a", color: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", width: "38px", height: "38px", borderRadius: "50%", overflow: "hidden", border: "2px solid #fff", background: "#fff" }}>
                <Image src="/avatar-girl.png" alt="Priya" width={38} height={38} style={{ objectFit: "cover" }} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700 }}>Priya Patel</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", opacity: 0.9 }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2ecc71", display: "inline-block" }} />
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Action Icons */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button 
                onClick={() => showCallToast("voice")}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px" }}
                title="Voice Call"
              >
                📞
              </button>
              <button 
                onClick={() => showCallToast("video")}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px" }}
                title="Video Call"
              >
                📹
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px" }}
                title="Minimize Phone"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Notification Toast for Call / Video Call */}
          {toastMessage && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.85)",
                color: "#ff7eb3",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                zIndex: 10,
                textAlign: "center",
                whiteSpace: "nowrap",
                border: "1px solid #ff7eb3",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}
            >
              {toastMessage}
            </div>
          )}

          {/* Chat Messages Scrolling Container */}
          <div
            style={{
              flex: 1,
              background: "#faf3f5",
              padding: "14px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div style={{ textAlign: "center", margin: "6px 0" }}>
              <span style={{ background: "#e8d8de", color: "#666", fontSize: "10px", padding: "3px 10px", borderRadius: "10px" }}>
                Matched on HeartMate ♥
              </span>
            </div>

            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%"
                }}
              >
                <div
                  style={{
                    background: m.sender === "user" ? "linear-gradient(135deg, #e8658a, #ff007f)" : "#ffffff",
                    color: m.sender === "user" ? "#ffffff" : "#2d2d35",
                    padding: "10px 14px",
                    borderRadius: m.sender === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
                    border: m.sender === "partner" ? "1px solid #eee" : "none"
                  }}
                >
                  {m.text}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#999",
                    marginTop: "3px",
                    textAlign: m.sender === "user" ? "right" : "left",
                    padding: "0 4px"
                  }}
                >
                  {m.time}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", background: "#fff", padding: "8px 14px", borderRadius: "16px", fontSize: "12px", color: "#888", border: "1px solid #eee" }}>
                <span>Priya is typing... 💬</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              background: "#fff",
              padding: "10px",
              display: "flex",
              gap: "8px",
              borderTop: "1px solid #eee",
              alignItems: "center"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type in Hinglish..."
              style={{
                flex: 1,
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
                padding: "8px 14px",
                fontSize: "13px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: "#e8658a",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px"
              }}
            >
              ➔
            </button>
          </form>

          {/* Phone Bottom Home Bar Indicator */}
          <div style={{ background: "#fff", height: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "110px", height: "4px", background: "#333", borderRadius: "2px" }} />
          </div>
        </div>
      )}
    </div>
  );
}
