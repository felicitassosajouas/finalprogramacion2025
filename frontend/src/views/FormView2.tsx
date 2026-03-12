// import { useForm } from "react-hook-form";
// import { useNavigate, useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import api from "../config/axios";
// import Header from "../components/Header";
// import ErrorMessage from "../components/ErrorMessage";
// import type { TypeForm } from "../types/forms";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";

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

//   const [loading, setLoading] = useState(false);

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
//       setLoading(true);

//       const fullForm = {
//         ...step1Data,
//         ...formData,
//       };

//       const payload = {
//         ...fullForm,
//         numberOfPeople: Number(fullForm.numberOfPeople),
//         stay: Number(fullForm.stay),
//         budget: Number(fullForm.budget),
//         travelchildren: fullForm.travelchildren === "true",
//         date: new Date(fullForm.date).toISOString().split("T")[0],
//         interests: Array.isArray(fullForm.interests)
//           ? fullForm.interests.filter((i) => i)
//           : [],
//       };

//       console.log(payload);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("No estás autenticado");
//         return;
//       }

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen font-alegreya">
//       <Header fullname={fullname} />

//       <main
//         className="relative flex-grow flex items-center justify-center overflow-hidden 
//         bg-gradient-to-br from-orange-50 via-white to-sky-100 
//         dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
//         transition-colors duration-300"
//       >
//         {/* CÍRCULOS DECORATIVOS */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
//           <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
//           <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10" />
//           <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10" />
//         </div>

//         <div className="relative w-full max-w-lg">
//           {/* CÍRCULO PASO */}
//           <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
//             <div className="w-16 h-16 bg-[#fd6303] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//               2
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit(enviarFormulario)}
//             className="relative z-10 bg-white/80 dark:bg-slate-900/80
//             backdrop-blur-xl rounded-2xl shadow-2xl
//             pt-16 pb-10 px-10 w-full space-y-6
//             border border-white/40 dark:border-slate-700"
//           >
//             <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-white">
//               Preferencias del viaje
//             </h1>

//             {/* PRESUPUESTO */}
//             <div className="space-y-2">
//               <label className="font-semibold text-slate-600 dark:text-slate-300">
//                 Presupuesto estimado
//               </label>

//               <input
//                 type="number"
//                 min={0}
//                 step={100000}
//                 className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
//                 {...register("budget", {
//                   required: "El presupuesto es obligatorio",
//                   valueAsNumber: true,
//                 })}
//               />

//               {errors.budget && (
//                 <ErrorMessage>{errors.budget.message}</ErrorMessage>
//               )}
//             </div>

//             {/* INTERESES */}
//             <div className="space-y-2">
//               <label className="font-semibold text-slate-600 dark:text-slate-300">
//                 Intereses del viaje
//               </label>

//               <div className="flex flex-col gap-2 text-slate-700 dark:text-slate-200">
//                 <label className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value="gastronomia"
//                     {...register("interests")}
//                   />
//                   Gastronomía
//                 </label>

//                 <label className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value="cultura"
//                     {...register("interests")}
//                   />
//                   Cultura
//                 </label>

//                 <label className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value="aventura"
//                     {...register("interests")}
//                   />
//                   Aventura
//                 </label>

//                 <label className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value="naturaleza"
//                     {...register("interests")}
//                   />
//                   Naturaleza
//                 </label>

//                 <label className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     value="vino"
//                     {...register("interests")}
//                   />
//                   Enoturismo
//                 </label>
//               </div>
//             </div>

//             {/* CIUDAD */}
//             <div className="space-y-2">
//               <label className="font-semibold text-slate-600 dark:text-slate-300">
//                 Ciudad de hospedaje
//               </label>

//               <input
//                 type="text"
//                 value="Mendoza"
//                 readOnly
//                 className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-lg"
//                 {...register("city", {
//                   required: "La ciudad es obligatoria",
//                 })}
//               />

//               {errors.city && (
//                 <ErrorMessage>{errors.city.message}</ErrorMessage>
//               )}
//             </div>

//             {/* BOTONES */}
//             <div className="flex justify-between pt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="bg-slate-300 hover:bg-slate-400 px-6 py-2 rounded-lg font-semibold"
//               >
//                 Volver
//               </button>

//               <button
//                 type="submit"
//                 className="bg-[#fd6303] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold"
//               >
//                 Generar Recomendaciones
//               </button>
//             </div>
//           </form>

//           {/* INDICADOR PASOS */}
//           {/* INDICADOR PASOS */}
//           <div className="flex items-center justify-center mt-8">
//             {/* PASO 1 */}
//             <div className="w-4 h-4 rounded-full bg-slate-300"></div>

