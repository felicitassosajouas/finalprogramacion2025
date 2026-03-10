// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";

// export default function RecomendacionFree() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { lugar } = location.state || { lugar: "" };


//   const lugares: Record<string, string> = {
//     plazaIndependencia: `  
// Es el corazón de Mendoza, rodeada de bares, museos y espacios culturales.  
// - Ideal para comenzar un recorrido a pie.  
// - Disfrutá de espectáculos callejeros y ferias artesanales.  
// - Bancos y zonas verdes para descansar.  
// - Perfecta para fotos y conocer la vida urbana de la ciudad.
// - **Horario:** 9:00 AM - 20:00 PM  
// - **Recorrido:** Comenzar desde la Plaza, recorrer la Peatonal Sarmiento y terminar en la zona de bares.  
// - **Guía turístico:** Juan Rodriguez 
// - **Puntos de interés cercanos:** Museo del Área Fundacional, Teatro Independencia, ferias artesanales.  
// - Ideal para fotos y disfrutar espectáculos callejeros.`,

//     portonesSanMartin: `  
// Entrada principal a uno de los parques urbanos más grandes de Sudamérica.  
// - Perfecto para caminar, hacer picnic o pasear junto al lago.  
// - Monumentos históricos y senderos rodeados de naturaleza.  
// - Miradores con vistas panorámicas de Mendoza y la Cordillera de los Andes.  
// - Ideal para actividades al aire libre y fotografía.
// - **Horario:** 8:00 AM - 7:00 PM  
// - **Recorrido recomendado:** Paseo por el Lago, subida al Cerro de la Gloria, picnic en zonas verdes.  
// - **Guía turístico:** Facundo Sosa.  
// - **Puntos de interés cercanos:** Monumento al Ejército de los Andes, Jardín Zoológico, Estadio Malvinas Argentinas.  
// - Ideal para caminar, hacer picnic y disfrutar de la naturaleza.`,

//     plazaChacras: `
// Un lugar encantador rodeado de bodegas, restaurantes y artesanías locales.  
// - Perfecto para caminar con tranquilidad.  
// - Degustación de vinos mendocinos en bodegas cercanas.  
// - Cafés, plazas y espacios para niños.  
// - Ideal para disfrutar la cultura local y la gastronomía.
// - **Horario:** 10:00 AM - 6:00 PM  
// - **Recorrido recomendado:** Pasear por la plaza, visitar bodegas cercanas y cafés.  
// - **Guía turístico:** Sofia Gomez.  
// - **Puntos de interés cercanos:** Bodega La Azul, Mercado de Artesanías, Plaza Central.  
// - Ideal para caminar con tranquilidad y disfrutar de la cultura local.`,
//   };

//   const texto =
//     lugares[lugar] || "No hay información disponible para este lugar.";

//   return (
//     <div className="bg-slate-800 min-h-screen flex items-center justify-center p-4">
//       <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">

//         <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700">
//           Free Walking Tour
//         </h1>

//         <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-4">
//           {lugar === "plazaIndependencia" && "📍 Plaza Independencia"}
//           {lugar === "portonesSanMartin" &&
//             " 🌳 Portones del Parque San Martín"}
//           {lugar === "plazaChacras" && " 🍷 Plaza de Chacras de Coria"}
//         </h2>


//         <div className="prose prose-slate max-w-none text-lg md:text-xl">
//           <ReactMarkdown>{texto}</ReactMarkdown>
//         </div>


//         <div className="flex flex-wrap gap-4 justify-center mt-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition"
//           >
//             Volver
//           </button>
//           <button
//             onClick={() =>
//               navigate("/reserve", { state: { recommendations: texto } })
//             }
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition"
//           >
//             Reservar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function RecomendacionFree() {
  const location = useLocation();
  const navigate = useNavigate();

  const { lugar } = location.state || { lugar: "" };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Lógica de Modo Oscuro al cargar
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

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

  const texto = lugares[lugar] || "No hay información disponible para este lugar.";

  return (
    <div className="relative min-h-screen flex flex-col font-alegreya overflow-hidden transition-colors duration-300 
      bg-gradient-to-br from-orange-50 via-white to-sky-100 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
      {/* CÍRCULOS FLOTANTES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full top-10 left-10 animate-pulse dark:bg-orange-500 dark:opacity-20" />
        <div className="absolute w-96 h-96 bg-sky-300 opacity-30 rounded-full bottom-20 right-10 animate-pulse dark:bg-sky-500 dark:opacity-20" />
        <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 left-40 animate-pulse dark:bg-orange-400 dark:opacity-10" />
        <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full top-10 right-10 animate-pulse dark:bg-sky-400 dark:opacity-15" />
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-[#eef1ee]/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center transition-colors duration-300">
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
            <img src="/modo-nocturno.png" alt="Dark mode" className="w-6 h-6 object-contain" />
          </button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo1234.png" alt="Logo" className="h-14 md:h-24 w-auto object-contain" />
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 md:p-10">
        <div className="max-w-4xl w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-700 transform transition-all">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-[#fd6303] dark:text-orange-400 uppercase tracking-tighter">
            Free Walking Tour
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white mb-8 border-b-2 border-orange-100 dark:border-slate-700 pb-4">
            {lugar === "plazaIndependencia" && " Plaza Independencia"}
            {lugar === "portonesSanMartin" && " Portones del Parque San Martín"}
            {lugar === "plazaChacras" && " Plaza de Chacras de Coria"}
          </h2>

          {/* CLASES CORREGIDAS PARA TEXTO OSCURO */}
          <div className="prose prose-lg max-w-none 
            dark:prose-invert 
            text-slate-700 dark:text-slate-200
            prose-p:text-slate-600 dark:prose-p:text-slate-300 
            prose-strong:text-[#fd6303] dark:prose-strong:text-orange-400
            prose-li:text-slate-600 dark:prose-li:text-slate-300">
            <ReactMarkdown>{texto}</ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition active:scale-95"
            >
              Volver
            </button>
            <button
              onClick={() => navigate("/reserve", { state: { recommendations: texto } })}
              className="bg-[#fd6303] hover:bg-orange-600 text-white px-10 py-3 rounded-full font-bold shadow-lg transform transition active:scale-95"
            >
              Reservar Ahora
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full bg-[#fd6303] dark:bg-black py-8 text-white text-center">
        <p className="opacity-80">© 2026 Rumbo – Mendoza, Argentina.</p>
      </footer>
    </div>
  );
}