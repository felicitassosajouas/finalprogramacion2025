import { useForm } from "react-hook-form";
import type { TypeForm } from "../types/forms";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  fullname: string;
  email: string;
  iat: number;
  exp: number;
}

export default function PlanificarViaje() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let fullname = "";

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      fullname = decoded.fullname;
    } catch (error) {
      console.error("Token inválido");
    }
  }

  const initialValues: TypeForm = {
    numberOfPeople: 0,
    travelchildren: "",
    date: "",
    stay: 1,
    budget: 0,
    interests: [],
    city: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: initialValues,
  });

  const siguientePaso = (data: TypeForm) => {
    navigate("/form2", { state: data });
  };

  return (
    <div className="flex flex-col min-h-screen font-alegreya">
      <Header fullname={fullname} />

      <main
        className="relative flex-grow flex items-center justify-center overflow-hidden 
        bg-gradient-to-br from-orange-50 via-white to-sky-100 
        dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
        transition-colors duration-300"
      >
        {/* CÍRCULOS DECORATIVOS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
          <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
          <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10" />
          <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10" />
        </div>

        {/* CONTENEDOR */}
        <div className="relative w-full max-w-lg">

          {/* CÍRCULO PASO */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="w-16 h-16 bg-[#fd6303] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              1
            </div>
          </div>

          <form
            onSubmit={handleSubmit(siguientePaso)}
            className="relative z-10 bg-white/80 dark:bg-slate-900/80
            backdrop-blur-xl rounded-2xl shadow-2xl
            pt-16 pb-10 px-10 w-full space-y-6
            border border-white/40 dark:border-slate-700"
          >
            <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-white">
              Plánifica tu viaje!
            </h1>

            {/* PERSONAS */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600 dark:text-slate-300">
                Cantidad de Personas
              </label>

              <input
                type="number"
                min={1}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
                {...register("numberOfPeople", {
                  required: "La cantidad es obligatoria",
                  min: { value: 1, message: "Debe ser al menos 1 persona" },
                })}
              />

              {errors.numberOfPeople && (
                <ErrorMessage>{errors.numberOfPeople.message}</ErrorMessage>
              )}
            </div>

            {/* NIÑOS */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600 dark:text-slate-300">
                ¿Viajan niños?
              </label>

              <select
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
                {...register("travelchildren", {
                  required: "Este campo es obligatorio",
                })}
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>

              {errors.travelchildren && (
                <ErrorMessage>{errors.travelchildren.message}</ErrorMessage>
              )}
            </div>

            {/* FECHA */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600 dark:text-slate-300">
                Fecha de Viaje
              </label>

              <input
                type="date"
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
                {...register("date", {
                  required: "La fecha es obligatoria",
                })}
              />

              {errors.date && (
                <ErrorMessage>{errors.date.message}</ErrorMessage>
              )}
            </div>

            {/* ESTADÍA */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600 dark:text-slate-300">
                Duración de Estadía (días)
              </label>

              <input
                type="number"
                min={1}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
                {...register("stay", {
                  required: "La duración es obligatoria",
                  min: { value: 1, message: "Debe ser al menos 1 día" },
                })}
              />

              {errors.stay && (
                <ErrorMessage>{errors.stay.message}</ErrorMessage>
              )}
            </div>

            {/* BOTONES */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="bg-slate-300 hover:bg-slate-400 px-6 py-2 rounded-lg font-semibold"
              >
                Volver
              </button>

              <button
                type="submit"
                className="bg-[#fd6303] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Siguiente
              </button>
            </div>
          </form>

          {/* INDICADOR DE PASOS */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#fd6303] rounded-full"></div>
              <div className="w-32 h-[2px] bg-[#fd6303]"></div>
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
            </div>
          </div>

        </div>
      </main>

      <footer
        className="bg-[#fd6303] dark:bg-slate-900 
        py-6 px-3 text-white text-center 
        transition-colors duration-300"
      >
        <p>© 2026 Rumbo – Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}