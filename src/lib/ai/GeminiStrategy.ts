import { AIInput, ActionData } from "@/types";
import { IAIModelStrategy } from "./IAIModelStrategy";

export class GeminiStrategy implements IAIModelStrategy {
  async getAction(_input: AIInput): Promise<ActionData> {
    console.log("Getting action from Gemini...");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { type: "completed" };
  }
}
