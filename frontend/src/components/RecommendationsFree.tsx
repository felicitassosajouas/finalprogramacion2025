import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function RecomendacionFree() {
  const location = useLocation();
  const navigate = useNavigate();

  const { lugar } = location.state || { lugar: "" };


  const lugares: Record<string, string> = {
    plazaIndependencia: `  
Es el corazón de Mendoza, rodeada de bares, museos y espacios culturales.  
- Ideal para comenzar un recorrido a pie.  
- Disfrutá de espectáculos callejeros y ferias artesanales.  
- Bancos y zonas verdes para descansar.  
- Perfecta para fotos y conocer la vida urbana de la ciudad.
- **Horario:** 9:00 AM - 20:00 PM  
- **Recorrido:** Comenzar desde la Plaza, recorrer la Peatonal Sarmiento y terminar en la zona de bares.  
- **Guía turístico:** Juan Rodriguez 
- **Puntos de interés cercanos:** Museo del Área Fundacional, Teatro Independencia, ferias artesanales.  
- Ideal para fotos y disfrutar espectáculos callejeros.`,

    portonesSanMartin: `  
Entrada principal a uno de los parques urbanos más grandes de Sudamérica.  
- Perfecto para caminar, hacer picnic o pasear junto al lago.  
- Monumentos históricos y senderos rodeados de naturaleza.  
- Miradores con vistas panorámicas de Mendoza y la Cordillera de los Andes.  
- Ideal para actividades al aire libre y fotografía.
- **Horario:** 8:00 AM - 7:00 PM  
- **Recorrido recomendado:** Paseo por el Lago, subida al Cerro de la Gloria, picnic en zonas verdes.  
- **Guía turístico:** Facundo Sosa.  
- **Puntos de interés cercanos:** Monumento al Ejército de los Andes, Jardín Zoológico, Estadio Malvinas Argentinas.  
- Ideal para caminar, hacer picnic y disfrutar de la naturaleza.`,

    plazaChacras: `
Un lugar encantador rodeado de bodegas, restaurantes y artesanías locales.  
- Perfecto para caminar con tranquilidad.  
- Degustación de vinos mendocinos en bodegas cercanas.  
- Cafés, plazas y espacios para niños.  
- Ideal para disfrutar la cultura local y la gastronomía.
- **Horario:** 10:00 AM - 6:00 PM  
- **Recorrido recomendado:** Pasear por la plaza, visitar bodegas cercanas y cafés.  
- **Guía turístico:** Sofia Gomez.  
- **Puntos de interés cercanos:** Bodega La Azul, Mercado de Artesanías, Plaza Central.  
- Ideal para caminar con tranquilidad y disfrutar de la cultura local.`,
  };

  const texto =
    lugares[lugar] || "No hay información disponible para este lugar.";

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700">
          Free Walking Tour
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-4">
          {lugar === "plazaIndependencia" && "📍 Plaza Independencia"}
          {lugar === "portonesSanMartin" &&
            " 🌳 Portones del Parque San Martín"}
          {lugar === "plazaChacras" && " 🍷 Plaza de Chacras de Coria"}
        </h2>


        <div className="prose prose-slate max-w-none text-lg md:text-xl">
          <ReactMarkdown>{texto}</ReactMarkdown>
        </div>


        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Volver
          </button>
          <button
            onClick={() =>
              navigate("/reserve", { state: { recommendations: texto } })
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
