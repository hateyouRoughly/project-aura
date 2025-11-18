import { CommandDecorator } from "./LoggingCommandDecorator";

export class RetryCommandDecorator extends CommandDecorator {
  constructor(wrappedCommand: any, private retries: number = 3) {
    super(wrappedCommand);
  }

  async execute(): Promise<void> {
    for (let i = 0; i < this.retries; i++) {
      try {
        await this.wrappedCommand.execute();
        return;
      } catch (error) {
        console.warn(`Attempt ${i + 1} failed for ${this.wrappedCommand.constructor.name}. Retrying...`);
        if (i === this.retries - 1) {
          throw error;
        }
      }
    }
  }
}
