// comfort/src/mcp/mcp.server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

export let recomendarHandler: any;

export async function startMcpServer() {
  const server = new McpServer({
    name: "comfort-tour-mcp",
    version: "1.0.0",
  });

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  recomendarHandler = async (args: any) => {
    const prompt = args.prompt ?? "Dame 3 recomendaciones básicas para Mendoza";
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      content: [{ type: "text", text }],
    };
  };

  server.tool(
    "recomendar",
    {
      prompt: z.string().optional(),
    },
    async (args) => {
      const prompt =
        args.prompt ?? "Dame 3 recomendaciones básicas para Mendoza";

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return {
        content: [{ type: "text", text }],
      };
    }
  );

  return server;
}