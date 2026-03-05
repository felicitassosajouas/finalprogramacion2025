import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";

interface TokenPayload {
  fullname: string;
  email: string;
  iat: number;
  exp: number;
}

export default function OnboardingView() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let fullname = "";

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      fullname = decoded.fullname;
    } catch (error) {
      console.error("Token inválido");
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-alegreya">

      {/* 🔥 HEADER */}
      <Header fullname={fullname} />

      {/* 🔥 CONTENIDO PRINCIPAL */}
      <main className="relative flex-grow flex items-center justify-center overflow-hidden 
                       bg-gradient-to-br from-orange-50 via-white to-sky-100 
                       dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
                       transition-colors duration-300">

        {/* 🔵 CÍRCULOS FLOTANTES */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20 float-1" />
          <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2 float-2" />
          <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10 float-3" />
          <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10 float-4" />
        </div>

        {/* 🔥 CONTENEDOR 50/50 */}
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-16 grid md:grid-cols-2 items-center gap-12">

          {/* 🖼️ IZQUIERDA */}
          <div className="flex justify-center md:justify-start">
            <div className="p-4 md:p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md 
                            rounded-[3rem] shadow-2xl border border-white/50 dark:border-slate-700
                            w-full max-w-sm md:max-w-md ">
              <img
                src="/1f.png"
                alt="Onboarding"
                className="w-full h-auto rounded-[2rem] drop-shadow-xl object-contain"
              />
            </div>
          </div>

          {/* 🧳 DERECHA */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                            px-12 py-16 rounded-[2.5rem] shadow-2xl 
                            border border-white/40 dark:border-slate-700
                            text-center max-w-[450px] w-full">

              <h1 className="text-[#fd6303] dark:text-orange-400 
                             text-5xl font-bold mb-6 tracking-tight">
                Hola{fullname ? `, ${fullname}` : ""} !
              </h1>

              <p className="text-xl text-slate-700 dark:text-slate-300 mb-10">
                ¿Estás listo para planificar tu nueva aventura?
              </p>

              <button
                onClick={() => navigate("/users")}
                className="bg-[#fd6303] px-10 py-3 text-white text-xl 
                           font-semibold rounded-2xl shadow-lg 
                           hover:bg-orange-600 hover:scale-105 
                           transition-all"
              >
                Comenzar
              </button>

            </div>
          </div>

        </div>
      </main>

      {/* 🔥 FOOTER */}
      <footer
        className="bg-[#fd6303] dark:bg-slate-900 
                   py-6 px-3 text-white text-center 
                   transition-colors duration-300"
      >
        <p>© 2026 Rumbo – Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}