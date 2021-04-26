import { ref } from 'vue';
import useAxios from '@/types/Axios'


export default function useCustomer() {
  const {
    client
  } = useAxios();
  
  const getCustomer = async (uuid: string) => {
    const {data} = await client.get(`customer/${uuid}`)
    console.log(data)
    return data;
  }
  return {
    getCustomer
  }
}