
import {client} from './Axios';

const getPublicKey = async () => {
  const {data} = await client.get('/card/pubkey/');
  return data;
}
const fetchCards = async  () => {
  const {data} = await client.get('/cards/');
  return data;
}
const createCard = async (payload: any) => {
  const {data} = await client.post('/card/create/', payload);
  return data;
}
export default function usePayjp () {
  return {
    getPublicKey,
    fetchCards,
    createCard
  }
}