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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data: any = await getAuthMe();

        setValue("fullname", data.name || data.fullname || "");
        setValue("email", data.email || "");
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          toast.error(
            error.response.data.message ||
              "No se pudo cargar la información del usuario."
          );
        } else {
          toast.error("Error desconocido al obtener los datos del usuario.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setValue]);


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

      toast.success(data.message);
      setReservaEnviada(true); 
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error al crear la reserva");
      } else {
        toast.error("Error desconocido al crear la reserva");
      }
    }
  };

  if (loading) {
    return (
      <p className="text-white text-center text-xl mt-10">
        Cargando datos del usuario...
      </p>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-8">
          Crear Reserva
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-lg text-slate-600 font-semibold">Nombre</label>
            <input
              type="text"
              className="bg-slate-100 p-3 rounded-lg border-none placeholder-slate-400"
              {...register("fullname", { required: "El nombre es obligatorio" })}
              readOnly
            />
            {errors.fullname && (
              <ErrorMessage>{errors.fullname.message}</ErrorMessage>
            )}
          </div>

          <div className="grid grid-cols-1 space-y-2">
            <label className="text-lg text-slate-600 font-semibold">
              Correo electrónico
            </label>
            <input
              type="email"
              className="bg-slate-100 p-3 rounded-lg border-none placeholder-slate-400"
              {...register("email", { required: "El correo es obligatorio" })}
              readOnly
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="grid grid-cols-1 space-y-2">
            <label className="text-lg text-slate-600 font-semibold">
              Cantidad de personas
            </label>
            <input
              type="number"
              className="bg-slate-100 p-3 rounded-lg border-none placeholder-slate-400"
              {...register("cantidadPersonas", {
                required: "La cantidad de personas es obligatoria",
                min: { value: 1, message: "Debe haber al menos una persona" },
              })}
            />
            {errors.cantidadPersonas && (
              <ErrorMessage>{errors.cantidadPersonas.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Confirmar Reserva"
            className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-500 transition"
          />
        </form>

        {reservaEnviada && (
          <button
            onClick={() => navigate("/users")}
            className=" mt-3 bg-red-400 p-3 text-lg w-full uppercase text-slate-800 rounded-lg font-bold cursor-pointer hover:bg-red-500 transition"
          >
            Volver a Inicio
          </button>
        )}
      </div>


      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          className:
            "bg-white border border-green-500 text-black shadow-lg relative overflow-hidden",
          style: {
            padding: "1rem",
            borderRadius: "0.75rem",
          },
        }}
      />
    </div>
  );
}
