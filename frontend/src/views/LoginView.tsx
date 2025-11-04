import { Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginView() {
    
    const initialValues: LoginForm= {
        email: '',
        password: ''
    }
    
    const navigate = useNavigate()

    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues: initialValues})

    const handleLogin = async ( formData : LoginForm) => { 
        try {
            const { data } = await api.post(`/auth/login`, formData)
            localStorage.setItem('token', data.accessToken)
            toast.success('Login exitoso',{
                style: {
                    background: '#ffffff',
                    color: '#1e293b',
                    borderBottom: '4px solid "10b981'
                }
            })
            navigate('/users')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <>
            <h1 className="text-5xl text-white font-bold text-center">
                Iniciar Sesión
            </h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-10 rounded-lg space-y-8 mt-10 max-w-md mx-auto shadow-lg"
            >


                
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-xl text-slate-600 font-semibold">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Correo electrónico"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email',{
                            required: " El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },                            
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-xl text-slate-600 font-semibold">
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Contraseña"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password',{
                            required: " El password es obligatorio",
                            minLength:{
                                value: 8,
                                message: "El password debe ser mínimo de 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>
                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value="Iniciar Sesión"
                />
                
            </form>

            <nav className="mt-10">
                <Link
                    className=" text-center text-white text-lg block"
                    to='/auth/register'
                >
                    ¿No tienes cuenta? Crea una aquí
                </Link>
            </nav>
        </>
    )
}
