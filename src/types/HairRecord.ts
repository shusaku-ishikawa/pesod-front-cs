import { IHairRecord } from '@/types/Interfaces';
import { client } from './Axios';

const fetchHairRecord = async () => {
  return null;
}

const addHairRecord = async (postData: FormData) => {
  const { data } = await client.post('/hairrecord/', postData, { headers: { 'content-type': 'multipart/form-data' } });
  console.log(data);
  return data;
}

export default function useHairRecord() {
  return {
    fetchHairRecord,
    addHairRecord
  }
}