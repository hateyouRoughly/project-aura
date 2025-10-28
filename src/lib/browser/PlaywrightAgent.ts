import { Page, Browser as PlaywrightBrowser, chromium } from "playwright";
import { IPlaywrightAgent } from "./IPlaywrightAgent";
import { State } from "@/types";

export class PlaywrightAgent implements IPlaywrightAgent {
  private page: Page | null = null;
  private browser: PlaywrightBrowser | null = null;

  async launch(): Promise<void> {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser?.close();
  }

  async navigate(url: string): Promise<void> {
    await this.page?.goto(url);
  }

  async captureState(): Promise<State> {
    const dom = await this.page?.content() || "";
    const screenshot = await this.page?.screenshot() || Buffer.from("");
    return { dom, screenshot };
  }

  async click(selector: string): Promise<void> {
    await this.page?.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page?.type(selector, text);
  }
}