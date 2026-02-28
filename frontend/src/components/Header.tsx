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
        <header className="bg-[#f9faf5] dark:bg-slate-900 shadow-sm py-2 px-10 flex justify-between items-center transition-colors duration-300">
            
            {/* LOGO */}
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img
                    src="logo.png"
                    alt="Rumbo Logo"
                    className="h-10 w-auto object-contain"
                />
                <span className="text-[#5d81d1] dark:text-blue-400 font-bold text-3xl lowercase tracking-tighter">
                    rumbo
                </span>
            </div>

            {/* DERECHA */}
            <nav className="flex items-center gap-6">

                {/* 🌙 BOTÓN DARK MODE */}
                <button
                    onClick={toggleDarkMode}
                    className="bg-slate-200 dark:bg-slate-700 text-black dark:text-white px-3 py-1 rounded-lg transition"
                >
                    🌙
                </button>

                {fullname ? (
                    <>
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">
                            Hola, {fullname}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-[#dd474c] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition font-semibold"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="text-[#fd6303] dark:text-orange-400 font-bold text-xl hover:underline decoration-2 underline-offset-4"
                    >
                        Ingresá
                    </Link>
                )}
            </nav>
        </header>
    );
}