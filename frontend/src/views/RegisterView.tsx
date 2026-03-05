// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import api from "../config/axios";
// import type { RegisterForm } from "../types";
// import ErrorMessage from "../components/ErrorMessage";

// export default function RegisterView() {
//   const navigate = useNavigate();

//   const initialValues: RegisterForm = {
//     fullname: "",
//     dni: "",
//     email: "",
//     phone: "",
//     password: "",
//     password_confirmation: "",
//   };

//   const {
//     register,
//     watch,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterForm>({
//     defaultValues: initialValues,
//   });

//   const password = watch("password");

//   const registerUser = async (formData: RegisterForm) => {
//     try {
//       const { data } = await api.post("auth/register", formData);

//       toast.success(data.message || "¡Cuenta creada correctamente!");

//       reset();

//       setTimeout(() => {
//         navigate("/login");
//       }, 1200);
//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         toast.error(
//           error.response.data.message ||
//             error.response.data.error ||
//             "Error al registrarse"
//         );
//       } else {
//         toast.error("Error de conexión con el servidor");
//       }
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-sky-100 font-alegreya">

//       {/* CÍRCULOS FLOTANTES (LOS MISMOS DEL LOGIN) */}
//       <div className="absolute inset-0 pointer-events-none">

//         <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full top-10 left-10 float-1" />

//         <div className="absolute w-96 h-96 bg-sky-300 opacity-30 rounded-full bottom-20 right-10 float-2" />

//         <div className="absolute w-64 h-64 bg-orange-200 opacity-20 rounded-full bottom-10 left-40 float-3" />

//         <div className="absolute w-80 h-80 bg-sky-200 opacity-25 rounded-full top-10 right-10 float-4" />

//       </div>

//       {/* TÍTULO */}
//       <h1 className="relative z-10 text-[#fd6303] text-5xl font-bold mb-6 tracking-tight text-center">
//         Crear Cuenta
//       </h1>

//       {/* CARD */}
//       <form
//         onSubmit={handleSubmit(registerUser)}
//         className="relative z-10 bg-white/80 backdrop-blur-xl px-12 py-14 rounded-[2.5rem] shadow-2xl w-full max-w-[480px] flex flex-col border border-white/40"
//         noValidate
//       >

//         {/* Fullname */}
//         <div className="w-full mb-6 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             Nombre Completo
//           </label>
//           <input
//             type="text"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("fullname", { required: "El nombre es obligatorio" })}
//           />
//           {errors.fullname && <ErrorMessage>{errors.fullname.message}</ErrorMessage>}
//         </div>

//         {/* DNI */}
//         <div className="w-full mb-6 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             D.N.I
//           </label>
//           <input
//             type="text"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("dni", {
//               required: "El D.N.I es obligatorio",
//               pattern: {
//                 value: /^[0-9]{7,8}$/,
//                 message: "Debe contener 7 u 8 dígitos",
//               },
//             })}
//           />
//           {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
//         </div>

//         {/* Email */}
//         <div className="w-full mb-6 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("email", {
//               required: "El Email es obligatorio",
//               pattern: {
//                 value: /\S+@\S+\.\S+/,
//                 message: "E-mail no válido",
//               },
//             })}
//           />
//           {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
//         </div>

//         {/* Phone */}
//         <div className="w-full mb-6 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             Teléfono
//           </label>
//           <input
//             type="tel"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("phone", {
//               required: "El teléfono es obligatorio",
//               pattern: {
//                 value: /^[0-9]+$/,
//                 message: "Solo números",
//               },
//             })}
//           />
//           {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
//         </div>

//         {/* Password */}
//         <div className="w-full mb-6 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             Contraseña
//           </label>
//           <input
//             type="password"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("password", {
//               required: "El password es obligatorio",
//               minLength: {
//                 value: 8,
//                 message: "Mínimo 8 caracteres",
//               },
//             })}
//           />
//           {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
//         </div>

