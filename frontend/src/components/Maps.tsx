// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const icon = new L.Icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// type Marcador = {
//   texto: string;
//   coords: [number, number];
// };

// export default function Mapa() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { recommendations } = location.state || { recommendations: "" };

//   const [marcadores, setMarcadores] = useState<Marcador[]>([]);
//   const [fullScreen] = useState(false);
//   const baseCoords: [number, number] = [-32.8895, -68.8458];

//   //Lista fija de Free Walking Tours
//   const toursFijos: Marcador[] = [
//     {
//       texto: "Free Walking Tour - Plaza Independencia",
//       coords: [-32.8895, -68.8458],
//     },
//     {
//       texto: "Free Walking Tour - Portones del Parque San Martín",
//       coords: [-32.8908, -68.8796],
//     },
//     {
//       texto: "Free Walking Tour - Plaza de Chacras de Coria",
//       coords: [-32.9675, -68.8792],
//     },
//   ];

//   function extraerLugar(texto: string): string {
//     let limpio = texto.replace(/^(\d+\.|D[ií]a\s*\d+:)\s*/i, "").trim();
//     const match = limpio.match(/\((.*?)\)/);
//     if (match) return match[1].trim();
//     limpio = limpio.split(":")[1] || limpio;
//     if (/^\$?\d+/.test(limpio)) return "";
//     return limpio.trim();
//   }

//   async function getCoords(place: string): Promise<[number, number] | null> {
//     try {
//       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//         place + " Mendoza Argentina"
//       )}`;
//       const res = await fetch(url, {
//         headers: { "User-Agent": "comfort-tour-app/1.0 (tuemail@example.com)" },
//       });
//       const data = await res.json();
//       if (data.length > 0) {
//         return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//       }
//       return null;
//     } catch (err) {
//       console.error("Error buscando coordenadas:", err);
//       return null;
//     }
//   }

//   useEffect(() => {
//     async function fetchMarkers() {
//       if (!recommendations) return;

//       const lista: string[] = recommendations
//         .split("\n")
//         .filter(
//           (line: string) =>
//             line.trim() &&
//             ( /^\d+\./.test(line.trim()) || /^D[ií]a\s*\d+:/i.test(line.trim()) )
//         );

//       const newMarkers: Marcador[] = [];

//       for (const texto of lista) {
//         const lugar = extraerLugar(texto);
//         if (!lugar) continue;

//         const coords = await getCoords(lugar);

//         if (coords) {
//           newMarkers.push({ texto: lugar, coords });
//         } else {
//           newMarkers.push({ texto: lugar + " (sin coords)", coords: baseCoords });
//         }

//         await new Promise((res) => setTimeout(res, 1000));
//       }

//       setMarcadores(newMarkers);
//     }

//     fetchMarkers();
//   }, [recommendations]);

//   return (
//     <div className="relative h-screen w-full flex flex-col items-center">
//       <MapContainer
//         center={baseCoords}
//         zoom={12}
//         style={{
//           height: "calc(80vh - 40px)",
//           width: fullScreen ? "100%" : "90%",
//           margin: "auto",
//           transition: "height 0.3s ease",
//         }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />


//         {marcadores.map((item, idx) => (
//           <Marker key={`ia-${idx}`} position={item.coords} icon={icon}>
//             <Popup>{item.texto}</Popup>
//           </Marker>
//         ))}


//         {toursFijos.map((tour, idx) => (
//           <Marker key={`fijo-${idx}`} position={tour.coords} icon={icon}>
//             <Popup>{tour.texto}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>


//       <div className="flex gap-4 mt-4 w-4/5 justify-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex-1 bg-cyan-500 px-4 py-2 rounded-lg text-white font-bold shadow"
//         >
//           Volver
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // 🎨 Iconos Personalizados para diferenciar contenido
// const createIcon = (color: string) => new L.DivIcon({
//   html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
//            <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
//          </div>`,
//   className: "",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30]
// });

// const iconIA = createIcon("#fd6303"); // Naranja Rumbo para la IA
// const iconTour = createIcon("#06b6d4"); // Cyan para Free Walking Tours

// type Marcador = {
//   texto: string;
//   coords: [number, number];
//   tipo: 'ia' | 'tour';
// };

// export default function Mapa() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { recommendations } = location.state || { recommendations: "" };

//   const [marcadores, setMarcadores] = useState<Marcador[]>([]);
//   const [loading, setLoading] = useState(true);
//   const baseCoords: [number, number] = [-32.8895, -68.8458];

//   const toursFijos: Marcador[] = [
//     { texto: "Free Walking Tour - Plaza Independencia", coords: [-32.8895, -68.8458], tipo: 'tour' },
//     { texto: "Free Walking Tour - Portones del Parque", coords: [-32.8908, -68.8796], tipo: 'tour' },
//     { texto: "Free Walking Tour - Plaza de Chacras", coords: [-32.9675, -68.8792], tipo: 'tour' },
//   ];

