<<<<<<< HEAD
// src/views/MainView.tsx
import Header from "../components/Header";
import { Carousel } from "../components/Carousel";
import { Features } from "../components/Features";
export default function MainView() {
    return (
        <div className="bg-[#f9faf5] flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
                <div className="text-center pt-12 pb-4 bg-white">
                    <h1 className="bg-[#f9faf5]  text-4xl md:text-5xl font-bold text-[#fd6303]">
                        Planificá tu propio viaje
                    </h1>
                </div>
                <Carousel />
                <Features />
            </main>
            <footer className="bg-[#fd6303] py-3 px-3 text-white py-6 text-center">
                <p>© 2026 Rumbo – Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
=======
import { Link } from "react-router-dom";

export default function MainView() {
    return (
    <div className="flex flex-col min-h-screen bg-slate-800">

    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Rumbo</h1>
        <div className="flex gap-4">
        <Link
            to="/auth/login"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
            Iniciar sesión
        </Link>
        <Link
            to="/auth/register"
            className="bg-white border border-orange-600 text-orange-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition"
        >
            Registrarse
        </Link>
        </div>
    </header>

    <main className="flex-grow flex items-center justify-center text-center">
        <p className="text-gray-400"></p>
    </main>

    <footer className="bg-orange-600 text-white py-4 text-center">
        <p className="text-sm">
        © {new Date().getFullYear()} Rumbo – Todos los derechos
        reservados.
        </p>
    </footer>
    </div>
);
}
>>>>>>> origin/master
