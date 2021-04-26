import { ref, computed } from 'vue';
import { IQuestion, IAnswer } from './Interfaces';
import useAxios from '@/types/Axios';

export default function useQuestionaire() {
  const questions = ref<IQuestion[]>([]);
  const {
    client
  } = useAxios();
  const fetchQuestions = async (): Promise<IQuestion[]> => {
    const { data } = await client.get('/questions/');
    console.log(data);
    return data;
    
  };
  
  return {
    questions,
    fetchQuestions
  }
}