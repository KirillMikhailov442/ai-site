import type { IAIRequest } from '../types/AI';
import $axios from '../utils/axiosCore';

class AIService {
  public sendRequest(body: IAIRequest) {
    return $axios.post<IAIRequest>(
      'https://api.openai.com/v1/chat/completions',
      body,
    );
  }
}

export default new AIService();
