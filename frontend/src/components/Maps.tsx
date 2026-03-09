import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- ICONOS ---
const createIcon = (color: string) => new L.DivIcon({
  html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
           <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
         </div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const iconIA = createIcon("#fd6303");
const iconTour = createIcon("#06b6d4");
const iconUser = createIcon("#3b82f6"); 

function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 14);
  }, [coords, map]);
  return null;
}

type Marcador = {
  texto: string;
  coords: [number, number];
  tipo: 'ia' | 'tour' | 'user';
};

export default function Mapa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations } = location.state || { recommendations: "" };

  // --- ESTADOS ---
  const [marcadores, setMarcadores] = useState<Marcador[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'ia' | 'tour'>('todos');
  
  // Detectar si el sistema o la app ya están en modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const baseCoords: [number, number] = [-32.8895, -68.8458];

  const toursFijos: Marcador[] = [
    { texto: "Free Walking Tour - Plaza Independencia", coords: [-32.8895, -68.8458], tipo: 'tour' },
    { texto: "Free Walking Tour - Portones del Parque", coords: [-32.8908, -68.8796], tipo: 'tour' },
    { texto: "Free Walking Tour - Plaza de Chacras", coords: [-32.9675, -68.8792], tipo: 'tour' },
  ];

  // Alternar Modo Oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Error obteniendo ubicación:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const getDirectionsLink = (destCoords: [number, number]) => {
    const origin = userLocation ? `${userLocation[0]},${userLocation[1]}` : "Current+Location";
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destCoords[0]},${destCoords[1]}&travelmode=walking`;
  };

  function extraerNombreLugar(linea: string): string {
    let limpio = linea.replace(/^(\d+\.|D[ií]a\s*\d+:)\s*/i, "").trim();
    const partes = limpio.split(/[—–-]/);
    return partes[0].trim();
  }

  async function getCoords(place: string): Promise<[number, number] | null> {
    try {
      const busquedaLimpa = place.replace(/\(.*?\)/g, "").trim();
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(busquedaLimpa + " Mendoza Argentina")}`;
      const res = await fetch(url, { headers: { "User-Agent": "rumbo-app/1.0" } });
      const data = await res.json();
      return data && data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
    } catch (err) { return null; }
  }

  useEffect(() => {
    async function fetchMarkers() {
      if (!recommendations) { setLoading(false); return; }
      const lineas = recommendations.split("\n").filter((line: string) => 
        line.trim() && !line.includes("valija") && (line.includes("**") || /^\d+\./.test(line.trim()))
      );
      const newMarkers: Marcador[] = [];
      for (const linea of lineas) {
        const nombreLugar = extraerNombreLugar(linea.replace(/\*\*/g, ""));
        if (nombreLugar.length < 3) continue;
        const coords = await getCoords(nombreLugar);
        if (coords) newMarkers.push({ texto: nombreLugar, coords, tipo: 'ia' });
        await new Promise((res) => setTimeout(res, 600));
      }
      setMarcadores(newMarkers);
      setLoading(false);
    }
    fetchMarkers();
  }, [recommendations]);

  const marcadoresAMostrar = [
    ...(filtro === 'todos' || filtro === 'ia' ? marcadores : []),
    ...(filtro === 'todos' || filtro === 'tour' ? toursFijos : [])
  ];

  return (
    <div className={`relative h-screen w-full transition-colors duration-500 font-alegreya flex flex-col ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* HEADER / BOTONES */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[95%] md:w-auto flex flex-col gap-3 items-center">
        <div className={`mt-3 px-4 py-2 rounded-full shadow-2xl border flex items-center gap-4 backdrop-blur-md transition-all ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-orange-100'}`}>
          
          <button onClick={() => navigate(-1)} className={`p-2 transition-colors ${isDarkMode ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div className={`flex gap-2 p-1 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <button onClick={() => setFiltro('todos')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'todos' ? (isDarkMode ? 'bg-slate-600 text-white' : 'bg-white text-orange-600 shadow-sm') : 'text-slate-700'}`}>Todos</button>
            <button onClick={() => setFiltro('ia')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'ia' ? 'bg-[#fd6303] text-white' : 'text-slate-700'}`}>Sugerencias</button>
            <button onClick={() => setFiltro('tour')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'tour' ? 'bg-[#06b6d4] text-white' : 'text-slate-700'}`}>Tours</button>
          </div>

          <div className={`h-6 w-[1px] ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'}`}></div>

          {/* 🌙 BOTÓN MODO OSCURO */}
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-amber-400 text-slate-900 rotate-[360deg]' : 'bg-slate-800 text-white'}`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex-grow relative">
        {loading && (
          <div className={`absolute inset-0 z-[2000] backdrop-blur-sm flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-900/60' : 'bg-white/60'}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-orange-600 font-bold">Ubicando puntos en el mapa...</p>
          </div>
        )}

        <MapContainer center={baseCoords} zoom={12} zoomControl={false} className="h-full w-full">
          {/* CAMBIO DINÁMICO DE TILES SEGÚN EL MODO */}
          <TileLayer
            key={isDarkMode ? "dark-tiles" : "light-tiles"}
            attribution='© CARTO'
            url={isDarkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
          />
          <ZoomControl position="bottomright" />

          {userLocation && <RecenterMap coords={userLocation} />}

          {userLocation && (
            <Marker position={userLocation} icon={iconUser}>
              <Popup><b>Estás aquí</b></Popup>
            </Marker>
          )}

          {marcadoresAMostrar.map((item, idx) => (
            <Marker key={`${item.tipo}-${idx}`} position={item.coords} icon={item.tipo === 'ia' ? iconIA : iconTour}>
              <Popup>
                <div className={`p-1 min-w-[150px] transition-colors ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  <span className={`text-[10px] font-bold uppercase block mb-1 ${item.tipo === 'ia' ? 'text-orange-500' : 'text-cyan-500'}`}>
                    {item.tipo === 'ia' ? 'Recomendación IA' : 'Tour'}
                  </span>
                  <p className="m-0 font-bold text-sm mb-2">{item.texto}</p>
                  
                  <a 
                    href={getDirectionsLink(item.coords)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-orange-500 text-white text-[11px] py-1.5 rounded-lg font-bold hover:bg-orange-600 transition-colors no-underline"
                  >
                    Cómo llegar ↗
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}