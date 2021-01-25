import { ref } from 'vue';
import { IUser, IMessage } from './Interfaces';

export default function useChat() {
  const me: IUser = {
    id: 1,
    name: 'Me'  
  };

  const testUser: IUser = {
    id: 2,
    name: 'TestUser'
  };
  const messages = ref<IMessage[]>([]);
  const fetchMessages = (): void => {
    messages.value = [
      {
        id: 1,
        speaker: testUser,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
      {
        id: 2,
        speaker: me,
        message: 'あなたの名前はなんですかggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      },
    ];
  };

  return {
    messages,
    fetchMessages
  }
}