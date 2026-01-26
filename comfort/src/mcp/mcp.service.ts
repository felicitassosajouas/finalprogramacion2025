import { Injectable, OnModuleInit } from "@nestjs/common";
import { startMcpServer } from "./mcp.server";
import { generarRecomendacionesMCP } from "./google.connector";
import { CreateFormDto } from "../user/dto/createForm.dto";

@Injectable()
export class McpService implements OnModuleInit {
  private mcpServer: any;

  async onModuleInit() {
    this.mcpServer = await startMcpServer();
  }

  // 🧭 Función auxiliar para determinar estación
  private obtenerEstacion(fecha: string): string {
    const month = new Date(fecha).getMonth() + 1;
    if ([12, 1, 2].includes(month)) return "verano";
    if ([3, 4, 5].includes(month)) return "otoño";
    if ([6, 7, 8].includes(month)) return "invierno";
    return "primavera";
  }

  async generarRecomendaciones(dto: CreateFormDto): Promise<string> {
    const categorias = ["gastronomía", "cultura", "aventura", "naturaleza", "vino"];
    const estacion = this.obtenerEstacion(dto.date);

    // Prompt de recomendaciones de viaje
    const promptViaje = `
    Genera una lista numerada de recomendaciones de viaje para ${dto.stay} días en ${dto.city}.
    Intereses del usuario: ${dto.interests.join(", ")}.
    Presupuesto estimado: ${dto.budget}.
    Usa únicamente estas categorías: ${categorias.join(", ")}.

    🔹 IMPORTANTE:
    - Menciona lugares, restaurantes, bodegas o atracciones TURÍSTICAS REALES que existan en ${dto.city}.
    - Usa nombres exactos que se puedan encontrar en Google Maps.
    - Cada línea debe contener una recomendación breve (máximo 2 líneas).
    - Formato: "1. Nombre del lugar (Zona o barrio) — breve descripción".
    - Devuelve solo la lista numerada, sin explicaciones ni texto adicional.
    `;

    // Prompt de recomendaciones para la valija
    const promptValija = `
    Estás planificando un viaje a ${dto.city} en ${estacion}.
    Basándote en el clima típico de ${dto.city} en ${estacion}, 
    sugiere qué ropa y elementos llevar en la valija.

    🔹 Formato esperado:
    "Ropa recomendada:", 
    "Accesorios sugeridos:", 
    "Consejos adicionales:".

    Mantén las recomendaciones prácticas y breves (máx. 2 líneas por ítem).
    `;

    // Llamamos al MCP para ambos prompts
    const [recomendacionesViaje, recomendacionesValija] = await Promise.all([
      generarRecomendacionesMCP(promptViaje),
      generarRecomendacionesMCP(promptValija),
    ]);

    // Combinamos los resultados en un texto final
    return `
**Recomendaciones de viaje:**
${recomendacionesViaje}

**Recomendaciones para la valija (${estacion} en ${dto.city}):**
${recomendacionesValija}
    `;
  }
}
