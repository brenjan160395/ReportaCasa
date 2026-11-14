import { useState } from "react";
import AuthScreens from "./T-01_AuthScreens.jsx";

// Componente principal de la app
// Aquí decidimos qué pantalla mostrar: login o inicio
export default function App() {
  // Estado para saber si el usuario ya entró o no
  // false = todavía está en login, true = ya le dio Entrar
  const [logueado, setLogueado] = useState(false);

  // Si ya está logueado, ya no mostramos el login
  // Mostramos la pantalla de bienvenida de ReportaCasa
  if (logueado) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>¡Entraste a ReportaCasa!</h1>
        <p>¿Qué quieres reportar?</p>
        {/* Botón para regresar al login, solo para probar */}
        <button onClick={() => setLogueado(false)}>Cerrar sesión</button>
      </div>
    );
  }

  // Si todavía NO está logueado, mostramos el login (T-01)
  // onLogin es la función que se ejecuta cuando le da a Entrar
  // Cuando se ejecuta, cambia logueado a true y cambia de pantalla
  return <AuthScreens onLogin={() => setLogueado(true)} />;
}
