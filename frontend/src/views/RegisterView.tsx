import { Link } from "react-router-dom";
import { useForm} from "react-hook-form";
import { isAxiosError} from "axios";
import { toast } from 'sonner'
import api  from '../config/axios'
import type { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage";

export default function registerView() {

    const initialValues: RegisterForm = {
        fullname: '',
        dni: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    }

    const {register, watch, reset, handleSubmit, formState: {errors}} = useForm<RegisterForm>({defaultValues: initialValues})

    const password = watch('password')

    const registerUser = async (formData : RegisterForm) => {
        try {
            const {data} = await api.post('/auth/register', formData)
            toast.success(data.message)
            reset()
        } catch (error) {
            if (isAxiosError(error) && error.response){
                toast.error(error.response.data.message);
            };
        }
    }

    return (
        <>
            <h1 className="text-5xl text-white font-bold text-center">
                Crear cuenta
            </h1>

            <form
                onSubmit={handleSubmit(registerUser)}
                className="bg-white px-5 py-10 rounded-lg space-y-8 mt-10 max-w-md mx-auto shadow-lg"
            >
                
                <div className="grid grid-cols-1 space-y-2">
                    <label htmlFor="fullname" className="text-xl text-slate-600 font-semibold">
                        Full Name
                    </label>
                    <input 
                        id="fullname"
                        type="text" 
                        placeholder="Nombre Completo"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('fullname',{
                            required: " El nombre es obligatorio"
                        })}
                    />

                    {errors.fullname && <ErrorMessage>{errors.fullname.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-2">
                    <label htmlFor="dni" className="text-xl text-slate-600 font-semibold">
                        D.N.I
                    </label>
                    <input 
                        id="dni"
                        type="text" 
                        placeholder="D.N.I"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('dni',{
                            required: " El D.N.I es obligatorio",
                            pattern: {
                                value: /^[0-9]{7,8}$/,
                                message: "Debe contener solo números (7 u 8 dígitos)",
                            }
                        })}
                    />

                    {errors.dni && <ErrorMessage>{errors.dni?.message}</ErrorMessage>}
                </div>

                
                <div className="grid grid-cols-1 space-y-2">
                    <label htmlFor="email" className="text-xl text-slate-600 font-semibold">
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
                    <label htmlFor="phone" className="text-xl text-slate-600 font-semibold">
                        Phone
                    </label>
                    <input
                        id="phone"
                        type="tel" 
                        placeholder="Teléfono"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('phone',{
                            required: " El telefono es obligatorio",
                            minLength:{
                                value: 10,
                                message: "El número debe ser mínimo de 10 caracteres"
                            },
                            pattern:{
                                value: /^[0-9]+$/,
                                message: "Solo se permiten números",
                            }
                        })}

                    />
                    {errors.phone && <ErrorMessage>{errors.phone?.message}</ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-2">
                    <label htmlFor="password" className="text-xl text-slate-600 font-semibold">
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

                <div className="grid grid-cols-1 space-y-2">
                    <label htmlFor="password_confirmation" className="text-xl text-slate-600 font-semibold">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Contraseña"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || "Las contraseñas no coinciden"                            
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>
                
                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
                
            </form>
            <nav className="mt-10">
                <Link
                    className=" text-center text-white text-lg block"
                    to='/auth/login'
                >
                        Registrado! Inicia Sesion
                </Link>
            </nav>
        </>
    )
}
