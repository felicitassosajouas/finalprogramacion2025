import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginView() {
    const initialValues: LoginForm = {
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleLogin = async (formData: LoginForm) => {
        try {
            const { data } = await api.post(`/auth/login`, formData);
            
            // 1. Guardamos el token
            localStorage.setItem('token', data.accessToken);

            // 2. Notificación con texto visible (Gris oscuro)
            toast.success('¡Bienvenido a Rumbo!', {
                style: {
                    background: '#ffffff',
                    color: '#1e293b',
                    borderBottom: '4px solid #fd6303'
                }
            });

            // 3. REDIRECCIÓN FORZADA: Te manda a la landing "/"
            setTimeout(() => {
                window.location.href = '/'; 
            }, 600);

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || 'Error al iniciar sesión', {
                    style: {
                        background: '#ffffff',
                        color: '#1e293b',
                        borderLeft: '4px solid #dd474c'
                    },
                });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-[#1e293b]"> 
            <h1 className="text-6xl text-white font-bold text-center lowercase mb-12 tracking-tighter">
                iniciar sesión
            </h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-10 py-12 rounded-[3rem] space-y-8 w-full max-w-md shadow-2xl"
                noValidate
            >
                <div className="flex flex-col space-y-2">
                    <label className="text-xl text-slate-700 font-bold ml-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        className="bg-[#edf2f7] border-none p-4 rounded-2xl focus:ring-2 focus:ring-[#5d81d1] outline-none transition-all placeholder-slate-400"
                        {...register('email', {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-xl text-slate-700 font-bold ml-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="********"
                        className="bg-[#edf2f7] border-none p-4 rounded-2xl focus:ring-2 focus:ring-[#5d81d1] outline-none transition-all placeholder-slate-400"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe ser mínimo de 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-[#fd6303] p-5 text-white text-2xl w-full rounded-full font-black cursor-pointer hover:scale-[1.03] active:scale-95 transition-all shadow-lg mt-4"
                    value="Ingresar"
                />
            </form>

            <nav className="mt-12 text-center">
                <Link
                    className="text-white text-xl font-medium hover:underline tracking-tight"
                    to='/auth/register'
                >
                    ¿No tenés cuenta? <span className="font-extrabold">Registrate aquí</span>
                </Link>
            </nav>
        </div>
    );
}
