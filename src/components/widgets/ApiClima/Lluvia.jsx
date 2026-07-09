import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { format } from "date-fns";

function Lluvia({ fecha }) {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-34.60&longitude=-58.38&hourly=precipitation_probability&timezone=auto"
      );

      const data = await response.json();
      setClima(data);
    };

    obtenerClima();
  }, []);

  const fechaSeleccionada = fecha
    ? format(fecha, "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const horas = clima?.hourly?.time || [];
  const lluvias = clima?.hourly?.precipitation_probability || [];

  const indiceManana = horas.findIndex(
    (hora) => hora === `${fechaSeleccionada}T09:00`
  );

  const indiceTarde = horas.findIndex(
    (hora) => hora === `${fechaSeleccionada}T15:00`
  );

  const indiceNoche = horas.findIndex(
    (hora) => hora === `${fechaSeleccionada}T21:00`
  );

  const probManana =
    indiceManana !== -1 ? lluvias[indiceManana] : "--";

  const probTarde =
    indiceTarde !== -1 ? lluvias[indiceTarde] : "--";

  const probNoche =
    indiceNoche !== -1 ? lluvias[indiceNoche] : "--";

  return (
    <Card
      sx={{
        mt: 2,
        width: 320,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "16px",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          🌧️ Probabilidad de lluvia
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>🌅 Mañana</span>
            <strong>{probManana}%</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>☀️ Tarde</span>
            <strong>{probTarde}%</strong>
          </Typography>

          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>🌙 Noche</span>
            <strong>{probNoche}%</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Lluvia;