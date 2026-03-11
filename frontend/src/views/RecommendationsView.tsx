import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Recomendaciones() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. LÓGICA DE PERSISTENCIA: Intentar recuperar de localStorage si el state está vacío
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem("current_recommendations");
    return location.state?.recommendations || saved || "";
  });

  const [modalContent, setModalContent] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string | undefined>(undefined);
  const [showFreeOptions, setShowFreeOptions] = useState(false);

  useEffect(() => {
    // 2. GUARDAR: Si entramos con recomendaciones nuevas, las respaldamos
    if (location.state?.recommendations) {
      localStorage.setItem("current_recommendations", location.state.recommendations);
    }

    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setFullname(parsedUser.fullname);
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [location.state]);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  const secciones = recommendations.split(/(?=Recomendaciones para la valija|Free Walking Tour|Día \d+|Eventos)/i);

  const contenidoEventos = secciones
    .filter((s) => 
      !s.toLowerCase().includes("valija") && 
      !s.toLowerCase().includes("walking tour")
    )
    .join("\n\n");

  const contenidoValija = secciones.find((s) => s.toLowerCase().includes("valija")) || "Cargando sugerencias...";

  const formatearTexto = (texto: string) => {
    return texto
      .replace(/(Recomendaciones de viaje:)/gi, "**$1**")
      .replace(/^(\d+\.|\w+\.\s*\d+\.)\s*([^—\n]+)(?= —)/gm, "**$2**")
      .replace(/^(\d+\.)\s+/gm, "");
  };

  const freeTours = [
    { nombre: "Portones Parque San Martin", id: "portonesSanMartin" },
    { nombre: "Plaza Independencia", id: "plazaIndependencia" },
    { nombre: "Plaza Chacras de Coria", id: "plazaChacras" }
  ];

  return (
    <div className="min-h-screen flex flex-col font-alegreya transition-colors duration-300 bg-white text-slate-900 dark:bg-[#0f172a] dark:text-white">
      
      {/* HEADER */}
      <header className="relative z-50 bg-[#eef1ee] dark:bg-slate-900 shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center">
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
            <img src="modo-nocturno.png" alt="Dark mode" className="w-6 h-6 object-contain" />
          </button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="logo1234.png" alt="Logo" className="h-14 md:h-24 w-auto object-contain" />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-10 px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center uppercase tracking-widest leading-tight text-slate-800 dark:text-white">
          Tu Experiencia <span className="text-[#fd6303]">Mendoza</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
          
          <button
            onClick={() => setModalContent(contenidoEventos)}
            className="group relative overflow-hidden rounded-[2rem] shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95"
          >
            <img src="/recomendacioes.png" alt="Eventos" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <span className="text-white text-2xl font-bold border-l-4 border-[#fd6303] pl-4">Eventos e Itinerario</span>
            </div>
          </button>

          <button
            onClick={() => setModalContent(contenidoValija)}
            className="group relative overflow-hidden rounded-[2rem] shadow-xl transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95"
          >
            <img src="/valija.png" alt="Valija" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <span className="text-white text-2xl font-bold border-l-4 border-[#fd6303] pl-4">¿Qué llevar?</span>
            </div>
          </button>

          <div 
            className="group relative overflow-hidden rounded-[2rem] shadow-xl transition-all hover:shadow-2xl h-80 bg-black cursor-pointer"
            onMouseLeave={() => setShowFreeOptions(false)}
          >
            <img src="/freewat.png" alt="Free Tours" className={`w-full h-full object-cover transition-all duration-500 ${showFreeOptions ? 'scale-110 blur-md opacity-50' : 'group-hover:scale-110'}`} />
            
            <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 ${showFreeOptions ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <p className="text-white font-bold mb-2 uppercase tracking-tighter text-center">¡Conoce Mendoza a pie!</p>
              {freeTours.map((tour, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/freeWalkingTour", { state: { lugar: tour.id } });
                  }}
                  className="w-full bg-[#fd6303] hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-xs md:text-sm shadow-xl transform transition active:scale-95"
                >
                  {tour.nombre}
                </button>
              ))}
            </div>

            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 transition-opacity duration-300 ${showFreeOptions ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={() => setShowFreeOptions(true)}
            >
              <span className="text-white text-2xl font-bold border-l-4 border-[#fd6303] pl-4 w-full text-left">Tours</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-16 mb-10">
          <button onClick={() => navigate("/onboarding")} className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition">Inicio</button>
          
          <button 
            onClick={() => {
              // Limpiar memoria al querer un viaje nuevo
              localStorage.removeItem("current_recommendations");
              navigate("/form");
            }} 
            className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Volver a formulario
          </button>

          <button 
            onClick={() => navigate("/mapa", { state: { recommendations } })} 
            className="bg-[#fd6303] text-white px-12 py-3 rounded-full font-bold shadow-lg hover:brightness-110 transform transition active:scale-95"
          >
            Ver en el Mapa
          </button>
        </div>
      </main>

      <footer className="w-full bg-[#fd6303] dark:bg-black py-8 text-white text-center">
        <p className="opacity-80">© 2026 Rumbo – Mendoza, Argentina.</p>
      </footer>

      {modalContent && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setModalContent(null)}>
          <div className="bg-white dark:bg-slate-800 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[2.5rem] relative shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 grid grid-cols-3 items-center">
               <div className="w-full"></div>
               <h2 className="text-xl font-bold text-[#fd6303] uppercase tracking-wider text-center">Detalles</h2>
               <div className="flex justify-end">
                 <button onClick={() => setModalContent(null)} className="text-slate-400 hover:text-red-500 transition-colors text-2xl">✕</button>
               </div>
            </div>

            <div className="overflow-y-auto p-8 md:p-12">
              <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-slate-600 dark:prose-p:text-slate-300">
                <ReactMarkdown>{formatearTexto(modalContent)}</ReactMarkdown>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
              <button onClick={() => setModalContent(null)} className="w-full bg-[#fd6303] text-white py-4 rounded-2xl font-bold shadow-lg transition active:scale-[0.98]">
                ¡Entendido, gracias!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}