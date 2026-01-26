import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Marcador = {
  texto: string;
  coords: [number, number];
};

export default function Mapa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations } = location.state || { recommendations: "" };

  const [marcadores, setMarcadores] = useState<Marcador[]>([]);
  const [fullScreen] = useState(false);
  const baseCoords: [number, number] = [-32.8895, -68.8458];

  //Lista fija de Free Walking Tours
  const toursFijos: Marcador[] = [
    {
      texto: "Free Walking Tour - Plaza Independencia",
      coords: [-32.8895, -68.8458],
    },
    {
      texto: "Free Walking Tour - Portones del Parque San Martín",
      coords: [-32.8908, -68.8796],
    },
    {
      texto: "Free Walking Tour - Plaza de Chacras de Coria",
      coords: [-32.9675, -68.8792],
    },
  ];

  function extraerLugar(texto: string): string {
    let limpio = texto.replace(/^(\d+\.|D[ií]a\s*\d+:)\s*/i, "").trim();
    const match = limpio.match(/\((.*?)\)/);
    if (match) return match[1].trim();
    limpio = limpio.split(":")[1] || limpio;
    if (/^\$?\d+/.test(limpio)) return "";
    return limpio.trim();
  }

  async function getCoords(place: string): Promise<[number, number] | null> {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place + " Mendoza Argentina"
      )}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "comfort-tour-app/1.0 (tuemail@example.com)" },
      });
      const data = await res.json();
      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      console.error("Error buscando coordenadas:", err);
      return null;
    }
  }

  useEffect(() => {
    async function fetchMarkers() {
      if (!recommendations) return;

      const lista: string[] = recommendations
        .split("\n")
        .filter(
          (line: string) =>
            line.trim() &&
            ( /^\d+\./.test(line.trim()) || /^D[ií]a\s*\d+:/i.test(line.trim()) )
        );

      const newMarkers: Marcador[] = [];

      for (const texto of lista) {
        const lugar = extraerLugar(texto);
        if (!lugar) continue;

        const coords = await getCoords(lugar);

        if (coords) {
          newMarkers.push({ texto: lugar, coords });
        } else {
          newMarkers.push({ texto: lugar + " (sin coords)", coords: baseCoords });
        }

        await new Promise((res) => setTimeout(res, 1000));
      }

      setMarcadores(newMarkers);
    }

    fetchMarkers();
  }, [recommendations]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center">
      <MapContainer
        center={baseCoords}
        zoom={12}
        style={{
          height: "calc(80vh - 40px)",
          width: fullScreen ? "100%" : "90%",
          margin: "auto",
          transition: "height 0.3s ease",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {marcadores.map((item, idx) => (
          <Marker key={`ia-${idx}`} position={item.coords} icon={icon}>
            <Popup>{item.texto}</Popup>
          </Marker>
        ))}


        {toursFijos.map((tour, idx) => (
          <Marker key={`fijo-${idx}`} position={tour.coords} icon={icon}>
            <Popup>{tour.texto}</Popup>
          </Marker>
        ))}
      </MapContainer>


      <div className="flex gap-4 mt-4 w-4/5 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-cyan-500 px-4 py-2 rounded-lg text-white font-bold shadow"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
