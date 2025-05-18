export interface IAIRequest {
  model: 'gpt-3.5-turbo';
  messages: IMessage[];
  max_tokens?: number;
}

export interface IMessage {
  role: 'user';
  content: string;
}

export interface IAIResponse {
  data: {
    id: string;
    created: number;
    choices: IAIResponseChoice[];
  };
}

export interface IAIResponseChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
}
