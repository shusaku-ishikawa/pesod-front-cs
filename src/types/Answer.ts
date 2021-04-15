
import { ref } from 'vue';
import { IAnswer, IAnswerOption } from "@/types/Interfaces";
import useAxios from '@/types/Axios';

const answers = ref<IAnswer[]>([]);

interface ICreateAnswer{
  question_id: string;
  options: any;
  descriptive_answer: string | null;
  hair_image?: string;
}


export default function useAnswer(userType = 'customer') {
  const {
    client  
  } = useAxios(userType);
  const fetchAnswers = async (uuid?: string): Promise<IAnswer[]> => {
    const url = uuid == null ? '/answers/' : `/answers/?uuid=${uuid}`;
    const { data } = await client.get(url);
    return data;
  };
  
  const createAnswer = async (answer: IAnswer) => {
    if (answer.customer.id == null) throw Error('customer has no id');
    const options = answer.answer_options?.map((a: IAnswerOption) => ({ option: a.option }))
  
    const postData: ICreateAnswer = {
      question_id: answer.question.id,
      options: options,
      descriptive_answer: answer.descriptive_answer,
    };
    if (answer.hair_image != null) {
      const base64 = answer.hair_image // .replace(/^data:image\/(png|jpe?g);base64,/, "");
      postData.hair_image = base64;
    }
    
    // console.log(formData)
    const {data} = await client.post('/answer/', postData);
    console.log(data)
    return data;
    
  };
  return {
    answers,
    fetchAnswers,
    createAnswer,
  }
}