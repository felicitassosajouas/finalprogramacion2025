// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Header from "../components/Header";

// interface TokenPayload {
//   fullname: string;
//   email: string;
//   iat: number;
//   exp: number;
// }

// export default function OnboardingView() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   let fullname = "";

//   if (token) {
//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       fullname = decoded.fullname;
//     } catch (error) {
//       console.error("Token inválido");
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen font-alegreya">
//       {/* 🔥 HEADER */}
//       <Header fullname={fullname} />

//       {/* 🔥 CONTENIDO PRINCIPAL (Padding optimizado) */}
//       <main className="relative flex-grow flex items-center justify-center overflow-hidden 
//                        bg-gradient-to-br from-orange-50 via-white to-sky-100 
//                        dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
//                        transition-colors duration-300 pt-4 pb-10 md:py-10">

//         {/* 🔵 CÍRCULOS FLOTANTES */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-orange-300 opacity-20 rounded-full top-1/4 -left-20 animate-pulse" />
//           <div className="absolute w-48 md:w-72 h-48 md:h-72 bg-sky-300 opacity-20 rounded-full -top-10 left-1/2 -translate-x-1/2" />
//           <div className="absolute w-64 h-64 bg-orange-200 opacity-15 rounded-full bottom-10 -right-10" />
//         </div>

//         {/* 🔥 CONTENEDOR ADAPTADO */}
//         <div className="relative z-10 w-full max-w-7xl px-6 md:px-16 flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-12">

//           {/* 🖼️ SECCIÓN IMAGEN (Empujada hacia arriba en móvil) */}
//           <div className="flex justify-center w-full order-1 md:order-none -mt-10 md:mt-0 transition-all duration-500">
//             <div className="p-3 md:p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md 
//                             rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-white/50 dark:border-slate-700
//                             w-48 sm:w-64 md:w-full max-w-md">
//               <img
//                 src="/Ob1.png"
//                 alt="Onboarding"
//                 className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] drop-shadow-lg object-contain"
//               />
//             </div>
//           </div>

//           {/* 🧳 SECCIÓN TEXTO */}
//           <div className="flex justify-center w-full order-2 md:order-none">
//             <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
//                             px-8 md:px-12 py-10 md:py-16 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl 
//                             border border-white/40 dark:border-slate-700
//                             text-center max-w-[450px] w-full">

//               <h1 className="text-[#fd6303] dark:text-orange-400 
//                              text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
//                 ¡Hola{fullname ? `, ${fullname.split(' ')[0]}` : ""}!
//               </h1>

//               <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 md:mb-10 leading-relaxed">
//                 ¿Estás listo para planificar tu nueva aventura?
//               </p>

//               <button
//                 onClick={() => navigate("/users")}
//                 className="w-full sm:w-auto bg-[#fd6303] px-10 py-3.5 text-white text-lg md:text-xl 
//                            font-semibold rounded-2xl shadow-lg 
//                            hover:bg-orange-600 hover:scale-105 active:scale-95
//                            transition-all duration-300"
//               >
//                 Comenzar
//               </button>
//             </div>
//           </div>

//         </div>
//       </main>

//       {/* 🔥 FOOTER */}
//       <footer className="bg-[#fd6303] dark:bg-slate-950 py-6 px-3 text-white text-center text-sm md:text-base">
//         <p>© 2026 Rumbo – Todos los derechos reservados.</p>
//       </footer>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";

export default function OnboardingView() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let fullname = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      fullname = decoded.fullname;
    } catch (error) {
      console.error("Token inválido");
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-alegreya">
      <Header fullname={fullname} />

      <main className="relative flex-grow flex items-center justify-center overflow-hidden 
                       bg-gradient-to-br from-orange-50 via-white to-sky-100 
                       dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
                       transition-colors duration-300 pt-4 pb-10 md:py-10">

        {/* 🔵 CÍRCULOS FLOTANTES CON ANIMACIÓN */}
{/* 🔵 CÍRCULOS USANDO TUS CLASES DE index.css */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-orange-300 opacity-20 rounded-full top-1/4 -left-20 float-1" />
          <div className="absolute w-48 md:w-72 h-48 md:h-72 bg-sky-300 opacity-20 rounded-full -top-10 left-1/2 -translate-x-1/2 float-2" />
          <div className="absolute w-64 h-64 bg-orange-200 opacity-15 rounded-full bottom-10 -right-10 float-3" />
          <div className="absolute w-80 h-80 bg-sky-200 opacity-20 rounded-full -bottom-20 left-10 float-4" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 md:px-16 flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-12">
          {/* IMAGEN SUBIDA EN MÓVIL */}
          <div className="flex justify-center w-full order-1 md:order-none -mt-10 md:mt-0">
            <div className="p-3 md:p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md 
                            rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-white/50 dark:border-slate-700
                            w-48 sm:w-64 md:w-full max-w-md">
              <img src="/Ob1.png" alt="Onboarding" className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] drop-shadow-lg object-contain" />
            </div>
          </div>

          <div className="flex justify-center w-full order-2 md:order-none">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 md:px-12 py-10 md:py-16 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-700 text-center max-w-[450px] w-full">
              <h1 className="text-[#fd6303] dark:text-orange-400 text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
                {/* ¡Hola{fullname ? `, ${fullname.split(' ')[0]}` : ""}! */}
                 ¡Hola{fullname ? <span className="capitalize">, {fullname.split(' ')[0]}</span> : ""}!

              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 md:mb-10 leading-relaxed">
                ¿Estás listo para planificar tu nueva aventura?
              </p>
              <button onClick={() => navigate("/users")} className="w-full sm:w-auto bg-[#fd6303] px-10 py-3.5 text-white text-lg md:text-xl font-semibold rounded-2xl shadow-lg hover:bg-orange-600 hover:scale-105 transition-all">
                Comenzar
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#fd6303] dark:bg-slate-950 py-6 px-3 text-white text-center text-sm md:text-base">
        <p>© 2026 Rumbo – Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}