//         {/* Confirm Password */}
//         <div className="w-full mb-8 flex flex-col">
//           <label className="text-xl text-slate-800 font-semibold mb-2">
//             Repetir contraseña
//           </label>
//           <input
//             type="password"
//             className="w-full bg-slate-100 p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
//             {...register("password_confirmation", {
//               required: "Confirmación obligatoria",
//               validate: (value) =>
//                 value === password || "Las contraseñas no coinciden",
//             })}
//           />
//           {errors.password_confirmation && (
//             <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
//           )}
//         </div>

//         {/* BOTÓN */}
//         <button
//           type="submit"
//           className="bg-[#fd6303] px-10 py-3 text-white text-xl font-semibold rounded-2xl shadow-lg hover:bg-orange-600 hover:scale-105 transition-all"
//         >
//           Crear Cuenta
//         </button>
//       </form>

//       <nav className="relative z-10 mt-8 text-lg">
//         <span className="text-slate-600">¿Ya tenés una cuenta? </span>
//         <Link to="/login" className="text-[#fd6303] font-bold hover:underline">
//           Iniciar sesión
//         </Link>
//       </nav>
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterView() {
  const navigate = useNavigate();

  const initialValues: RegisterForm = {
    fullname: "",
    dni: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: initialValues,
  });

  const password = watch("password");

  const registerUser = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post("auth/register", formData);

      toast.success(data.message || "¡Cuenta creada correctamente!",{
        duration: 2000
      });

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message ||
            error.response.data.error ||
            "Error al registrarse"
        );
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
      <h1 className="relative z-10 text-[#fd6303] dark:text-orange-400 text-5xl font-bold mb-6 tracking-tight text-center">
        Crear Cuenta
      </h1>

      {/* CARD */}
      <form
        onSubmit={handleSubmit(registerUser)}
        noValidate
        className="relative z-10 
        bg-white/80 dark:bg-slate-800/80 
        backdrop-blur-xl px-12 py-14 rounded-[2.5rem] shadow-2xl 
        w-full max-w-[480px] flex flex-col 
        border border-white/40 dark:border-slate-700
        transition-colors duration-300"
      >

        {/* Fullname */}
        <div className="w-full mb-6 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Nombre Completo
          </label>

          <input
            type="text"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("fullname", { required: "El nombre es obligatorio" })}
          />

          {errors.fullname && (
            <ErrorMessage>{errors.fullname.message}</ErrorMessage>
          )}
        </div>

        {/* DNI */}
        <div className="w-full mb-6 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            D.N.I
          </label>

          <input
            type="text"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("dni", {
              required: "El D.N.I es obligatorio",
              pattern: {
                value: /^[0-9]{7,8}$/,
                message: "Debe contener 7 u 8 dígitos",
              },
            })}
          />

          {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
        </div>

        {/* Email */}
        <div className="w-full mb-6 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Phone */}
        <div className="w-full mb-6 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Teléfono
          </label>

          <input
            type="tel"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo números",
              },
            })}
          />

          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </div>

        {/* Password */}
        <div className="w-full mb-6 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Contraseña
          </label>

          <input
            type="password"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("password", {
              required: "El password es obligatorio",
              minLength: {
                value: 8,
                message: "Mínimo 8 caracteres",
              },
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full mb-8 flex flex-col">
          <label className="text-xl text-slate-800 dark:text-slate-200 font-semibold mb-2">
            Repetir contraseña
          </label>

          <input
            type="password"
            className="w-full bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-3 rounded-xl outline-none text-lg focus:ring-2 focus:ring-orange-400 transition"
            {...register("password_confirmation", {
              required: "Confirmación obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          className="bg-[#fd6303] px-10 py-3 text-white text-xl font-semibold rounded-2xl shadow-lg hover:bg-orange-600 hover:scale-105 transition-all"
        >
          Crear Cuenta
        </button>
      </form>

      {/* LOGIN */}
      <nav className="relative z-10 mt-8 text-lg">
        <span className="text-slate-600 dark:text-slate-400">
          ¿Ya tenés una cuenta?{" "}
        </span>
        <Link
          to="/login"
          className="text-[#fd6303] dark:text-orange-400 font-bold hover:underline"
        >
          Iniciar sesión
        </Link>
      </nav>
    </div>
  );
}