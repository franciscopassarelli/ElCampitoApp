import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { format } from "date-fns";

function Clima({ fecha }) {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-34.60&longitude=-58.38&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto"
      );

      const data = await response.json();
      setClima(data);
    };

    obtenerClima();
  }, []);

  const fechaSeleccionada = fecha
    ? format(fecha, "yyyy-MM-dd")
    : null;

  const indice = clima?.daily?.time?.findIndex(
    (dia) => dia === fechaSeleccionada
  );

  return (
    <Card
      sx={{
        mt: 2,
        width: 320,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          🌤️ Clima en Buenos Aires
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>🌡️ Actual</span>
            <strong>{clima?.current?.temperature_2m}°C</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>🔺 Máxima</span>
            <strong>{clima?.daily?.temperature_2m_max?.[indice]}°C</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>🔻 Mínima</span>
            <strong>{clima?.daily?.temperature_2m_min?.[indice]}°C</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>💨 Viento</span>
            <strong>{clima?.current?.wind_speed_10m} km/h</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>💧 Humedad</span>
            <strong>{clima?.current?.relative_humidity_2m}%</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Clima;