//             {/* LINEA */}
//             <div className="w-40 h-[2px] bg-slate-300"></div>

//             {/* PASO 2 */}
//             <div className="w-4 h-4 rounded-full bg-[#fd6303]"></div>
//           </div>
//         </div>

//         {loading && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 bg-opacity-80 z-50">
//             <Loader2 className="animate-spin text-cyan-400 w-16 h-16 mb-4" />
//             <p className="text-white text-xl font-semibold">
//               Generando tus recomendaciones...
//             </p>
//           </div>
//         )}
//       </main>

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
      setLoading(true);
      const fullForm = { ...step1Data, ...formData };
      const payload = {
        ...fullForm,
        numberOfPeople: Number(fullForm.numberOfPeople),
        stay: Number(fullForm.stay),
        budget: Number(fullForm.budget),
        travelchildren: fullForm.travelchildren === "true",
        date: new Date(fullForm.date).toISOString().split("T")[0],
        interests: Array.isArray(fullForm.interests)
          ? fullForm.interests.filter((i) => i)
          : [],
      };

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No estás autenticado");
        return;
      }

      const { data } = await api.post("/mcp/recomendar", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      navigate("/recomendaciones", { state: { recommendations: data.data } });
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
        className="relative flex-grow flex items-center justify-center 
        bg-gradient-to-br from-orange-50 via-white to-sky-100 
        dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
        transition-colors duration-300 px-4 py-8"
      >
        {/* CÍRCULOS DECORATIVOS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
          <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
        </div>

        <div className="relative w-full max-w-lg">
          
          {/* CÍRCULO PASO - Ajustado tamaño móvil */}
          <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#fd6303] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
              2
            </div>
          </div>

          <form
            onSubmit={handleSubmit(enviarFormulario)}
            /* Ajuste de paddings y espaciado entre elementos */
            className="relative z-10 bg-white/80 dark:bg-slate-900/80
            backdrop-blur-xl rounded-2xl shadow-2xl
            pt-12 pb-8 px-6 sm:pt-16 sm:pb-10 sm:px-10 w-full space-y-4 sm:space-y-6
            border border-white/40 dark:border-slate-700"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-700 dark:text-white">
              Preferencias
            </h1>

            {/* PRESUPUESTO */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                Presupuesto estimado
              </label>
              <input
                type="number"
                min={0}
                step={100000}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-2 sm:p-3 rounded-lg text-sm sm:text-base"
                {...register("budget", {
                  required: "El presupuesto es obligatorio",
                  valueAsNumber: true,
                })}
              />
              {errors.budget && <ErrorMessage>{errors.budget.message}</ErrorMessage>}
            </div>

            {/* INTERESES - Se optimizó el espacio de los checkboxes */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                Intereses
              </label>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 sm:gap-4 text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                {[
                  { val: "gastronomia", label: "Gastronomía" },
                  { val: "cultura", label: "Cultura" },
                  { val: "aventura", label: "Aventura" },
                  { val: "naturaleza", label: "Naturaleza" },
                  { val: "vino", label: "Enoturismo" }
                ].map((item) => (
                  <label key={item.val} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={item.val}
                      className="w-4 h-4 accent-[#fd6303]"
                      {...register("interests")}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* CIUDAD */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                Ciudad
              </label>
              <input
                type="text"
                value="Mendoza"
                readOnly
                className="w-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 p-2 sm:p-3 rounded-lg text-sm sm:text-base cursor-not-allowed"
                {...register("city")}
              />
            </div>

            {/* BOTONES ADAPTATIVOS */}
            <div className="flex justify-between pt-2 sm:pt-4 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none bg-slate-300 hover:bg-slate-400 px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none bg-[#fd6303] hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors disabled:opacity-50"
              >
                {loading ? "Generando..." : "Generar"}
              </button>
            </div>
          </form>

          {/* INDICADOR PASOS */}
          <div className="flex items-center justify-center mt-6 sm:mt-8">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-300"></div>
            <div className="w-20 sm:w-40 h-[2px] bg-[#fd6303]"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#fd6303]"></div>
          </div>
        </div>

        {/* LOADING OVERLAY - Con fixed para cubrir todo el viewport si hay scroll */}
        {loading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-[100] px-6 text-center">
            <Loader2 className="animate-spin text-[#fd6303] w-12 h-12 sm:w-16 sm:h-16 mb-4" />
            <p className="text-white text-lg sm:text-xl font-semibold">
              Generando tus recomendaciones...
            </p>
          </div>
        )}
      </main>

      <footer className="bg-[#fd6303] dark:bg-slate-900 py-4 sm:py-6 px-3 text-white text-center">
        <p className="text-xs sm:text-base">© 2026 Rumbo – Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}