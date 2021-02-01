import { ref, computed } from 'vue';
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

const answeredAll = computed(() => {
  return questions.value.find(q => q.answer == null || q.answer == '') == null;
});

const nextOpenQuestionId = computed(() => {
  const q = questions.value.find(q => !q.answer);
  if (q == null) return null;
  return q.id;
});

export default function useQuestionaire() {
  return {
    questions,
    answeredAll,
    nextOpenQuestionId,
    fetchQuestions
  }
}