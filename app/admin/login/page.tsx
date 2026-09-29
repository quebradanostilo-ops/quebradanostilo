
"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        color: "#101b35",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 12px 40px rgba(16, 27, 53, 0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "3px",
              marginBottom: "10px",
            }}
          >
            QUEBRADA NO STILO
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#101b35",
            }}
          >
            Painel Admin
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Entre com sua conta de administrador.
          </p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#334155",
              }}
            >
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#ffffff",
                color: "#101b35",
                border: "1px solid #cbd5e1",
                borderRadius: "11px",
                padding: "14px",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#334155",
              }}
            >
              Senha
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#ffffff",
                color: "#101b35",
                border: "1px solid #cbd5e1",
                borderRadius: "11px",
                padding: "14px",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "10px",
                color: "#b91c1c",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "11px",
              background: loading ? "#93b4f8" : "#2563eb",
              color: "#ffffff",
              padding: "15px",
              fontSize: "15px",
              fontWeight: 900,
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}