import { IPlaywrightAgent } from "@/lib/browser/IPlaywrightAgent";
import { IActionCommand } from "./IActionCommand";

export class TypeCommand implements IActionCommand {
  constructor(private agent: IPlaywrightAgent, private selector: string, private text: string) {}

  async execute(): Promise<void> {
    await this.agent.type(this.selector, this.text);
  }
}
