import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from 'sonner';
import api from '../config/axios';
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterView() {
    const navigate = useNavigate();

    const initialValues: RegisterForm = {
        fullname: '',
        dni: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    };

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterForm>({ 
        defaultValues: initialValues 
    });

    // Observar el password para la validación de confirmación
    const password = watch('password');

    const registerUser = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post('http://localhost:4000/auth/register', formData);
            
            toast.success(data.message || '¡Cuenta creada correctamente!', {
                style: { background: '#ffffff', color: '#1e293b' }
            });
            
            reset();

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error("Error en el registro:", error);
            
            if (isAxiosError(error) && error.response) {
                // Captura el mensaje real del backend para evitar notificaciones vacías
                const errorMsg = error.response.data.message || 
                                    error.response.data.error || 
                                    "Error al registrarse. Verifique los datos.";
                
                toast.error(errorMsg, {
                    style: { 
                        background: '#ffffff', 
                        color: '#1e293b',
                        borderLeft: '4px solid #dd474c' 
                    }
                });
            } else {
                toast.error("Error de conexión con el servidor");
            }
        }
    };

    return (
        <div className="flex flex-col items-center font-alegreya">
            {/* Título Bree Serif Naranja Rumbo */}
            <h1 className="text-rumbo-orange text-6xl font-bree mb-8 tracking-tighter text-center">
                Regristrate
            </h1>

            {/* Cuadro Celeste con bordes redondeados extremos */}
            <form
                onSubmit={handleSubmit(registerUser)}
                className="bg-[#dbeafe] px-10 py-12 rounded-[2.5rem] shadow-sm w-full max-w-[480px] flex flex-col items-center"
                noValidate
            >
                {/* Full Name */}
                <div className="w-full mb-5 flex flex-col items-center">
                    <label htmlFor="fullname" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        Nombre Completo
                    </label>
                    <input 
                        id="fullname"
                        type="text" 
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('fullname', { required: "El nombre es obligatorio" })}
                    />
                    {errors.fullname && <ErrorMessage>{errors.fullname.message}</ErrorMessage>}
                </div>

                {/* D.N.I */}
                <div className="w-full mb-5 flex flex-col items-center">
                    <label htmlFor="dni" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        D.N.I
                    </label>
                    <input 
                        id="dni"
                        type="text" 
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('dni', {
                            required: "El D.N.I es obligatorio",
                            pattern: {
                                value: /^[0-9]{7,8}$/,
                                message: "Debe contener 7 u 8 dígitos"
                            }
                        })}
                    />
                    {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
                </div>

                {/* Email */}
                <div className="w-full mb-5 flex flex-col items-center">
                    <label htmlFor="email" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email" 
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('email', {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido"
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                {/* Phone */}
                <div className="w-full mb-5 flex flex-col items-center">
                    <label htmlFor="phone" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        type="tel" 
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('phone', {
                            required: "El teléfono es obligatorio",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Solo números"
                            }
                        })}
                    />
                    {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                </div>

                {/* Password */}
                <div className="w-full mb-5 flex flex-col items-center">
                    <label htmlFor="password" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password" 
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "Mínimo 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                {/* Repetir Password */}
                <div className="w-full mb-8 flex flex-col items-center">
                    <label htmlFor="password_confirmation" className="text-xl text-slate-800 font-bold mb-2 text-center">
                        Repetir contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className="w-full bg-[#abc5f5] border-none p-2.5 rounded-xl outline-none text-center text-lg focus:ring-2 focus:ring-rumbo-azul"
                        {...register('password_confirmation', {
                            required: "Confirmación obligatoria",
                            validate: value => value === password || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                {/* Botón Ingresar Blanco Bree Serif */}
                <input
                    type="submit"
                    className="bg-white px-12 py-2 text-[#1e293b] font-bree text-2xl font-bold rounded-2xl shadow-md hover:scale-105 transition-transform border border-slate-100 cursor-pointer"
                    value="Ingresar"
                />
            </form>

            <nav className="mt-8 text-xl">
                <p className="text-slate-600 font-alegreya">
                    ¿Ya tenés una cuenta?{' '}
                    <Link to='/login' className="text-rumbo-orange font-bold hover:underline decoration-2">
                        Iniciá Sesión
                    </Link>
                </p>
            </nav>
        </div>
    );
}