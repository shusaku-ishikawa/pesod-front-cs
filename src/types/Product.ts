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
    return data;
    
  };
  
  const getProduct = async (id: string) => {
    const {data} = await client.get(`/product/${id}`);
    return data;
  }
  
  return {
    product,
    products,
    fetchProducts,
    getProduct,
  }
}