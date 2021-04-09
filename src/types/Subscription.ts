import { ref, computed } from 'vue';
import { IQuestion, ISubscription } from './Interfaces';
import { client } from '@/types/Axios';

export default function useSubscription() {
  const subscription = ref<ISubscription | null>(null);
  
  const createSubscription = async (formData: ISubscription) => {
    const {data} = await client.post('/subscription/', formData);
    return data;
  }
  
  return {
    subscription,
    createSubscription
  }
}