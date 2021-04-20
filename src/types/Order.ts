import { ref, computed } from 'vue';
import { IOrder, ISubscription } from './Interfaces';
import useAxios from '@/types/Axios';

export default function useOrder(userType = 'customer') {
  const order = ref<IOrder | null>(null);
  const {client} = useAxios(userType);

  const fetchUserOrders = async (uuid: string) => {
    const {data} = await client.get(`/orders/${uuid}`);
    console.log(data)
    return data;
  }
  
  return {
    order,
    fetchUserOrders
  }
}