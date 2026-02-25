import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginView() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    const handleLogin = async (formData: LoginForm) => {
        try {
            // ÚNICO CAMBIO: URL absoluta para conectar con el backend en el puerto 4000
            const { data } = await api.post(`auth/login`, formData);
            
            // Guardamos el token para mantener la sesión iniciada
            localStorage.setItem('token', data.accessToken);
            
            toast.success('¡Bienvenido a Rumbo!');
            
            // Redirección al MainView de Mendoza
            setTimeout(() => { navigate("/users"); }, 600);
            
        } catch (error) {
            console.error("Error en el login:", error);
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || 'Error al iniciar sesión');
            } else {
                toast.error("Error de conexión con el servidor");
            }
        }
    };

    return (
        <div className="flex flex-col items-center font-alegreya">
            {/* Título en Naranja Rumbo y Bree Serif */}
            <h1 className="text-[#fd6303] text-5xl font-bree mb-8 tracking-tighter">
                Iniciá Sesión
            </h1>

            {/* Contenedor Celeste con bordes redondeados extremos */}
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-[#dbeafe] px-12 py-16 rounded-[2.5rem] shadow-sm w-full max-w-[450px] flex flex-col items-center"
                noValidate
            >
                <div className="w-full mb-8 flex flex-col items-center text-center">
                    <label className="text-2xl text-slate-800 font-bold mb-3">Correo electrónico</label>
                    <input
                        type="email"
                        className="w-full bg-[#abc5f5] border-none p-3 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-[#5d81d1]"
                        {...register('email', { required: "El correo es obligatorio" })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="w-full mb-10 flex flex-col items-center text-center">
                    <label className="text-2xl text-slate-800 font-bold mb-3">Contraseña</label>
                    <input
                        type="password"
                        className="w-full bg-[#abc5f5] border-none p-3 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-[#5d81d1]"
                        {...register('password', { required: "La contraseña es obligatoria" })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                {/* Botón Ingresar Blanco con Bree Serif */}
                <button
                    type="submit"
                    className="bg-white px-12 py-2 text-[#1e293b] font-bree text-2xl rounded-2xl shadow-md hover:scale-105 transition-transform border border-slate-100"
                >
                    Ingresar
                </button>
            </form>

            {/* Link inferior en Naranja Rumbo */}
            <nav className="mt-8 text-xl">
                <span className="text-slate-600">¿No te has registrado? </span>
                <Link to='/auth/register' className="text-[#fd6303] font-bold hover:underline">
                    Creá tu cuenta
                </Link>
            </nav>
        </div>
    );
}