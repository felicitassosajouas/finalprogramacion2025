// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import Header from "../components/Header";

// export default function Recomendaciones() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { recommendations: initialRecommendations } = location.state || {
//     recommendations: "",
//   };

//   const [recommendations, setRecommendations] = useState(initialRecommendations);
//   const [modalContent, setModalContent] = useState<string | null>(null);

//   // 👇 obtener fullname desde localStorage
//   const [fullname, setFullname] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setFullname(parsedUser.fullname);
//     }
//   }, []);

//   const secciones = recommendations.split(/(?=Recomendaciones para la valija|Free Walking Tour|Día \d+|Eventos)/i);

//   const contenidoEventos = secciones
//     .filter(
//       (s) =>
//         !s.toLowerCase().includes("valija") &&
//         !s.toLowerCase().includes("walking")
//     )
//     .join("\n");

//   const contenidoValija =
//     secciones.find((s) => s.toLowerCase().includes("valija")) ||
//     "Cargando sugerencias...";

//   const contenidoFree =
//     secciones.find((s) => s.toLowerCase().includes("walking")) ||
//     "No disponible.";

//   return (
//     <div className="min-h-screen flex flex-col font-alegreya transition-colors duration-300 bg-white text-slate-900 dark:bg-[#0f172a] dark:text-white">

//       {/* HEADER */}
//       <Header fullname={fullname} />

//       <main className="flex-grow flex flex-col items-center py-10 px-4 w-full">

//         <h1 className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center uppercase tracking-widest leading-tight text-slate-800 dark:text-white">
//           Tu Experiencia <span className="text-[#fd6303]">Mendoza</span>
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-7xl mx-auto items-center px-4">

//           <button
//             onClick={() => setModalContent(contenidoEventos)}
//             className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
//           >
//             <img
//               src="/recomendacioes.png"
//               alt="Eventos"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-end p-6">
//               <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
//                 Eventos e Itinerario
//               </span>
//             </div>
//           </button>

//           <button
//             onClick={() => setModalContent(contenidoValija)}
//             className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
//           >
//             <img
//               src="/valija.png"
//               alt="Valija"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-end p-6">
//               <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
//                 ¿Qué llevar?
//               </span>
//             </div>
//           </button>

//           <button
//             onClick={() => setModalContent(contenidoFree)}
//             className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
//           >
//             <img
//               src="/freewat.png"
//               alt="Free Tour"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-end p-6">
//               <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
//                 Free Tours
//               </span>
//             </div>
//           </button>

//         </div>

//         <div className="flex flex-wrap justify-center gap-4 mt-16 mb-10">
//           <button
//             onClick={() => navigate("/onboarding")}
//             className="px-6 py-2 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 transition"
//           >
//             Inicio
//           </button>

//           <button
//             onClick={() => navigate("/form")}
//             className="px-6 py-2 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 transition"
//           >
//             Volver al Formulario
//           </button>

//           <button
//             onClick={() =>
//               navigate("/mapa", { state: { recommendations } })
//             }
//             className="bg-[#fd6303] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition"
//           >
//             Ver en el Mapa
//           </button>
//         </div>

//       </main>

//       <footer className="w-full bg-[#fd6303] dark:bg-black py-6 text-white text-center">
//         <p>© 2026 Rumbo – Todos los derechos reservados.</p>
//       </footer>

//       {modalContent && (
//         <div
//           className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//           onClick={() => setModalContent(null)}
//         >
//           <div
//             className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl text-slate-900 dark:text-white"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setModalContent(null)}
//               className="absolute top-5 right-5 text-slate-400 hover:text-red-500 text-2xl font-bold"
//             >
//               ✕
//             </button>

//             <div className="prose prose-slate dark:prose-invert max-w-none">
//               <ReactMarkdown>{modalContent}</ReactMarkdown>
//             </div>

