import { IActionCommand } from "./IActionCommand";

export abstract class CommandDecorator implements IActionCommand {
  constructor(protected wrappedCommand: IActionCommand) {}

  execute(): Promise<void> {
    return this.wrappedCommand.execute();
  }

  getParameters(): object {
    return this.wrappedCommand.getParameters();
  }
}

export class LoggingCommandDecorator extends CommandDecorator {
  async execute(): Promise<void> {
    console.log(`Executing command: ${this.wrappedCommand.constructor.name}`, this.getParameters());
    try {
      await super.execute();
      console.log(`Finished command: ${this.wrappedCommand.constructor.name}`);
    } catch (error) {
      console.error(`Error executing command: ${this.wrappedCommand.constructor.name}`, error);
      throw error;
    }
  }
}
