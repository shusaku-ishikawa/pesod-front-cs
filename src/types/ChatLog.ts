import { ref } from 'vue';
import { ICustomer, IChatLog } from './Interfaces';
import { client } from './Axios';

const fetchDoctorChatLogs = async (prescriptId: string): Promise<IChatLog[]> => {
  const {data} = await client.get(`/chatlog/doctor/${prescriptId}`)
  console.log(data);
  const {results}= data;
  return results;  
};

const fetchCustomerMessageTemplates = async () => {
  const {data} = await client.get(`/customer_tpl_msg/`);
  console.log(data)
  return data.results
}
const fetchDoctorMessageTemplates = async () => {
  const {data} = await client.get(`/doctor_tpl_msg/`);
  console.log(data)
  return data.results
}
export default function useChatLog() {
  
  const chatLogs = ref<IChatLog[]>([]);
  
  
  return {
    chatLogs,
    fetchDoctorChatLogs,
    fetchDoctorMessageTemplates,
    fetchCustomerMessageTemplates
  }
}