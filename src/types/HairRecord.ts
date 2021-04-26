import { IHairRecord } from '@/types/Interfaces';
import useAxios from './Axios';



export default function useHairRecord() {
  const {
    client  
  } = useAxios();
  
  const fetchHairRecord = async () => {
    return [];
  }
  const fetchUserHairRecords = async (uuid: string) => {
    
    const {data} = await client.get(`/hairrecords/?uuid=${uuid}`);
    console.log(data)
    return data;

  }
  
  const addHairRecord = async (postData: FormData) => {
    const { data } = await client.post('/hairrecord/', postData, { headers: { 'content-type': 'multipart/form-data' } });
    console.log(data);
    return data;
  }
  return {
    fetchHairRecord,
    addHairRecord,
    fetchUserHairRecords
  }
}