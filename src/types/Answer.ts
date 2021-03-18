
import { ref } from 'vue';
import { IAnswer, IAnswerOption } from "@/types/Interfaces";
import {client} from '@/types/Axios';

const answers = ref<IAnswer[]>([]);

interface ICreateAnswer{
  question_id: string;
  options: any;
  descriptive_answer: string | null;
  hair_image?: string;
}
const fetchAnswers = async (uuid?: string): Promise<IAnswer[]> => {
  const url = uuid == null ? '/answers/' : `/answers/?uuid=${uuid}`;
  const { data } = await client.get(url);
  console.log(data);
  answers.value = data.results;
  return data.results;
};

const createAnswer = async (answer: IAnswer) => {
  console.log(answer)
  if (answer.customer.id == null) throw Error('customer has no id');
  console.log(answer.answer_options)
  const options = answer.answer_options.map((a: IAnswerOption) => ({ option: a.option }))

  const postData: ICreateAnswer = {
    question_id: answer.question.id,
    options: options,
    descriptive_answer: answer.descriptive_answer,
  };
  if (answer.hair_image != null) {
    const base64 = answer.hair_image // .replace(/^data:image\/(png|jpe?g);base64,/, "");
    postData.hair_image = base64;
    console.log(base64)
  }
  console.log(postData)
  
  // console.log(formData)
  const {data} = await client.post('/answer/', postData);
  console.log(data)
  return data;
  
};

export default function useAnswer() {
  return {
    answers,
    fetchAnswers,
    createAnswer,
  }
}