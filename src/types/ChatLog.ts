import { ref } from 'vue';
import { ICustomer, IChatLog } from './Interfaces';
import useAxios from './Axios';


export default function useChatLog() {
  const {
    client
  } = useAxios();

  const chatLogs = ref<IChatLog[]>([]);
  const chatLogPage = ref(1);

  const fetchDoctorChatLogs = async (prescriptNo: string): Promise<IChatLog[]> => {
    const {data} = await client.get(`/chatlog/doctor/${prescriptNo}`)
    return data;  
  };

  const fetchCsChatLogs = async (uuid: string): Promise<IChatLog[]> => {
    const {data} = await client.get(`/chatlog/cs/${uuid}`)
    return data;  
  };
  const fetchCounselorChatLogs = async (uuid: string): Promise<IChatLog[]> => {
    const {data} = await client.get(`/chatlog/counselor/${uuid}`)
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
    return data
  }
  
  const fetchCsMessageTemplates = async () => {
    const {data} = await client.get(`/cs_tpl_msg/`);
    console.log(data)
    return data
  }
  const updateChatLogCursor = async (owner: number, prescript: number, cursor: number) => {
    const payload = {
      room_type: 'doctor',
      owner: owner,
      prescript: prescript,
      cursor: cursor
    }
    const {data} = await client.patch('/chatcursor/', payload)
    console.log(data)
    return data
  }
  const getChatCursor = async (prescriptNo: string) => {
    const {data} = await client.get(`/chatcursor/doctor/${prescriptNo}`);
    console.log(data)

    return data
  }
  return {
    chatLogs,
    fetchDoctorChatLogs,
    fetchCsChatLogs,
    fetchCounselorChatLogs,
    fetchCsMessageTemplates,
    fetchCustomerMessageTemplates,
    updateChatLogCursor,
    getChatCursor
  }
}