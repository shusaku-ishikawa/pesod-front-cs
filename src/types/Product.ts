import { ref, computed } from 'vue';
import { IProduct } from './Interfaces';
import { client } from '@/types/Axios';

const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await client.get('/products/');
  console.log(data);
  return data.results;
  
};

const getProduct = async (id: string) => {
  const {data} = await client.get(`/products/${id}`);
  console.log(data)
  return data;
}

export default function useProducts() {
  const product = ref<IProduct | null>(null);
  const products = ref<IProduct[]>([]);

  return {
    product,
    products,
    fetchProducts,
    getProduct,
  }
}