import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginView() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`auth/login`, formData);

      localStorage.setItem("token", data.accessToken);

      toast.success("¡Bienvenido a Rumbo!",{
        duration: 2000,
        onAutoClose: () => navigate("/onboarding")
      });
      
    } catch (error) {
      console.error("Error en el login:", error);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error al iniciar sesión");
      } else {
        toast.error("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
      bg-gradient-to-br from-orange-50 via-white to-sky-100 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      transition-colors duration-300 font-alegreya"
    >
      {/* CÍRCULOS FLOTANTES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full top-10 left-10 float-1 dark:bg-orange-500 dark:opacity-20" />
        <div className="absolute w-96 h-96 bg-sky-300 opacity-30 rounded-full bottom-20 right-10 float-2 dark:bg-sky-500 dark:opacity-20" />
        <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 left-40 float-3 dark:bg-orange-400 dark:opacity-10" />
        <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full top-10 right-10 float-4 dark:bg-sky-400 dark:opacity-15" />
      </div>

      {/* TÍTULO */}
      <h1 className="relative z-10 text-[#fd6303] dark:text-orange-400 text-5xl font-bold mb-4 tracking-tight text-center">
        Iniciar Sesión
      </h1>

      {/* CARD */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate
        className="relative z-10 
        bg-white/80 dark:bg-slate-800/80 
        backdrop-blur-xl px-12 py-14 rounded-[2.5rem] shadow-2xl 
        w-full max-w-[450px] flex flex-col 
        border border-white/40 dark:border-slate-700
        transition-colors duration-300"
      >
        {/* Email */}
        <div className="w-full mb-8 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            className="w-full 
            bg-slate-100 dark:bg-slate-700 
            text-black dark:text-white 
            p-3 rounded-xl outline-none text-lg 
            focus:ring-2 focus:ring-orange-400 
            focus:bg-white dark:focus:bg-slate-600
            transition"
            {...register("email", { required: "El correo es obligatorio" })}
          />

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Password */}
        <div className="w-full mb-10 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Contraseña
          </label>

          <input
            type="password"
            className="w-full 
            bg-slate-100 dark:bg-slate-700 
            text-black dark:text-white 
            p-3 rounded-xl outline-none text-lg 
            focus:ring-2 focus:ring-orange-400
            focus:bg-white dark:focus:bg-slate-600            
            transition"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 
          bg-[#fd6303] px-10 py-3 text-white text-xl font-semibold 
          rounded-2xl shadow-lg 
          hover:bg-orange-600 hover:scale-105 
          transition-all"
        >
          Ingresar
        </button>
      </form>

      {/* REGISTRO */}
      <nav className="relative z-10 mt-8 text-lg">
        <span className="text-slate-600 dark:text-slate-400">
          ¿No te has registrado?{" "}
        </span>
        <Link
          to="/auth/register"
          className="text-[#fd6303] dark:text-orange-400 font-bold hover:underline"
        >
          Creá tu cuenta
        </Link>
      </nav>
    </div>
  );
}