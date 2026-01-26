import {
  Controller,Post,Body,Sse,MessageEvent,
} from "@nestjs/common";
import { McpService } from "./mcp.service";
import { CreateFormDto } from "../user/dto/createForm.dto";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";

@Controller("mcp")
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Post("recomendar")
  async recomendar(
    @Body() createFormDto: CreateFormDto
  ): Promise<{ success: boolean; message: string; data: string }> {
    const recomendaciones = await this.mcpService.generarRecomendaciones(createFormDto);
    return {
      success: true,
      message: "Recomendaciones generadas correctamente",
      data: recomendaciones,
    };
  }


  @Sse("recomendar-stream")
  recomendarStream(
    @Body() createFormDto: CreateFormDto
  ): Observable<MessageEvent> {
    return from(this.mcpService.generarRecomendaciones(createFormDto)).pipe(
      map((recomendaciones) => ({
        data: recomendaciones,
      }))
    );
  }
}
