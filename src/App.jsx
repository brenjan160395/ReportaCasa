import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function App() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);

  const entrar = () => {
    if (correo === "prueba@gmail.com" && password === "123456") {
      setLogueado(true);
    } else {
      alert("Correo o contraseña incorrectos. Usa prueba@gmail.com / 123456");
    }
  };

  if (!logueado) {
    return (
      <div style={{ maxWidth: "350px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", textAlign: "center" }}>
        <h2>ReportaCasa</h2>
        <p>App de reportes de vivienda - Tlajomulco</p>
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={entrar} style={{ width: "100%", padding: "10px", background: "#1976d2", color: "white", border: "none", borderRadius: "5px" }}>
          Entrar
        </button>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>Prueba: prueba@gmail.com / 123456</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", padding: "20px", fontFamily: "Arial" }}>
      <h2>¡Entraste a ReportaCasa!</h2>
      <p>¿Qué quieres reportar?</p>
      <p>Reportes cargados: 0</p>

      {/* MAPA - Tlajomulco de Zúñiga */}
      <div style={{ background: "#fff", padding: "15px", border: "1px solid #ddd", borderRadius: "10px" }}>
        <h3>🗺️ Mapa - Tlajomulco de Zúñiga</h3>
        <div style={{ height: "350px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
          <MapContainer center={[20.473, -103.445]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[20.473, -103.445]}>
              <Popup>
                <b>ReportaCasa - Tlajomulco</b><br />
                Zona piloto: Tlajomulco de Zúñiga, Jalisco
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <p>Toca el pin 📍 para ver la zona piloto</p>
      </div>

      <button onClick={() => setLogueado(false)} style={{ padding: "8px 15px", marginTop: "20px" }}>Cerrar sesión</button>
    </div>
  );
}
