import { useNavigate, Link } from "react-router-dom";

interface HeaderProps {
    fullname?: string; // Opcional para cuando no están logueados
}

export default function Header({ fullname }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirige a la ruta de tu Router
    };

    return (
        <header className="bg-[#f9faf5] shadow-sm py-2 px-10 flex justify-between items-center">
            {/* LADO IZQUIERDO: Logo de Rumbo con tu azul */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                <img 
                    src="logo.png" 
                    alt="Rumbo Logo" 
                    className="h-10 w-auto object-contain"
                />
                <span className="text-[#5d81d1] font-bold text-3xl lowercase tracking-tighter">
                    rumbo
                </span>
            </div>

            {/* LADO DERECHO: Dinámico con tus colores de paleta */}
            <nav className="flex items-center gap-6">
                {fullname ? (
                    <>
                        <span className="text-slate-700 font-medium text-lg">
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
                        className="text-[#fd6303] font-bold text-xl hover:underline decoration-2 underline-offset-4"
                    >
                        Ingresá
                    </Link>
                )}
            </nav>
        </header>
    );
}