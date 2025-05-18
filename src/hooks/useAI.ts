import { useMutation } from 'react-query';
import AIService from '../services/AIService';
import type { IAIRequest, IAIResponse } from '../types/AI';
import type { AxiosError } from 'axios';

export const useAI = (
  onSuccess?: (data: IAIResponse) => void,
  onError?: (error: AxiosError<{ message: string }>) => void,
) => {
  return useMutation({
    // @ts-ignore
    mutationKey: ['ai-get'],
    mutationFn: (body: IAIRequest) => AIService.sendRequest(body),
    retry: false,
    onSuccess,
    onError,
  });
};
