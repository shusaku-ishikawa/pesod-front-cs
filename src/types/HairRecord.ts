import { IHairRecord } from '@/types/Interfaces';
import useAxios from './Axios';



export default function useHairRecord(userType = 'customer') {
  const {
    client  
  } = useAxios(userType);
  
  const fetchHairRecord = async () => {
    return null;
  }
  
  const addHairRecord = async (postData: FormData) => {
    const { data } = await client.post('/hairrecord/', postData, { headers: { 'content-type': 'multipart/form-data' } });
    console.log(data);
    return data;
  }
  return {
    fetchHairRecord,
    addHairRecord
  }
}