import { ref } from 'vue';
import { ICustomer, IChatLog } from './Interfaces';
import useAxios from './Axios';


export default function useChatLog(userType = 'customer') {
  const {
    client
  } = useAxios(userType);

  const chatLogs = ref<IChatLog[]>([]);
  const chatLogPage = ref(1);
  const fetchDoctorChatLogs = async (prescriptId: string): Promise<IChatLog[]> => {
    const {data} = await client.get(`/chatlog/doctor/${prescriptId}`)
    return data;  
  };
  // const fetchChatLogByPage = async (prescriptId: string, page: number) => {
  //   const data = await fetchDoctorChatLogs(prescriptId, page);
  //   console.log(data)
  //   chatLogs.value = [...data, ...chatLogs.value];
  //   console.log(chatLogs.value)
  //   chatLogPage.value++;
  // }
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
  return {
    chatLogs,
    fetchDoctorChatLogs,
    fetchDoctorMessageTemplates,
    fetchCustomerMessageTemplates
  }
}