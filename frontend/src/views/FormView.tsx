// import { useForm } from "react-hook-form";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import api from "../config/axios";
// import ErrorMessage from "../components/ErrorMessage";
// import type { TypeForm } from "../types/forms";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";

// export default function PlanificarViaje() {
//   const [loading, setLoading] = useState(false);
//   const initialValues: TypeForm = {
//     numberOfPeople: 1,
//     travelchildren: " ",
//     date: "",
//     stay: 1,
//     budget: 0,
//     interests: [],
//     city: "",
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TypeForm>({ defaultValues: initialValues });

//   const navigate = useNavigate();

//   const enviarFormulario = async (formData: TypeForm) => {
//     try {
//       setLoading(true);
//       const payload = {
//         ...formData,
//         travelchildren: formData.travelchildren === "true",
//         date: new Date(formData.date).toISOString().split("T")[0],
//         interests: Array.isArray(formData.interests)
//           ? formData.interests.filter((i) => i)
//           : formData.interests
//           ? [formData.interests]
//           : [],
//       };

//       console.log("Payload enviado:", payload);

//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("No estás autenticado. Inicia sesión.");
//         return;
//       }

//       const { data } = await api.post("/mcp/recomendar", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      

//       toast.success(data.message);
//       navigate("/recomendaciones",{
//         state: { recommendations: data.data}
//       })
//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         toast.error(error.response.data.message);
//       }
//     } finally{
//       setLoading(false);
//     }
//   };

//   return (
//       <div className=" bg-slate-800 min-h-screen">
//               <h1 className="text-5xl text-white font-bold text-center">
//         Planifica tu Viaje
//       </h1>

//       <form
//         onSubmit={handleSubmit(enviarFormulario)}
//         className="bg-white px-5 py-10 rounded-lg space-y-8 mt-10 max-w-md mx-auto shadow-lg"
//       >
//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Cantidad de Personas
//           </label>
//           <input
//             type="number"
//             min={1}
//             className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
//             {...register("numberOfPeople", {
//               required: "La cantidad es obligatoria",
//               min: { value: 1, message: "Debe ser al menos 1 persona" },
//               setValueAs: (v) => (v === "" ? undefined : Number(v)),
//             })}
//           />
//           {errors.numberOfPeople && (
//             <ErrorMessage>{errors.numberOfPeople.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             ¿Viajan niños?
//           </label>
//           <select
//             className="bg-slate-100 border-none p-3 rounded-lg"
//             {...register("travelchildren", {
//               required: "Este campo es obligatorio",
//             })}
//           >
//             <option value="">Selecciona una opción</option>
//             <option value="true">Sí</option>
//             <option value="false">No</option>
//           </select>
//           {errors.travelchildren && (
//             <ErrorMessage>{errors.travelchildren.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Fecha de Viaje
//           </label>
//           <input
//             type="date"
//             className="bg-slate-100 border-none p-3 rounded-lg"
//             {...register("date", {
//               required: "La fecha es obligatoria",
//             })}
//           />
//           {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Duración de Estadía (días)
//           </label>
//           <input
//             type="number"
//             min={1}
//             className="bg-slate-100 border-none p-3 rounded-lg"
//             {...register("stay", {
//               required: "La duración es obligatoria",
//               min: { value: 1, message: "Debe ser al menos 1 día" },
//               setValueAs: (v) => (v === "" ? undefined : Number(v)),
//             })}
//           />
//           {errors.stay && <ErrorMessage>{errors.stay.message}</ErrorMessage>}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Presupuesto Estimado
//           </label>
//           <input
//             type="number"
//             min={0}
//             step={10000}
//             className="bg-slate-100 border-none p-3 rounded-lg"
//             {...register("budget", {
//               required: "El presupuesto es obligatorio",
//               min: { value: 0, message: "Debe ser un valor positivo" },
//               setValueAs: (v) => (v === "" ? undefined : Number(v)),
//             })}
//           />
//           {errors.budget && (
//             <ErrorMessage>{errors.budget.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Intereses Principales
//           </label>
//           <div className="flex flex-col gap-2">
//             <label>
//               <input
//                 type="checkbox"
//                 value="gastronomia"
//                 {...register("interests", {
//                   validate: (v) =>
//                     (v && v.length > 0) || "Selecciona al menos un interés",
//                 })}
//               />{" "}
//               Gastronomía
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="cultura"
//                 {...register("interests")}
//               />{" "}
//               Cultura
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="aventura"
//                 {...register("interests")}
//               />{" "}
//               Aventura
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="naturaleza"
//                 {...register("interests")}
//               />{" "}
//               Naturaleza
//             </label>
//             <label>
//               <input type="checkbox" value="vino" {...register("interests")} />{" "}
//               Enoturismo
//             </label>
//           </div>
//           {errors.interests && (
//             <ErrorMessage>{errors.interests.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="grid grid-cols-1 space-y-2">
//           <label className="text-xl text-slate-600 font-semibold">
//             Ciudad de Hospedaje
//           </label>
//           <input
//             type="text"
//             placeholder="Ej: Mendoza"
//             className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
//             {...register("city", {
//               required: "La ciudad es obligatoria",
//             })}
//           />
//           {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
//         </div>

//         <input
//           type="submit"
//           className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
//           value="Enviar Plan"
//         />
//       </form>
//               {loading && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 bg-opacity-80 z-50">
//             <Loader2 className="animate-spin text-cyan-400 w-16 h-16 mb-4" />
//             <p className="text-white text-xl font-semibold">
//               Generando tus recomendaciones...
//             </p>
//           </div>
//         )}
//       </div>
//   );
// }


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
    numberOfPeople: 1,
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

      {/* HEADER */}
      <Header fullname={fullname} />

      {/* CONTENIDO */}
      <main
        className="relative flex-grow flex items-center justify-center overflow-hidden 
        bg-gradient-to-br from-orange-50 via-white to-sky-100 
        dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
        transition-colors duration-300"
      >

        {/* CÍRCULOS FLOTANTES */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-orange-300 opacity-25 rounded-full top-1/3 -left-20" />
          <div className="absolute w-72 h-72 bg-sky-300 opacity-25 rounded-full -top-20 left-1/2 -translate-x-1/2" />
          <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 -right-10" />
          <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full -bottom-20 left-10" />
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(siguientePaso)}
          className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
          rounded-2xl shadow-2xl p-10 w-full max-w-lg space-y-6 
          border border-white/40 dark:border-slate-700"
        >

          {/* PASO */}
          <div className="absolute -top-4 left-8 bg-[#fd6303] text-white px-6 py-2 rounded-xl font-bold shadow-md">
            Paso 1
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-white">
            Información del Viaje
          </h1>

          {/* PERSONAS */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-600 dark:text-slate-300">
              Cantidad de Personas
            </label>

            <input
              type="number"
              min={1}
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
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
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
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
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
              {...register("date", {
                required: "La fecha es obligatoria",
              })}
            />

            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </div>

          {/* ESTADÍA */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-600 dark:text-slate-300">
              Duración de Estadía (días)
            </label>

            <input
              type="number"
              min={1}
              className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
              {...register("stay", {
                required: "La duración es obligatoria",
                min: { value: 1, message: "Debe ser al menos 1 día" },
              })}
            />

            {errors.stay && <ErrorMessage>{errors.stay.message}</ErrorMessage>}
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
      </main>

      {/* FOOTER */}
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