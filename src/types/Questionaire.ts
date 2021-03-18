import { ref, computed } from 'vue';
import { IQuestion, IAnswer } from './Interfaces';
import { client } from '@/types/Axios';

export default function useQuestionaire() {
  const questions = ref<IQuestion[]>([]);
  
  const fetchQuestions = async (): Promise<IQuestion[]> => {
    const { data } = await client.get('/questions/');
    console.log(data);
    return data.results;
    
  };
  
  return {
    questions,
    fetchQuestions
  }
}