import { IActionCommand } from "./IActionCommand";

export class ExecutionManager {
  async execute(command: IActionCommand): Promise<void> {
    // In a real implementation, you might have decorators here for logging, etc.
    await command.execute();
  }
}
