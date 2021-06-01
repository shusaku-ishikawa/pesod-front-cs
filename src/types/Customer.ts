import { ref } from 'vue';
import useAxios from '@/types/Axios'


export default function useCustomer() {
  const {
    client
  } = useAxios();
  const fetchCustomerMemo = async (uuid: string) => {
    const {data} = await client.get(`customer_memos/${uuid}`);
    console.log(data)
    return data
  }
  const addCustomerMemo = async (payload: any) => {
    const {data} = await client.post(`customer_memo/`, payload)
    console.log(data)
    return data
  }
  const updateCustomerMemo = async (id: number, payload: any) => {
    const {data} = await client.patch(`customer_memo/${id}`, payload)
    console.log(data)
    return data
  }
  const deleteCustomerMemo = async (id: number) => {
    const {data} = await client.delete(`customer_memo/${id}`)
    console.log(data)
    return data
  }
  
  const getCustomer = async (uuid: string) => {
    const {data} = await client.get(`customer/${uuid}`)
    console.log(data)
    return data;
  }

  return {
    getCustomer,
    fetchCustomerMemo,
    addCustomerMemo,
    updateCustomerMemo,
    deleteCustomerMemo
  }
}