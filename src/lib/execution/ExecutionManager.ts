import { IActionCommand } from "./IActionCommand";
import { LoggingCommandDecorator } from "./LoggingCommandDecorator";
import { RetryCommandDecorator } from "./RetryCommandDecorator";

export class ExecutionManager {
  async execute(command: IActionCommand): Promise<void> {
    let decoratedCommand: IActionCommand = command;
    decoratedCommand = new LoggingCommandDecorator(decoratedCommand);
    decoratedCommand = new RetryCommandDecorator(decoratedCommand);
    
    await decoratedCommand.execute();
  }
}
