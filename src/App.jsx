import { useState } from "react";

// T-01 - Login de ReportaCasa
// T-02 - Conexión con API y manejo de reportes
// T-03 - Validar correo y recuperar contraseña
// T-04 - Probar seguridad de cuentas
// T-05 - Elegir servicio de mapas

export default function App() {
  const [pantalla, setPantalla] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [reportes, setReportes] = useState([]);
  const [nuevaPass, setNuevaPass] = useState("");
  const [intentos, setIntentos] = useState(0);
  const bloqueado = intentos >= 3;
  const [servicioMapa, setServicioMapa] = useState("leaflet");

  function validarEmail(correo) {
    return correo.includes("@") && correo.includes(".com");
  }

  function esPeligroso(texto) {
    const t = texto.toLowerCase();
    return t.includes(" or ") || t.includes("'='") || t.includes("<script") || t.includes("drop table") || t.includes("--");
  }

  function entrar() {
    if (bloqueado) {
      setMensaje("Cuenta bloqueada por muchos intentos. Dale a Desbloquear para volver a probar.");
      return;
    }
    if (esPeligroso(email) || esPeligroso(password)) {
      setMensaje("T-04: Intento sospechoso bloqueado. No se permite código en el login.");
      return;
    }
    if (!validarEmail(email)) {
      setMensaje("Pon un correo válido, ejemplo: prueba@gmail.com");
      return;
    }
    if (password.length < 6) {
      setMensaje("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    if (email !== "prueba@gmail.com" || password !== "123456") {
      const nuevos = intentos + 1;
      setIntentos(nuevos);
      if (nuevos >= 3) {
        setMensaje("T-04: 3 intentos fallidos. Cuenta bloqueada por seguridad.");
      } else {
        setMensaje("Contraseña incorrecta. Intento " + nuevos + " de 3.");
      }
      return;
    }
    setIntentos(0);
    setMensaje("");
    setPantalla("inicio");
  }

  function cargarReportes() {
    return reportes;
  }

  function recuperar() {
    if (!validarEmail(email)) {
      setMensaje("Primero pon tu correo válido para enviarte el link");
      return;
    }
    setMensaje("Te mandamos un link para recuperar tu contraseña a " + email);
    setPantalla("recuperar");
  }

  function guardarNueva() {
    if (nuevaPass.length < 6) {
      setMensaje("La nueva contraseña debe tener mínimo 6 caracteres");
      return;
    }
    setMensaje("¡Contraseña actualizada! Ahora entra con tu nueva contraseña");
    setPantalla("login");
    setPassword("");
    setNuevaPass("");
  }

  if (pantalla === "recuperar") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Recuperar contraseña</h1>
        <p>Te mandamos un link a: <b>{email}</b></p>
        <p>Escribe tu nueva contraseña:</p>
        <input type="password" placeholder="Nueva contraseña" value={nuevaPass} onChange={(e) => setNuevaPass(e.target.value)} style={{ padding: "10px", width: "250px" }} />
        <br /><br />
        <button onClick={guardarNueva} style={{ padding: "10px 20px" }}>Guardar nueva contraseña</button>
        <br /><br />
        <button onClick={() => setPantalla("login")}>Volver al login</button>
        <p style={{ color: "red" }}>{mensaje}</p>
      </div>
    );
  }

  if (pantalla === "inicio") {
    return (
      <div style={{ textAlign: "center", marginTop: "60px", padding: "0 20px" }}>
        <h1>¡Entraste a ReportaCasa!</h1>
        <p>¿Qué quieres reportar?</p>
        <p>Reportes cargados: {cargarReportes().length}</p>
        <div style={{ border: "1px solid #ccc", padding: "15px", margin: "15px auto", maxWidth: "500px", borderRadius: "10px", textAlign: "left" }}>
          <h3>T-05 - Servicio de mapas elegido</h3>
          <p><b>Elegido: Leaflet + OpenStreetMap</b></p>
          <label>Elige servicio de mapas: </label><br />
          <select value={servicioMapa} onChange={(e) => setServicioMapa(e.target.value)} style={{ padding: "8px", width: "100%", marginTop: "5px" }}>
            <option value="leaflet">Leaflet + OpenStreetMap - GRATIS, sin API Key ✅ ELEGIDO</option>
            <option value="google">Google Maps - Pide API Key y tarjeta ❌</option>
            <option value="mapbox">Mapbox - Pide cuenta y tiene límite gratis ❌</option>
          </select>
          <p>Servicio actual: <b>{servicioMapa}</b></p>
          <p>¿Por qué Leaflet? Es gratis, no pide API Key, funciona en React y deja poner marcadores.</p>
          <div style={{ background: "#e8f5e9", padding: "20px", marginTop: "10px", textAlign: "center" }}>
            🗺️ Aquí va a ir el mapa en la T-06
            <br />Servicio: {servicioMapa}
            <br />Zona piloto: Tlajomulco de Zúñiga, Jalisco
          </div>
        </div>
        <button onClick={() => setPantalla("login")}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ReportaCasa</h1>
      <p>Inicia sesión</p>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", width: "250px" }} />
      <br /><br />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", width: "250px" }} />
      <br /><br />
      <button onClick={entrar} style={{ padding: "10px 20px" }}>Entrar</button>
      <br /><br />
      <button onClick={recuperar} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>¿Olvidaste tu contraseña?</button>
      <p>Intentos fallidos T-04: {intentos} de 3</p>
      {bloqueado && (
        <button onClick={() => { setIntentos(0); setMensaje("Cuenta desbloqueada para probar de nuevo"); }} style={{ padding: "8px 16px", background: "orange" }}>
          Desbloquear para probar
        </button>
      )}
      <p style={{ color: "red" }}>{mensaje}</p>
    </div>
  );
}
}
