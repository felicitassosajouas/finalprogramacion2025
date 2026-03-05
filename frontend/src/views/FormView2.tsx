// import { useForm } from "react-hook-form";
// import { useNavigate, useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import api from "../config/axios";
// import Header from "../components/Header";
// import ErrorMessage from "../components/ErrorMessage";
// import type { TypeForm } from "../types/forms";

// interface TokenPayload {
//   fullname: string;
//   email: string;
//   iat: number;
//   exp: number;
// }

// export default function PlanificarViajeStep2() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const step1Data = location.state as TypeForm;

//   const token = localStorage.getItem("token");
//   let fullname = "";

//   if (token) {
//     try {
//       const decoded = jwtDecode<TokenPayload>(token);
//       fullname = decoded.fullname;
//     } catch {
//       console.error("Token inválido");
//     }
//   }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TypeForm>({
//     defaultValues: step1Data,
//   });

//   const enviarFormulario = async (formData: TypeForm) => {
//     try {

//       const payload = {
//         ...formData,
//         travelchildren: formData.travelchildren === "true",
//         date: new Date(formData.date).toISOString().split("T")[0],
//         interests: Array.isArray(formData.interests)
//           ? formData.interests.filter((i) => i)
//           : [],
//       };

//       const token = localStorage.getItem("token");

//       const { data } = await api.post("/mcp/recomendar", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(data.message);

//       navigate("/recomendaciones", {
//         state: { recommendations: data.data },
//       });

//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen font-alegreya">

//       {/* HEADER */}
//       <Header fullname={fullname} />

//       {/* MAIN */}
//       <main
//         className="relative flex-grow flex items-center justify-center overflow-hidden
//         bg-gradient-to-br from-orange-50 via-white to-sky-100
//         dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
//         transition-colors duration-300"
//       >

//         {/* CIRCULOS */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
//           <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
//           <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10" />
//           <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10" />
//         </div>

//         {/* CARD */}
//         <form
//           onSubmit={handleSubmit(enviarFormulario)}
//           className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
//           rounded-2xl shadow-2xl p-10 w-full max-w-lg space-y-6
//           border border-white/40 dark:border-slate-700"
//         >

//           {/* ETIQUETA */}
//           <div className="absolute -top-4 left-8 bg-[#fd6303] text-white px-6 py-2 rounded-xl font-bold shadow-md">
//             Paso 2
//           </div>

//           <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-white">
//             Preferencias del Viaje
//           </h1>

//           {/* PRESUPUESTO */}
//           <div className="space-y-2">
//             <label className="font-semibold text-slate-600 dark:text-slate-300">
//               Presupuesto estimado
//             </label>

//             <input
//               type="number"
//               min={0}
//               className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
//               {...register("budget", {
//                 required: "El presupuesto es obligatorio",
//               })}
//             />

//             {errors.budget && (
//               <ErrorMessage>{errors.budget.message}</ErrorMessage>
//             )}
//           </div>

//           {/* INTERESES */}
//           <div className="space-y-2">

//             <label className="font-semibold text-slate-600 dark:text-slate-300">
//               Intereses del viaje
//             </label>

//             <div className="flex flex-col gap-2 text-slate-700 dark:text-slate-200">

//               <label>
//                 <input type="checkbox" value="gastronomia" {...register("interests")} /> Gastronomía
//               </label>

//               <label>
//                 <input type="checkbox" value="cultura" {...register("interests")} /> Cultura
//               </label>

//               <label>
//                 <input type="checkbox" value="aventura" {...register("interests")} /> Aventura
//               </label>

//               <label>
//                 <input type="checkbox" value="naturaleza" {...register("interests")} /> Naturaleza
//               </label>

//               <label>
//                 <input type="checkbox" value="vino" {...register("interests")} /> Enoturismo
//               </label>

//             </div>

//           </div>

//           {/* CIUDAD */}
//           <div className="space-y-2">
//             <label className="font-semibold text-slate-600 dark:text-slate-300">
//               Ciudad de hospedaje
//             </label>

//             <input
//               type="text"
//               placeholder="Ej: Mendoza"
//               className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
//               {...register("city", {
//                 required: "La ciudad es obligatoria",
//               })}
//             />

//             {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
//           </div>

//           {/* BOTONES */}
//           <div className="flex justify-between pt-4">

//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="bg-slate-300 hover:bg-slate-400 px-6 py-2 rounded-lg font-semibold"
//             >
//               Volver
//             </button>

