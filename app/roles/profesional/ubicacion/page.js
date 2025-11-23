"use client";
import { useState } from "react";

export default function UbicacionProfesional() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("La ubicación no está disponible en este dispositivo.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  };

  return (
    <main style={{ padding: 20, textAlign: "center" }}>
      <h1>Ubicación Profesional (GPS)</h1>

      <button
        onClick={obtenerUbicacion}
        style={{
          background: "#00aaff",
          padding: 15,
          color: "white",
          borderRadius: 10,
          fontSize: 18,
          border: "none",
          cursor: "pointer",
          marginBottom: 20
        }}
      >
        Obtener mi Ubicación
      </button>

      {lat && lng && (
        <div>
          <p><strong>Latitud:</strong> {lat}</p>
          <p><strong>Longitud:</strong> {lng}</p>

          <iframe
            width="100%"
            height="300"
            style={{ borderRadius: 10, marginTop: 20 }}
            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
    </main>
  );
}
