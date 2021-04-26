import { ref, computed } from 'vue';
import { IProduct } from './Interfaces';
import useAxios from '@/types/Axios';


export default function useProducts() {
  const product = ref<IProduct | null>(null);
  const products = ref<IProduct[]>([]);
  const {
    client  
  } = useAxios();
  const fetchProducts = async (): Promise<IProduct[]> => {
    const { data } = await client.get('/products/');
    console.log(data);
    return data;
    
  };
  
  const getProduct = async (id: string) => {
    console.log(id)
    const {data} = await client.get(`/product/${id}`);
    console.log(data)
    return data;
  }
  
  return {
    product,
    products,
    fetchProducts,
    getProduct,
  }
}