//             <button
//               type="submit"
//               className="bg-[#fd6303] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
//             >
//               Enviar Plan
//             </button>

//           </div>

//         </form>
//       </main>

//       {/* FOOTER */}
//       <footer
//         className="bg-[#fd6303] dark:bg-slate-900
//         py-6 px-3 text-white text-center
//         transition-colors duration-300"
//       >
//         <p>© 2026 Rumbo – Todos los derechos reservados.</p>
//       </footer>

//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import Header from "../components/Header";
import ErrorMessage from "../components/ErrorMessage";
import type { TypeForm } from "../types/forms";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface TokenPayload {
  fullname: string;
  email: string;
  iat: number;
  exp: number;
}

export default function PlanificarViajeStep2() {

  const navigate = useNavigate();
  const location = useLocation();
  const step1Data = location.state as TypeForm;

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  let fullname = "";

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      fullname = decoded.fullname;
    } catch {
      console.error("Token inválido");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: step1Data,
  });

  const enviarFormulario = async (formData: TypeForm) => {

    try {

      // setLoading(true);

      const fullForm = {
        ...step1Data,
        ...formData,
      };

      const payload = {
        ...fullForm,
        travelchildren: fullForm.travelchildren === "true",
        date: new Date(fullForm.date).toISOString().split("T")[0],
        interests: Array.isArray(fullForm.interests)
          ? fullForm.interests.filter((i) => i)
          : [],
      };

      console.log("Payload enviadoo:", payload);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No estás autenticado");
        return;
      }

      const { data } = await api.post("/mcp/recomendar", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);

      navigate("/recomendaciones", {
        state: { recommendations: data.data },
      });

    } catch (error) {

      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }

    } finally {
      setLoading(false);
    }
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

        {/* CIRCULOS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
          <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
          <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10" />
          <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10" />
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit(enviarFormulario)}
          className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
          rounded-2xl shadow-2xl p-10 w-full max-w-lg space-y-6
          border border-white/40 dark:border-slate-700"
        >

          <div className="absolute -top-4 left-8 bg-[#fd6303] text-white px-6 py-2 rounded-xl font-bold shadow-md">
            Paso 2
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-white">
            Preferencias del Viaje
          </h1>

          {/* PRESUPUESTO */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-600 dark:text-slate-300">
              Presupuesto estimado
            </label>

            <input
              type="number"
              min={0}
              step={10000}
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
              {...register("budget", {
                required: "El presupuesto es obligatorio",
                min: { value: 0, message: "Debe ser positivo" },
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />

            {errors.budget && (
              <ErrorMessage>{errors.budget.message}</ErrorMessage>
            )}
          </div>

          {/* INTERESES */}
          <div className="space-y-2">

            <label className="font-semibold text-slate-600 dark:text-slate-300">
              Intereses del viaje
            </label>

            <div className="flex flex-col gap-2 text-slate-700 dark:text-slate-200">

              <label>
                <input type="checkbox" value="gastronomia" {...register("interests")} /> Gastronomía
              </label>

              <label>
                <input type="checkbox" value="cultura" {...register("interests")} /> Cultura
              </label>

              <label>
                <input type="checkbox" value="aventura" {...register("interests")} /> Aventura
              </label>

              <label>
                <input type="checkbox" value="naturaleza" {...register("interests")} /> Naturaleza
              </label>

              <label>
                <input type="checkbox" value="vino" {...register("interests")} /> Enoturismo
              </label>

            </div>

          </div>

          {/* CIUDAD */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-600 dark:text-slate-300">
              Ciudad de hospedaje
            </label>

            <input
              type="text"
              placeholder="Ej: Mendoza"
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
              {...register("city", {
                required: "La ciudad es obligatoria",
              })}
            />

            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
          </div>

          {/* BOTONES */}
          <div className="flex justify-between pt-4">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-slate-300 hover:bg-slate-400 px-6 py-2 rounded-lg font-semibold"
            >
              Volver
            </button>

            <button
              type="submit"
              className="bg-[#fd6303] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Enviar Plan
            </button>

          </div>

        </form>

        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 bg-opacity-80 z-50">

            <Loader2 className="animate-spin text-orange-400 w-16 h-16 mb-4" />

            <p className="text-white text-xl font-semibold">
              Generando tus recomendaciones...
            </p>

          </div>
        )}

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