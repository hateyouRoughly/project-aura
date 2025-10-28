import { IPlaywrightAgent } from "@/lib/browser/IPlaywrightAgent";
import { IActionCommand } from "./IActionCommand";

export class ClickCommand implements IActionCommand {
  constructor(private agent: IPlaywrightAgent, private selector: string) {}

  async execute(): Promise<void> {
    await this.agent.click(this.selector);
  }
}
