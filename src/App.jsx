import { useState } from "react";

// T-01 - Login de ReportaCasa
// T-02 - Conexión con API y manejo de reportes
// T-03 - Validar correo y recuperar contraseña

export default function App() {
  // T-01 - Estados del login
  // T-02 - pantalla también sirve para mostrar inicio después de conectar con la API
  // T-03 - pantalla ahora puede ser: login, recuperar o inicio
  const [pantalla, setPantalla] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  // T-02 - Estado de la API / reportes
  // Aquí se guardan los datos que vienen de la API de reportes
  const [reportes, setReportes] = useState([]);

  // T-03 - Estado para la nueva contraseña en recuperar
  const [nuevaPass, setNuevaPass] = useState("");

  // T-03 - Función para validar el correo
  // T-03 - Revisa que el correo tenga @ y .com
  function validarEmail(correo) {
    return correo.includes("@") && correo.includes(".com");
  }

  // T-01 - Función para entrar al sistema
  // T-02 - Aquí es donde la T-02 conecta con la API de login
  // T-03 - Ahora primero valida correo y contraseña antes de entrar
  function entrar() {
    // T-03 - Validar correo
    if (!validarEmail(email)) {
      setMensaje("Pon un correo válido, ejemplo: prueba@gmail.com");
      return;
    }
    // T-03 - Validar contraseña mínimo 6 caracteres
    if (password.length < 6) {
      setMensaje("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    setMensaje("");
    // T-02 - Si la API responde bien, entra a inicio y carga los reportes
    setPantalla("inicio");
  }

  // T-02 - Función de la API para obtener reportes
  // T-02 - En la Tarea 2 esto conectaba con GET /api/reportes
  function cargarReportes() {
    // T-02 - Aquí se llamaría a la API para traer los reportes
    // Por ahora se dejan en el estado reportes
    return reportes;
  }

  // T-03 - Función para recuperar contraseña
  // T-03 - Si el correo es válido, manda el mensaje y cambia a pantalla recuperar
  function recuperar() {
    if (!validarEmail(email)) {
      setMensaje("Primero pon tu correo válido para enviarte el link");
      return;
    }
    setMensaje("Te mandamos un link para recuperar tu contraseña a " + email);
    setPantalla("recuperar");
  }

  // T-03 - Función para guardar la nueva contraseña
  // T-03 - Valida que la nueva contraseña tenga mínimo 6 caracteres y regresa al login
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

  // T-03 - Pantalla de recuperar contraseña
  // T-03 - Aquí el usuario escribe su nueva contraseña
  if (pantalla === "recuperar") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Recuperar contraseña</h1>
        <p>Te mandamos un link a: <b>{email}</b></p>
        <p>Escribe tu nueva contraseña:</p>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaPass}
          onChange={(e) => setNuevaPass(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <br /><br />
        <button onClick={guardarNueva} style={{ padding: "10px 20px" }}>Guardar nueva contraseña</button>
        <br /><br />
        <button onClick={() => setPantalla("login")}>Volver al login</button>
        <p style={{ color: "red" }}>{mensaje}</p>
      </div>
    );
  }

  // T-01 - Pantalla de inicio después del login
  // T-02 - Aquí se muestran los reportes que vienen de la API
  if (pantalla === "inicio") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>¡Entraste a ReportaCasa!</h1>
        <p>¿Qué quieres reportar?</p>
        {/* T-02 - Lista de reportes de la API */}
        <p>Reportes cargados: {cargarReportes().length}</p>
        <button onClick={() => setPantalla("login")}>Cerrar sesión</button>
      </div>
    );
  }

  // T-01 - Pantalla de login
  // T-02 - Este login conecta con la API de la T-02
  // T-03 - Ahora con validación de correo y recuperar contraseña
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ReportaCasa</h1>
      <p>Inicia sesión</p>
      {/* T-01 - Input de correo */}
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />
      <br /><br />
      {/* T-01 - Input de contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />
      <br /><br />
      {/* T-01 - Botón entrar */}
      <button onClick={entrar} style={{ padding: "10px 20px" }}>Entrar</button>
      <br /><br />
      {/* T-03 - Botón para recuperar contraseña */}
      <button onClick={recuperar} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
        ¿Olvidaste tu contraseña?
      </button>
      <p style={{ color: "red" }}>{mensaje}</p>
    </div>
  );
}
