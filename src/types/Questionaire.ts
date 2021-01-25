import { ref } from 'vue';
import { IQuestion } from './Interfaces';

const questions = ref<IQuestion[]>([]);
const fetchQuestions = (): void => {
  questions.value = [
    {
      id: 1,
      keyName: 'name',
      question: 'あなたの名前はなんですか',
      multiple: true,
      options: []
    },
    {
      id: 2,
      keyName: 'fuga',
      question: '選択してください',
      multiple: true,
      options: [
        'hoge',
        'fuga'
      ]
    },
    
  ];
};

export default function useQuestionaire() {
  return {
    questions,
    fetchQuestions
  }
}