"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (user === "Abraham" && pass === "Arp15162427") {
      router.push("/roles/admin/panel");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <main style={{ padding: 20, textAlign: "center" }}>
      <h1>Login Administrador</h1>

      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={input}
      />

      <button onClick={handleLogin} style={btn}>
        Entrar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}

const input = {
  display: "block",
  margin: "10px auto",
  padding: "12px",
  width: "80%",
  fontSize: "18px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btn = {
  background: "#0070f3",
  padding: "15px",
  color: "white",
  fontSize: "18px",
  borderRadius: "10px",
  border: "none",
  marginTop: "10px",
  cursor: "pointer",
};
