import { useState } from "react";

// T-01 - Login de ReportaCasa
// T-02 - Conexión con API y manejo de reportes
// T-03 - Validar correo y recuperar contraseña
// T-04 - Probar seguridad de cuentas

export default function App() {
  const [pantalla, setPantalla] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [reportes, setReportes] = useState([]);
  const [nuevaPass, setNuevaPass] = useState("");

  // T-04 - Contar intentos fallidos para bloquear
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  // T-03 - Validar correo
  function validarEmail(correo) {
    return correo.includes("@") && correo.includes(".com");
  }

  // T-04 - Detectar intento de hackeo
  function esPeligroso(texto) {
    const t = texto.toLowerCase();
    return t.includes(" or ") || t.includes("'='") || t.includes("<script") || t.includes("drop table") || t.includes("--");
  }

  // T-01 / T-02 / T-03 / T-04 - Entrar
  function entrar() {
    // T-04 - Si ya falló 3 veces, bloqueado
    if (bloqueado) {
      setMensaje("Cuenta bloqueada por muchos intentos. Espera y vuelve a intentar.");
      return;
    }
    // T-04 - Bloquear código sospechoso
    if (esPeligroso(email) || esPeligroso(password)) {
      setMensaje("Intento sospechoso bloqueado. No se permite código en el login.");
      return;
    }
    // T-03 - Validar correo
    if (!validarEmail(email)) {
      setMensaje("Pon un correo válido, ejemplo: prueba@gmail.com");
      return;
    }
    // T-03 - Validar mínimo 6
    if (password.length < 6) {
      setMensaje("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    // T-04 - Ahora sí, solo entra con la correcta
    if (email !== "prueba@gmail.com" || password !== "123456") {
      const nuevos = intentos + 1;
      setIntentos(nuevos);
      if (nuevos >= 3) {
        setBloqueado(true);
        setMensaje("3 intentos fallidos. Cuenta bloqueada por seguridad.");
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

  // T-03 - Recuperar, es SIMULACIÓN no manda correo real
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
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>¡Entraste a ReportaCasa!</h1>
        <p>¿Qué quieres reportar?</p>
        <p>Reportes cargados: {cargarReportes().length}</p>
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
      <p>Intentos fallidos: {intentos} de 3</p>
      <p style={{ color: "red" }}>{mensaje}</p>
    </div>
  );
}
