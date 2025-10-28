import { AIInput, ActionData } from "@/types";

export interface IAIModelStrategy {
  getAction(input: AIInput): Promise<ActionData>;
}
