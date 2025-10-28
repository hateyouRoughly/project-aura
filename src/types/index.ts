

// Data Structures
export interface Job {
  id: string;
  goal: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  history: string[];
}

export interface AIInput {
  goal: string;
  dom: string;
  screenshot: Buffer;
}

export interface ActionData {
  type: 'click' | 'type' | 'completed';
  selector?: string;
  text?: string;
}

export interface State {
  dom: string;
  screenshot: Buffer;
}