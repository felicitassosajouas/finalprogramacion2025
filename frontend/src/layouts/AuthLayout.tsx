import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function AuthLayout() {
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
      {/* 🔷 HEADER */}
      <header className="relative flex items-center justify-center py-4 shadow-sm bg-[#eef1ee] dark:bg-slate-900 transition-colors duration-300">
        <img
          src="logo1234.png"
          alt="Rumbo Logo"
          className="h-20 w-auto object-contain"
        />

        {/* Botón dark mode */}
        <button
          onClick={toggleDarkMode}
          className="absolute right-8 bg-slate-200 dark:bg-slate-700 text-black dark:text-white px-3 py-1 rounded-lg transition hover:scale-105"
        >
          <img
            src="modo-nocturno.png"
            alt="Toggle dark mode"
            className="w-5 h-5 object-contain"
          />
        </button>
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
              "text-2xl px-8 py-5 rounded-2xl shadow-2xl border border-orange-200",
            title: "text-xl font-semibold",
            description: "text-lg",
            progressBar: "bg-[#fd6303]",
          },
        }}
      />
    </div>
  );
}
