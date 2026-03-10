// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { isAxiosError } from "axios";
// import type { ReservaForm } from "../types/reservaForm";
// import { toast, Toaster } from "sonner";
// import api from "../config/axios";
// import ErrorMessage from "../components/ErrorMessage";
// import { getAuthMe } from "../config/auth";
// import { useNavigate } from "react-router-dom";

// export default function ReservaView() {
//   const [loading, setLoading] = useState(true);
//   const [reservaEnviada, setReservaEnviada] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ReservaForm>();

//   // Lógica de Modo Oscuro al cargar
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     }

//     const fetchUserData = async () => {
//       try {
//         const data: any = await getAuthMe();
//         setValue("fullname", data.name || data.fullname || "");
//         setValue("email", data.email || "");
//       } catch (error) {
//         if (isAxiosError(error) && error.response) {
//           toast.error(error.response.data.message || "No se pudo cargar la información del usuario.");
//         } else {
//           toast.error("Error desconocido al obtener los datos del usuario.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [setValue]);

//   const toggleDarkMode = () => {
//     const html = document.documentElement;
//     html.classList.toggle("dark");
//     localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
//   };

//   const onSubmit = async (formData: ReservaForm) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("No hay sesión activa. Iniciá sesión primero.");
//         return;
//       }

//       const payload = {
//         ...formData,
//         cantidadPersonas: Number(formData.cantidadPersonas),
//       };

//       const { data } = await api.post("/reservas/nuevas", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success(data.message);
//       setReservaEnviada(true);
//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         toast.error(error.response.data.message || "Error al crear la reserva");
//       } else {
//         toast.error("Error desconocido al crear la reserva");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
//         <p className="text-[#fd6303] font-bold text-2xl animate-pulse">
//           Cargando datos del usuario...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col font-alegreya overflow-hidden transition-colors duration-300 
//       bg-gradient-to-br from-orange-50 via-white to-sky-100 
//       dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
//       {/* CÍRCULOS FLOTANTES */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full top-10 left-10 animate-pulse dark:bg-orange-500 dark:opacity-20" />
//         <div className="absolute w-96 h-96 bg-sky-300 opacity-30 rounded-full bottom-20 right-10 animate-pulse dark:bg-sky-500 dark:opacity-20" />
//         <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 left-40 animate-pulse dark:bg-orange-400 dark:opacity-10" />
//         <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full top-10 right-10 animate-pulse dark:bg-sky-400 dark:opacity-15" />
//       </div>

//       {/* HEADER */}
//       <header className="relative z-50 bg-[#eef1ee]/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center transition-colors duration-300">
//         <div className="flex items-center">
//           <button onClick={toggleDarkMode} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
//             <img src="/modo-nocturno.png" alt="Dark mode" className="w-6 h-6 object-contain" />
//           </button>
//         </div>
//         <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => navigate("/")}>
//           <img src="/logo1234.png" alt="Logo" className="h-14 md:h-24 w-auto object-contain" />
//         </div>
//       </header>

//       {/* FORMULARIO DE RESERVA */}
//       <main className="relative z-10 flex-grow flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-700">
          
//           <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#fd6303] dark:text-orange-400 uppercase tracking-tight">
//             Confirmar Reserva
//           </h1>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Nombre */}
//             <div className="flex flex-col">
//               <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Nombre</label>
//               <input
//                 type="text"
//                 className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-400 transition cursor-not-allowed opacity-70"
//                 {...register("fullname", { required: "El nombre es obligatorio" })}
//                 readOnly
//               />
//               {errors.fullname && <ErrorMessage>{errors.fullname.message}</ErrorMessage>}
//             </div>

//             {/* Email */}
//             <div className="flex flex-col">
//               <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Correo electrónico</label>
//               <input
//                 type="email"
//                 className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-400 transition cursor-not-allowed opacity-70"
//                 {...register("email", { required: "El correo es obligatorio" })}
//                 readOnly
//               />
//               {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
//             </div>

//             {/* Cantidad */}
//             <div className="flex flex-col">
//               <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Cantidad de personas</label>
//               <input
//                 type="number"
//                 placeholder="Ej: 2"
//                 className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-600 transition"
//                 {...register("cantidadPersonas", {
//                   required: "La cantidad de personas es obligatoria",
//                   min: { value: 1, message: "Debe haber al menos una persona" },
//                 })}
//               />
//               {errors.cantidadPersonas && <ErrorMessage>{errors.cantidadPersonas.message}</ErrorMessage>}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-[#fd6303] hover:bg-orange-600 text-white p-4 rounded-2xl font-bold text-xl shadow-lg transform transition active:scale-95 hover:scale-[1.02]"
//             >
//               Finalizar Reserva
//             </button>
//           </form>

