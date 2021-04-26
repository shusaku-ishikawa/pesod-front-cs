
import useAxios from './Axios';


export default function usePayjp () {
  const {
    client  
  } = useAxios();
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
  return {
    getPublicKey,
    fetchCards,
    createCard
  }
}