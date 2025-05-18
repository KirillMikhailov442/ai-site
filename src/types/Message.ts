import type { ReactNode } from 'react';

export interface IMessage {
  id: string;
  sender: 'me' | 'ai';
  content: string | ReactNode;
  date?: string;
}
