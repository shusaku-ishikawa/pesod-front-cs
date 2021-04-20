import { ref, computed } from 'vue';
import { IQuestion, ISubscription } from './Interfaces';
import useAxios from '@/types/Axios';

export default function useSubscription(userType = 'customer') {
  const subscription = ref<ISubscription | null>(null);
  const {client} = useAxios(userType);

  const fetchSubscriptions = async (uuid: string) => {
    const {data} = await client.get(`/subscriptions/${uuid}`);
    console.log(data)
    return data;
  }
  const getSubscription = async (id: number) => {
    const {data} = await client.get(`/subscription/${id}`)
    console.log(data);
    return data;
  }
  const createSubscription = async (formData: ISubscription) => {
    const {data} = await client.post('/subscription/', formData);
    return data;
  }
  
  return {
    subscription,
    createSubscription,
    fetchSubscriptions,
    getSubscription
  }
}