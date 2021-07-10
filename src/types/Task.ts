import { ref, computed } from 'vue';
import { ITask } from './Interfaces';
import useAxios from './Axios';
import moment from 'moment';

export default function useTasks() {
  const {
    client
  } = useAxios()

  const tasks = ref<ITask[]>([]);
  
  const fetchConsultationTasks = async () => {
    const {data} = await client.get('consultation_task/')
    return data
  }
  const fetchCsTasks = async (): Promise<ITask[]> => {
    const { data } = await client.get('/cs_task/');
    return data
  }
  const fetchActiveCounselorTask = async (uuid: string) => {
    const {data} = await client.get(`/counselor_task/active/${uuid}`);
    return data;
  }
  const fetchCounselorTasks = async () => {
    const {data} = await client.get('counselor_task/')
    return data;
  }
  const assignTask = async (taksId: number, userId: number | string) => {
    const { data } = await client.patch(`/consultation_task/${taksId}`, { assignee_id: userId });
    return data;
  }
  const updateAssignee = async (taskId: number, assigneeId: number) => {
    const {data} = await client.patch(`/consultation_task/${taskId}`, {
      assignee_id: assigneeId
    })
    return data;
  }

  const closeTask = async (taskId: number) => {
    const {data} = await client.patch(`/consultation_task/${taskId}`, {
      ended_at: moment(),
      status: 0
    })
    return data
  }
  
  const escalateTask = async (task: ITask, assigneeId: number, consultationType: number) => {
    console.log('ss')
    const {data} = await client.post(`/consultation_task/`, {
      consulter_id: task.consulter?.id,
      assignee_id: assigneeId,
      escalation_task: task.id,
      consultation_type: consultationType,
      
    })
    console.log(data)
    return data;
  }
  
  return {
    tasks,
    fetchConsultationTasks,
    fetchActiveCounselorTask,
    fetchCounselorTasks,
    fetchCsTasks,
    assignTask,
    closeTask,
    escalateTask,
    updateAssignee
  }
}