//   function extraerLugar(texto: string): string {
//     let limpio = texto.replace(/^(\d+\.|D[ií]a\s*\d+:)\s*/i, "").trim();
//     const match = limpio.match(/\((.*?)\)/);
//     if (match) return match[1].trim();
//     limpio = limpio.split(":")[1] || limpio;
//     return limpio.trim();
//   }

//   async function getCoords(place: string): Promise<[number, number] | null> {
//     try {
//       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place + " Mendoza Argentina")}`;
//       const res = await fetch(url, { headers: { "User-Agent": "rumbo-app/1.0" } });
//       const data = await res.json();
//       return data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
//     } catch (err) { return null; }
//   }

//   useEffect(() => {
//     async function fetchMarkers() {
//       if (!recommendations) { setLoading(false); return; }
//       const lista = recommendations.split("\n").filter((line: string) => line.trim() && (/^\d+\./.test(line.trim()) || /^D[ií]a\s*\d+:/i.test(line.trim())));
//       const newMarkers: Marcador[] = [];
//       for (const texto of lista) {
//         const lugar = extraerLugar(texto);
//         if (!lugar) continue;
//         const coords = await getCoords(lugar);
//         if (coords) newMarkers.push({ texto: lugar, coords, tipo: 'ia' });
//         await new Promise((res) => setTimeout(res, 600)); // Delay más corto
//       }
//       setMarcadores(newMarkers);
//       setLoading(false);
//     }
//     fetchMarkers();
//   }, [recommendations]);

//   return (
//     <div className="relative h-screen w-full bg-slate-50 font-alegreya flex flex-col">
      
//       {/* 🧭 HEADER DEL MAPA */}
//       <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[90%] md:w-auto">
//         <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-orange-100 flex items-center gap-4">
//           <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-orange-500 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">Tu Mapa de Aventuras</h1>
//         </div>
//       </div>

//       {/* 🗺️ CONTENEDOR DEL MAPA */}
//       <div className="flex-grow relative">
//         {loading && (
//           <div className="absolute inset-0 z-[2000] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
//             <p className="text-orange-600 font-bold">Ubicando tus destinos...</p>
//           </div>
//         )}

//         <MapContainer
//           center={baseCoords}
//           zoom={13}
//           zoomControl={false}
//           className="h-full w-full"
//         >
//           {/* TileLayer con un tono más suave y profesional */}
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
//           />
//           <ZoomControl position="bottomright" />

//           {/* Marcadores IA */}
//           {marcadores.map((item, idx) => (
//             <Marker key={`ia-${idx}`} position={item.coords} icon={iconIA}>
//               <Popup className="custom-popup">
//                 <div className="p-1">
//                   <span className="text-orange-600 font-bold block">Sugerencia IA</span>
//                   <p className="m-0 font-semibold">{item.texto}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           {/* Marcadores Tours */}
//           {toursFijos.map((tour, idx) => (
//             <Marker key={`fijo-${idx}`} position={tour.coords} icon={iconTour}>
//               <Popup>
//                 <div className="p-1">
//                   <span className="text-cyan-600 font-bold block">Free Walking Tour</span>
//                   <p className="m-0 font-semibold">{tour.texto}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>

