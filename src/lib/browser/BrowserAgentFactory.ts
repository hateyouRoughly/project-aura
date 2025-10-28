import { IPlaywrightAgent } from "./IPlaywrightAgent";
import { PlaywrightAgent } from "./PlaywrightAgent";

export class BrowserAgentFactory {
  createAgent(): IPlaywrightAgent {
    return new PlaywrightAgent();
  }
}
