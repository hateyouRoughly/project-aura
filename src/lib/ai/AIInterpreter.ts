import { AIInput } from "@/types";
import { IAIModelStrategy } from "./IAIModelStrategy";
import { IActionCommand } from "@/lib/execution/IActionCommand";
import { ClickCommand } from "@/lib/execution/ClickCommand";
import { TypeCommand } from "@/lib/execution/TypeCommand";
import { IPlaywrightAgent } from "@/lib/browser/IPlaywrightAgent";

export class AIInterpreter {
  constructor(private strategy: IAIModelStrategy) {}

  setStrategy(strategy: IAIModelStrategy) {
    this.strategy = strategy;
  }

  async getCommand(input: AIInput, agent: IPlaywrightAgent): Promise<IActionCommand | null> {
    const actionData = await this.strategy.getAction(input);
    switch (actionData.type) {
      case "click":
        return new ClickCommand(agent, actionData.selector!);
      case "type":
        return new TypeCommand(agent, actionData.selector!, actionData.text!);
      default:
        return null;
    }
  }
}
