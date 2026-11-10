import { useState } from "react";

export default function AuthScreens() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ nombre: "", correo: "", pass: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? `Bienvenido ${form.correo}` : `Cuenta creada para ${form.nombre}`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", fontFamily: "sans-serif", padding: 16, boxSizing: "border-box" }}>
      <div style={{ background: "white", padding: "36px 32px", borderRadius: 20, width: "100%", maxWidth: 380, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box" }}>
        
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 48, lineHeight: 1 }}>🏠</div>
          <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.2, color: "#0f172a" }}>ReportaCasa</h1>
          <p style={{ margin: 0, marginTop: 6, color: "#64748b", fontSize: 15 }}>{isLogin ? "Inicia sesión" : "Crea tu cuenta"}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!isLogin && (
            <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 15, outline: "none" }} />
          )}
          <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 15, outline: "none" }} />
          <input name="pass" type="password" placeholder="Contraseña" value={form.pass} onChange={handleChange} required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 15, outline: "none" }} />
          <button style={{ padding: 13, border: "none", borderRadius: 8, background: "#2563eb", color: "white", fontWeight: "bold", fontSize: 15, cursor: "pointer", marginTop: 4 }}>
            {isLogin ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <p style={{ textAlign: "center", margin: 0 }}>
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "bold", fontSize: 14 }}>
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}