//         {/* 🏷️ LEYENDA (Flotante) */}
//         <div className="absolute bottom-10 left-6 z-[1000] bg-white/90 p-4 rounded-2xl shadow-xl border border-slate-200 hidden md:block">
//           <p className="text-sm font-bold text-slate-700 mb-2">Referencias:</p>
//           <div className="flex flex-col gap-2 text-sm">
//             <div className="flex items-center gap-2">
//               <span className="w-3 h-3 rounded-full bg-[#fd6303]"></span> Tus Recomendaciones
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span> Free Walking Tours
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🎨 Iconos Personalizados (Mismos colores de tus referencias)
const createIcon = (color: string) => new L.DivIcon({
  html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
           <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
         </div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const iconIA = createIcon("#fd6303"); // Naranja para sugerencias
const iconTour = createIcon("#06b6d4"); // Cyan para Tours

type Marcador = {
  texto: string;
  coords: [number, number];
  tipo: 'ia' | 'tour';
};

export default function Mapa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations } = location.state || { recommendations: "" };

  const [marcadores, setMarcadores] = useState<Marcador[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'ia' | 'tour'>('todos');

  const baseCoords: [number, number] = [-32.8895, -68.8458];

  const toursFijos: Marcador[] = [
    { texto: "Free Walking Tour - Plaza Independencia", coords: [-32.8895, -68.8458], tipo: 'tour' },
    { texto: "Free Walking Tour - Portones del Parque", coords: [-32.8908, -68.8796], tipo: 'tour' },
    { texto: "Free Walking Tour - Plaza de Chacras", coords: [-32.9675, -68.8792], tipo: 'tour' },
  ];

  // NUEVA FUNCIÓN: Extrae el nombre del lugar de forma más precisa
  function extraerNombreLugar(linea: string): string {
    // Elimina el número inicial o "Día X:"
    let limpio = linea.replace(/^(\d+\.|D[ií]a\s*\d+:)\s*/i, "").trim();
    
    // Si tiene un guión largo (—) o corto (-), toma lo que está antes (Ej: "Azafrán (Centro) — Cena...")
    const partes = limpio.split(/[—–-]/);
    let nombre = partes[0].trim();

    // Elimina paréntesis informativos como "(Centro)" o "(Luján de Cuyo)" para la búsqueda, 
    // pero podrías dejarlo si quieres que aparezca así en el Popup
    return nombre;
  }

  async function getCoords(place: string): Promise<[number, number] | null> {
    try {
      // Limpiamos el nombre para la búsqueda (quitamos paréntesis para que Nominatim no se confunda)
      const busquedaLimpa = place.replace(/\(.*?\)/g, "").trim();
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(busquedaLimpa + " Mendoza Argentina")}`;
      
      const res = await fetch(url, { headers: { "User-Agent": "rumbo-app/1.0" } });
      const data = await res.json();
      
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    async function fetchMarkers() {
      if (!recommendations) { setLoading(false); return; }

      // Filtramos solo las líneas que parecen ser lugares (negritas o numeradas)
      const lineas = recommendations.split("\n").filter((line: string) => 
        line.trim() && !line.includes("Recomendaciones para la valija") && 
        (line.includes("**") || /^\d+\./.test(line.trim()) || /^D[ií]a\s*\d+:/i.test(line.trim()))
      );

      const newMarkers: Marcador[] = [];

      for (const linea of lineas) {
        // Limpiamos asteriscos de negrita si los hay
        const lineaLimpia = linea.replace(/\*\*/g, "");
        const nombreLugar = extraerNombreLugar(lineaLimpia);
        
        if (nombreLugar.length < 3) continue;

        const coords = await getCoords(nombreLugar);
        if (coords) {
          newMarkers.push({ texto: nombreLugar, coords, tipo: 'ia' });
        }
        
        // Delay para no saturar la API gratuita de mapas
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
    <div className="relative h-screen w-full bg-slate-50 font-alegreya flex flex-col">
      
      {/* 🧭 HEADER Y FILTROS */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[95%] md:w-auto flex flex-col gap-3 items-center">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-orange-100 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 text-slate-600 hover:text-orange-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="h-6 w-[1px] bg-slate-300"></div>

          <div className="flex gap-1 p-1 bg-slate-100 rounded-full">
            <button onClick={() => setFiltro('todos')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'todos' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`}>Todos</button>
            <button onClick={() => setFiltro('ia')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'ia' ? 'bg-[#fd6303] text-white' : 'text-slate-500'}`}>Sugerencias</button>
            <button onClick={() => setFiltro('tour')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filtro === 'tour' ? 'bg-[#06b6d4] text-white' : 'text-slate-500'}`}>Tours</button>
          </div>
        </div>
      </div>

      <div className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 z-[2000] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-orange-600 font-bold">Analizando "{extraerNombreLugar(recommendations.split('\n')[1] || '')}"...</p>
            <p className="text-slate-500 text-sm">Estamos ubicando tus lugares sugeridos en el mapa</p>
          </div>
        )}

        <MapContainer center={baseCoords} zoom={12} zoomControl={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />

          {marcadoresAMostrar.map((item, idx) => (
            <Marker key={`${item.tipo}-${idx}`} position={item.coords} icon={item.tipo === 'ia' ? iconIA : iconTour}>
              <Popup>
                <div className="p-1 min-w-[150px]">
                  <span className={`text-[10px] font-bold uppercase block mb-1 ${item.tipo === 'ia' ? 'text-orange-600' : 'text-cyan-600'}`}>
                    {item.tipo === 'ia' ? 'Recomendación IA' : 'Free Walking Tour'}
                  </span>
                  <p className="m-0 font-bold text-slate-800 text-sm leading-tight">{item.texto}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* LEYENDA */}
        <div className="absolute bottom-10 left-6 z-[1000] bg-white/90 p-4 rounded-2xl shadow-xl border border-slate-200 hidden md:block">
          <p className="text-sm font-bold text-slate-700 mb-2">Referencias:</p>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#fd6303]"></span> Tus Recomendaciones</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span> Free Walking Tours</div>
          </div>
        </div>
      </div>
    </div>
  );
}