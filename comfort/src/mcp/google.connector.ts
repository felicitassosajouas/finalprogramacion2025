import { recomendarHandler } from "./mcp.server";

export async function generarRecomendacionesMCP(prompt: string): Promise<string> {
  // Llamamos al handler con el prompt
  const result = await recomendarHandler({ prompt }, {});

  if (!result?.content || !Array.isArray(result.content)) {
    throw new Error("El resultado del MCP no tiene el formato esperado.");
  }

  // con esto vamos a unir todo el texto
  const textoCompleto = result.content.map((c: any) => c.text).join("\n");

  // vamos a resumir las linea del texto
  const lineas = textoCompleto
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 5);

  // mostramos el texto resumido
  return lineas.join("\n");
}