//           {reservaEnviada && (
//             <button
//               onClick={() => navigate("/recomendaciones")}
//               className="mt-4 w-full border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 p-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
//             >
//               Volver a recomendaciones
//             </button>
//           )}
//         </div>
//       </main>

//       {/* FOOTER */}
//       <footer className="relative z-10 w-full bg-[#fd6303] dark:bg-black py-8 text-white text-center">
//         <p className="opacity-80">© 2026 Rumbo – Mendoza, Argentina.</p>
//       </footer>

//       <Toaster position="top-right" theme="inherit" />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import type { ReservaForm } from "../types/reservaForm";
import { toast, Toaster } from "sonner";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";
import { getAuthMe } from "../config/auth";
import { useNavigate } from "react-router-dom";

export default function ReservaView() {
  const [loading, setLoading] = useState(true);
  const [reservaEnviada, setReservaEnviada] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservaForm>();

  // Lógica de Modo Oscuro y Carga de Datos
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    const fetchUserData = async () => {
      try {
        const data: any = await getAuthMe();
        setValue("fullname", data.name || data.fullname || "");
        setValue("email", data.email || "");
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "No se pudo cargar la información del usuario.");
        } else {
          toast.error("Error al obtener los datos del usuario.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setValue]);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  const onSubmit = async (formData: ReservaForm) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No hay sesión activa. Iniciá sesión primero.");
        return;
      }

      const payload = {
        ...formData,
        cantidadPersonas: Number(formData.cantidadPersonas),
      };

      const { data } = await api.post("/reservas/nuevas", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message || "Reserva confirmada");
      setReservaEnviada(true); // Esto activará el cambio de vista
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error al crear la reserva");
      } else {
        toast.error("Error de conexión");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-[#fd6303] font-bold text-2xl animate-pulse">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col font-alegreya overflow-hidden transition-colors duration-300 
      bg-gradient-to-br from-orange-50 via-white to-sky-100 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      
      {/* CÍRCULOS FLOTANTES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full top-10 left-10 animate-pulse dark:bg-orange-500 dark:opacity-20" />
        <div className="absolute w-96 h-96 bg-sky-300 opacity-30 rounded-full bottom-20 right-10 animate-pulse dark:bg-sky-500 dark:opacity-20" />
        <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 left-40 animate-pulse dark:bg-orange-400 dark:opacity-10" />
        <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full top-10 right-10 animate-pulse dark:bg-sky-400 dark:opacity-15" />
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-[#eef1ee]/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4 md:py-10 px-4 md:px-10 flex items-center transition-colors duration-300">
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
            <img src="/modo-nocturno.png" alt="Dark mode" className="w-6 h-6 object-contain" />
          </button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo1234.png" alt="Logo" className="h-14 md:h-24 w-auto object-contain" />
        </div>
      </header>

      {/* CONTENIDO DE RESERVA */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-slate-700 transition-all duration-500">
          
          {!reservaEnviada ? (
            /* PASO 1: FORMULARIO ACTIVO */
            <div className="animate-in fade-in duration-500">
              <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#fd6303] dark:text-orange-400 uppercase tracking-tight">
                Confirmar Reserva
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Nombre</label>
                  <input
                    type="text"
                    className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none opacity-70 cursor-not-allowed"
                    {...register("fullname", { required: "El nombre es obligatorio" })}
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none opacity-70 cursor-not-allowed"
                    {...register("email", { required: "El correo es obligatorio" })}
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">Cantidad de personas</label>
                  <input
                    type="number"
                    placeholder="Ej: 2"
                    className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl border-none text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white dark:focus:bg-slate-600 transition"
                    {...register("cantidadPersonas", {
                      required: "Requerido",
                      min: { value: 1, message: "Mínimo 1" },
                    })}
                  />
                  {errors.cantidadPersonas && <ErrorMessage>{errors.cantidadPersonas.message}</ErrorMessage>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fd6303] hover:bg-orange-600 text-white p-4 rounded-2xl font-bold text-xl shadow-lg transform transition active:scale-95 hover:scale-[1.02]"
                >
                  Finalizar Reserva
                </button>
              </form>
            </div>
          ) : (
            /* PASO 2: MENSAJE DE ÉXITO (Reemplaza al formulario) */
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                ¡Reserva Exitosa!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                Tu lugar ha sido reservado correctamente. ¡Te esperamos!
              </p>

              <button
                onClick={() => navigate("/recomendaciones")}
                className="w-full bg-[#fd6303] hover:bg-orange-600 text-white p-4 rounded-2xl font-bold text-xl shadow-lg transform transition active:scale-95"
              >
                Volver a Recomendaciones
              </button>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-[#fd6303] dark:bg-black py-8 text-white text-center">
        <p className="opacity-80">© 2026 Rumbo – Mendoza, Argentina.</p>
      </footer>

      <Toaster position="top-right" theme="inherit" />
    </div>
  );
}