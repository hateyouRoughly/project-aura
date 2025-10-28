import { State } from "@/types";

export interface IPlaywrightAgent {
  launch(): Promise<void>;
  close(): Promise<void>;
  navigate(url: string): Promise<void>;
  captureState(): Promise<State>;
  click(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
}
