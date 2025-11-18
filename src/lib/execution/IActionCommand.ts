export interface IActionCommand {
  execute(): Promise<void>;
  getParameters(): object;
}
