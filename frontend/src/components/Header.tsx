import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

interface HeaderProps {
  fullname?: string;
}

export default function Header({ fullname }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="relative bg-[#eef1ee] dark:bg-slate-900 shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center justify-between transition-colors duration-300">
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

      {/* DERECHA */}
      <nav className="flex items-center gap-4 md:gap-6">
        {fullname ? (
          <button
            onClick={handleLogout}
            className="bg-[#dd474c] text-white px-3 md:px-4 py-1.5 rounded-lg hover:opacity-90 transition font-semibold text-sm md:text-base"
          >
            Cerrar sesión
          </button>
        ) : (
          <div className="relative group flex items-center">
            {/* BOTÓN INGRESAR */}
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#fd6303] dark:text-orange-400 font-bold text-sm md:text-xl hover:underline decoration-2 underline-offset-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>

              <span className="hidden sm:inline">Ingresá</span>
            </Link>

            {/* TOOLTIP (solo desktop) */}
            <div
              className="hidden md:block absolute top-12 right-0 w-80
              opacity-0 translate-y-2 scale-95
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
              transition-all duration-300
              bg-white dark:bg-slate-800
              text-slate-700 dark:text-slate-200
              rounded-2xl shadow-2xl
              p-6 z-50"
            >
              <p className="text-base font-medium mb-4 leading-relaxed">
                Planificá tu viaje de forma inteligente. Iniciá sesión para
                recibir recomendaciones personalizadas.
              </p>

              <Link
                to="/login"
                className="block text-center bg-[#fd6303] hover:bg-orange-600
                text-white font-semibold text-base
                py-2.5 rounded-full
                transition"
              >
                Entrar a mi cuenta
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
