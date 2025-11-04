// src/views/UsersView.tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    fullname: string;
    email: string;
    iat: number;
    exp: number;
}

export default function UsersView() {
    const token = localStorage.getItem("token");
    let fullname = "";

    if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        fullname = decoded.fullname;
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header fullname={fullname} />

            <main className="flex-grow p-10 text-center">
                <h1 className="text-4xl font-bold text-slate-700">
                    ¡Tu próxima aventura comienza aquí! Contanos un poco sobre vos completando este formulario y te mostraremos viajes, eventos y free walking tours ideales para vivir experiencias únicas.
                </h1>

                <nav className="mt-10">
                    <Link
                        className="bg-slate-800 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                        to="/form"
                    >
                        Descubrir mis opciones
                    </Link>
                </nav>
            </main>

            <footer className="bg-slate-800 text-white py-6 text-center">
                <p className="text-sm">© 2025 Tu Plataforma de Viajes. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}