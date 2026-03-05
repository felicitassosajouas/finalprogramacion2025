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

  // 🔥 Alternar modo oscuro
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  // 🔥 Mantener preferencia guardada
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="bg-[#eef1ee] dark:bg-slate-900 shadow-sm py-2 px-10 flex justify-between items-center transition-colors duration-300">
      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="logo1234.png"
          alt="Rumbo Logo"
          className="h-10 w-auto object-contain"
        />
        <span className="text-[#5d81d1] dark:text-blue-400 font-bold text-3xl tracking-tighter ">
          Rumbo
        </span>
      </div>

      {/* DERECHA */}
      <nav className="flex items-center gap-6">
        {/* 🌙 BOTÓN DARK MODE */}
        <button
          onClick={toggleDarkMode}
          className="bg-slate-200 dark:bg-slate-700 text-black dark:text-white px-3 py-1 rounded-lg transition flex items-center justify-center"
        >
          <img
            src="modo-nocturno.png"
            alt="Toggle dark mode"
            className="w-5 h-5 object-contain"
          />
        </button>

        {fullname ? (
          <>
            {/* <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">
                            Hola, {fullname}
                        </span> */}
            <button
              onClick={handleLogout}
              className="bg-[#dd474c] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition font-semibold"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          // <Link
          //     to="/login"
          //     className="text-[#fd6303] dark:text-orange-400 font-bold text-xl hover:underline decoration-2 underline-offset-4"
          // >
          //     Ingresá
          // </Link>
          <div className="relative group flex items-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#fd6303] dark:text-orange-400 font-bold text-xl hover:underline decoration-2 underline-offset-4"
            >
              {/* Ícono usuario */}
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
              Ingresar
            </Link>

            {/* Tooltip */}
            <div
              className="absolute top-12 right-0 w-80
                    opacity-0 translate-y-2 scale-95
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                    transition-all duration-300
                    bg-white dark:bg-slate-800
                    text-slate-700 dark:text-slate-200
                    rounded-2xl shadow-2xl
                    p-6 z-50"
            >
              <p className="text-base font-medium mb-4 leading-relaxed">
                Planificá tu viaje de forma inteligente Iniciá sesión para
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
