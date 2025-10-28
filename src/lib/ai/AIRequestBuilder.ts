import { AIInput, State } from "@/types";

export class AIRequestBuilder {
  build(goal: string, state: State): AIInput {
    return {
      goal,
      dom: state.dom,
      screenshot: state.screenshot,
    };
  }
}
