import { openai } from "@/lib/openai";
import { buildMentoraInstructions } from "./system-prompt";
import type {
  GenerateMentoraResponseInput,
  GenerateMentoraResponseResult,
  MentoraContext,
} from "../types";

export async function generateMentoraResponse(
  input: GenerateMentoraResponseInput
): Promise<GenerateMentoraResponseResult> {
  const instructions = buildMentoraInstructions(input.context);

  const conversation = [
    ...(input.history ?? []).map((message) => ({
      role: message.role,
      content: message.content,
    })),
    {
      role: "user" as const,
      content: input.message,
    },
  ];

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL ?? "YOUR_MODEL_NAME",
    instructions,
    input: conversation,
  });

  return {
    message: response.output_text,
  };
}