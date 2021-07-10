import { ref, computed } from 'vue';
import { ICs } from './Interfaces';
import useAxios from './Axios';




// const myDoctor = computed(() => {
//   return doctors.value.find(d => d.id===1);
// })
export default function useCounselors() {
  const {
    client
  } = useAxios()

  const counselors = ref<ICs[]>([]);
  
  const fetchCounselors = async (): Promise<ICs[]> => {
    const { data } = await client.get('/counselors/');
    return data
  }
  
  
  return {
    // myDoctor,
    counselors,
    fetchCounselors
  }
}