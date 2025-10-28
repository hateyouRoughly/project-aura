export interface IActionCommand {
  execute(): Promise<void>;
}
