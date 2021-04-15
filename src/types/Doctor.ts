import { ref, computed } from 'vue';
import { IDoctor } from './Interfaces';
import useAxios from './Axios';




// const myDoctor = computed(() => {
//   return doctors.value.find(d => d.id===1);
// })
export default function useDoctors(userType = 'customer') {
  const {
    client
  } = useAxios(userType)
  const doctors = ref<IDoctor[]>([]);
  const doctor = ref<IDoctor | null>(null);
  const fetchDoctors = async (): Promise<IDoctor[]> => {
    const { data } = await client.get('/doctors/');
    return data
  }
  
  const getDoctor = async (id: number): Promise<IDoctor> => {
    const { data } = await client.get(`/doctor/${id}`);
    return data;
  }
  return {
    // myDoctor,
    doctor,
    doctors,
    getDoctor,
    fetchDoctors
  }
}