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
        background: "#050505",
        color: "#fff",
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
          background: "#0d0d0d",
          border: "1px solid #252525",
          padding: "32px",
          boxShadow: "0 0 40px rgba(0, 255, 120, 0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              color: "#00ff78",
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
            }}
          >
            Painel Admin
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#888",
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
                background: "#050505",
                color: "#fff",
                border: "1px solid #333",
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
                background: "#050505",
                color: "#fff",
                border: "1px solid #333",
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
                background: "#250909",
                border: "1px solid #6b1717",
                color: "#ff6b6b",
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
              background: loading ? "#555" : "#00ff78",
              color: "#000",
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