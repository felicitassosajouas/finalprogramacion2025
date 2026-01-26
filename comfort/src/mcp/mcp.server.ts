import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export let recomendarHandler: any; // exportamos el handler para usarlo desde el service

export async function startMcpServer() {
  const server = new McpServer({
    name: "comfort-tour-mcp",
    version: "1.0.0",
  });

  // Cliente de Google Generative AI
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

  // Modelo compatible con generateContent
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Definimos la tool "recomendar" y exportamos el handler
  recomendarHandler = async (args: any, extra: any) => {
    const prompt = args.prompt ?? "Dame 3 recomendaciones básicas para Mendoza";

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      content: [
        {
          type: "text",
          text,
        },
      ],
    };
  };

  server.tool(
    "recomendar",
    { prompt: { type: "string" } },
    recomendarHandler
  );

  return server;
}
