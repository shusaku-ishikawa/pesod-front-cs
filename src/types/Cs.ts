import { ref, computed } from 'vue';
import { ICs } from './Interfaces';
import useAxios from './Axios';




// const myDoctor = computed(() => {
//   return doctors.value.find(d => d.id===1);
// })
export default function useCs() {
  const {
    client
  } = useAxios()

  const css = ref<ICs[]>([]);
  const cs = ref<ICs | null>(null);

  const fetchCss = async (): Promise<ICs[]> => {
    const { data } = await client.get('/css/');
    return data
  }
  
  const getCs = async (id: number): Promise<ICs> => {
    const { data } = await client.get(`/cs/${id}`);
    return data;
  }
  return {
    // myDoctor,
    cs,
    css,
    getCs,
    fetchCss
  }
}