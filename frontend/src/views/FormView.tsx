import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";
import type { TypeForm } from "../types/forms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function PlanificarViaje() {
  const [loading, setLoading] = useState(false);
  const initialValues: TypeForm = {
    numberOfPeople: 1,
    travelchildren: " ",
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
  } = useForm<TypeForm>({ defaultValues: initialValues });

  const navigate = useNavigate();

  const enviarFormulario = async (formData: TypeForm) => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        travelchildren: formData.travelchildren === "true",
        date: new Date(formData.date).toISOString().split("T")[0],
        interests: Array.isArray(formData.interests)
          ? formData.interests.filter((i) => i)
          : formData.interests
          ? [formData.interests]
          : [],
      };

      console.log("Payload enviado:", payload);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No estás autenticado. Inicia sesión.");
        return;
      }

      const { data } = await api.post("/mcp/recomendar", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      toast.success(data.message);
      navigate("/recomendaciones",{
        state: { recommendations: data.data}
      })
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" bg-slate-800 min-h-screen">
              <h1 className="text-5xl text-white font-bold text-center">
        Planifica tu Viaje
      </h1>

      <form
        onSubmit={handleSubmit(enviarFormulario)}
        className="bg-white px-5 py-10 rounded-lg space-y-8 mt-10 max-w-md mx-auto shadow-lg"
      >
        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Cantidad de Personas
          </label>
          <input
            type="number"
            min={1}
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("numberOfPeople", {
              required: "La cantidad es obligatoria",
              min: { value: 1, message: "Debe ser al menos 1 persona" },
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
          {errors.numberOfPeople && (
            <ErrorMessage>{errors.numberOfPeople.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            ¿Viajan niños?
          </label>
          <select
            className="bg-slate-100 border-none p-3 rounded-lg"
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

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Fecha de Viaje
          </label>
          <input
            type="date"
            className="bg-slate-100 border-none p-3 rounded-lg"
            {...register("date", {
              required: "La fecha es obligatoria",
            })}
          />
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Duración de Estadía (días)
          </label>
          <input
            type="number"
            min={1}
            className="bg-slate-100 border-none p-3 rounded-lg"
            {...register("stay", {
              required: "La duración es obligatoria",
              min: { value: 1, message: "Debe ser al menos 1 día" },
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
          {errors.stay && <ErrorMessage>{errors.stay.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Presupuesto Estimado
          </label>
          <input
            type="number"
            min={0}
            step={10000}
            className="bg-slate-100 border-none p-3 rounded-lg"
            {...register("budget", {
              required: "El presupuesto es obligatorio",
              min: { value: 0, message: "Debe ser un valor positivo" },
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
          {errors.budget && (
            <ErrorMessage>{errors.budget.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Intereses Principales
          </label>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                value="gastronomia"
                {...register("interests", {
                  validate: (v) =>
                    (v && v.length > 0) || "Selecciona al menos un interés",
                })}
              />{" "}
              Gastronomía
            </label>
            <label>
              <input
                type="checkbox"
                value="cultura"
                {...register("interests")}
              />{" "}
              Cultura
            </label>
            <label>
              <input
                type="checkbox"
                value="aventura"
                {...register("interests")}
              />{" "}
              Aventura
            </label>
            <label>
              <input
                type="checkbox"
                value="naturaleza"
                {...register("interests")}
              />{" "}
              Naturaleza
            </label>
            <label>
              <input type="checkbox" value="vino" {...register("interests")} />{" "}
              Enoturismo
            </label>
          </div>
          {errors.interests && (
            <ErrorMessage>{errors.interests.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-xl text-slate-600 font-semibold">
            Ciudad de Hospedaje
          </label>
          <input
            type="text"
            placeholder="Ej: Mendoza"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("city", {
              required: "La ciudad es obligatoria",
            })}
          />
          {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Enviar Plan"
        />
      </form>
              {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 bg-opacity-80 z-50">
            <Loader2 className="animate-spin text-cyan-400 w-16 h-16 mb-4" />
            <p className="text-white text-xl font-semibold">
              Generando tus recomendaciones...
            </p>
          </div>
        )}
      </div>

    </>
  );
}
