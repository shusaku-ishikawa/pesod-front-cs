import { ref, computed } from 'vue';
import { IDoctor } from './Interfaces';
import { client } from './Axios';

const fetchDoctors = async (): Promise<IDoctor[]> => {
  const { data } = await client.get('/doctors/');
  const { results } = data;
  return results
}

const getDoctor = async (id: number): Promise<IDoctor> => {
  const { data } = await client.get(`/doctor/${id}`);
  return data;
}


// const myDoctor = computed(() => {
//   return doctors.value.find(d => d.id===1);
// })
export default function useDoctors() {
  const doctors = ref<IDoctor[]>([]);
  const doctor = ref<IDoctor | null>(null);

  return {
    // myDoctor,
    doctor,
    doctors,
    getDoctor,
    fetchDoctors
  }
}