//             <button
//               onClick={() => setModalContent(null)}
//               className="mt-10 w-full bg-[#fd6303] text-white py-3 rounded-xl font-bold"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Recomendaciones() {
  const location = useLocation();
  const navigate = useNavigate();

  const { recommendations: initialRecommendations } = location.state || {
    recommendations: "",
  };

  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // 👇 obtener fullname desde localStorage
  const [fullname, setFullname] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setFullname(parsedUser.fullname);
    }
    
    // 🔥 Mantener preferencia de tema (del AuthLayout)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 🔥 Toggle dark mode (del AuthLayout)
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  const secciones = recommendations.split(/(?=Recomendaciones para la valija|Free Walking Tour|Día \d+|Eventos)/i);

  const contenidoEventos = secciones
    .filter(
      (s) =>
        !s.toLowerCase().includes("valija") &&
        !s.toLowerCase().includes("walking")
    )
    .join("\n");

  const contenidoValija =
    secciones.find((s) => s.toLowerCase().includes("valija")) ||
    "Cargando sugerencias...";

  const contenidoFree =
    secciones.find((s) => s.toLowerCase().includes("walking")) ||
    "No disponible.";

  return (
    <div className="min-h-screen flex flex-col font-alegreya transition-colors duration-300 bg-white text-slate-900 dark:bg-[#0f172a] dark:text-white">

      {/* 🔷 HEADER ESTILO UNIFICADO (AuthLayout) */}
      <header className="relative bg-[#eef1ee] dark:bg-slate-900 shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center transition-colors duration-300">
        
        {/* IZQUIERDA - DARK MODE */}
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center 
                w-9 h-9 md:w-10 md:h-10
                rounded-full
                bg-slate-200/70 dark:bg-slate-700/70
                hover:bg-slate-300 dark:hover:bg-slate-600
                transition-all duration-200"            
          >
            <img
              src="modo-nocturno.png"
              alt="Toggle dark mode"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </button>
        </div>

        {/* LOGO CENTRADO */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="logo1234.png"
            alt="Rumbo Logo"
            className="h-14 md:h-24 w-auto object-contain"
          />
        </div>

        {/* Espacio vacío a la derecha */}
        <div className="flex-grow md:flex-initial w-9 md:w-10"></div>
      </header>

      <main className="flex-grow flex flex-col items-center py-10 px-4 w-full">

        <h1 className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center uppercase tracking-widest leading-tight text-slate-800 dark:text-white">
          Tu Experiencia <span className="text-[#fd6303]">Mendoza</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-7xl mx-auto items-center px-4">

          <button
            onClick={() => setModalContent(contenidoEventos)}
            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
          >
            <img
              src="/recomendacioes.png"
              alt="Eventos"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-end p-6">
              <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
                Eventos e Itinerario
              </span>
            </div>
          </button>

          <button
            onClick={() => setModalContent(contenidoValija)}
            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
          >
            <img
              src="/valija.png"
              alt="Valija"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-end p-6">
              <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
                ¿Qué llevar?
              </span>
            </div>
          </button>

          <button
            onClick={() => setModalContent(contenidoFree)}
            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-105"
          >
            <img
              src="/freewat.png"
              alt="Free Tour"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-end p-6">
              <span className="text-white text-2xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl">
                Free Tours
              </span>
            </div>
          </button>

        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-16 mb-10">
          <button
            onClick={() => navigate("/onboarding")}
            className="px-6 py-2 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 transition"
          >
            Inicio
          </button>

          <button
            onClick={() => navigate("/form")}
            className="px-6 py-2 rounded-full border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 transition"
          >
            Volver al Formulario
          </button>

          <button
            onClick={() =>
              navigate("/mapa", { state: { recommendations } })
            }
            className="bg-[#fd6303] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition"
          >
            Ver en el Mapa
          </button>
        </div>

      </main>

      <footer className="w-full bg-[#fd6303] dark:bg-black py-6 text-white text-center">
        <p>© 2026 Rumbo – Todos los derechos reservados.</p>
      </footer>

      {modalContent && (
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown>{modalContent}</ReactMarkdown>
            </div>

            <button
              onClick={() => setModalContent(null)}
              className="mt-10 w-full bg-[#fd6303] text-white py-3 rounded-xl font-bold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}