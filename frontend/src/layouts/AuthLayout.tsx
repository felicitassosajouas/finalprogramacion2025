import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();

  // 🔥 Mantener preferencia de tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 🔥 Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* 🔷 HEADER ESTILO UNIFICADO */}
      <header className="relative bg-[#eef1ee] dark:bg-slate-900 shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center transition-colors duration-300">
        
        {/* IZQUIERDA - DARK MODE (Copiado de tu Header original) */}
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

        {/* Espacio vacío a la derecha para mantener el logo perfectamente centrado */}
        <div className="flex-grow md:flex-initial w-9 md:w-10"></div>
      </header>

      {/* CONTENIDO */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* TOASTER */}
      <Toaster
        position="top-center"
        richColors
        visibleToasts={3}
        duration={3000}
        toastOptions={{
          classNames: {
            toast:
              "text-2xl px-8 py-3 rounded-2xl shadow-2xl border border-orange-200",
            title: "text-xl font-alegreya items-center",
            description: "text-lg",
            progressBar: "bg-[#fd6303]",
          },
        }}
      />
    </div>
  );
}