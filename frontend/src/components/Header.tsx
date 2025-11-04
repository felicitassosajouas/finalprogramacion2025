import { useNavigate } from "react-router-dom";

interface HeaderProps {
    fullname: string;
}

export default function Header({fullname }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-700">
                Bienvenido, {fullname}
            </h2>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Cerrar sesión
            </button>
        </header>
    );
}