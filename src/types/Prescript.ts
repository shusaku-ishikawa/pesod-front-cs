

import { ComputedRef, computed, ref, WritableComputedRef } from 'vue';
import { IPrescript, IProduct } from '@/types/Interfaces';
import useAxios from '@/types/Axios';

//const prescript: WritableComputedRef<IPrescript | null> = computed({
  // get: () => {
  //   const data = window.localStorage.getItem('prescript');
  //   if (data) {
  //     return JSON.parse(data);
  //   } else {
  //     return null;
  //   }
  // },
  // set: (data: IPrescript | null) => {
  //   if (data == null) {
  //     window.localStorage.removeItem('prescript');
  //     return;
  //   }
  //   window.localStorage.setItem('prescript', JSON.stringify(data))
  // }
// });


export default function usePrescript (userType = 'customer') {
  const {
    client
  } = useAxios(userType);
  const myPrescript = ref<IPrescript | null>(null);
  const prescripts = ref<IPrescript[]>([]);

  const getPrescript = async () => {
    const {data} = await client.get('/prescript/');
    console.log(data)
    return data;
  }

  const fixInterview = async () => {
    const {data} = await client.get('/prescript/interview_fix')
    return data;
  }

  const selectDoctor = async (doctorId: number) => {
    const {data} = await client.patch('/prescript/select_doctor', { doctor: doctorId })
    return data; 
  }

  const fetchPrescripts = async (): Promise<IPrescript[]> => {
    const {data} = await client.get('/prescripts/')
    console.log(data)
    return data;
  }
  const fetchUserPrescripts = async (uuid: string) => {
    const {data} = await client.get(`/prescripts/${uuid}`);
    console.log(data)
    return data
  }

  const setPrescriptProducts = async (prescriptNo: string, products: IProduct[]) => {
    const prescriptProducts = products.map((p: IProduct) => ({ product: p.id }));
    console.log(prescriptProducts)
    const {data} = await client.patch(`/prescribe/${prescriptNo}`, { products: prescriptProducts });
    console.log(data)
    return data;
  }

  const acceptPrescriptProducts = async () => {
    const {data} = await client.patch('/prescript/exam_fix', {});
    console.log(data);
    return data;
  };

  const deletePrescriptProducts = async (prescriptNo: string) => {
    const {data} = await client.delete(`/prescribe/${prescriptNo}`);
    return data;

  }


  return {
    // prescript,
    myPrescript,
    prescripts,
    getPrescript,
    fixInterview,
    selectDoctor,
    fetchPrescripts,
    fetchUserPrescripts,
    setPrescriptProducts,
    acceptPrescriptProducts,
    deletePrescriptProducts
    
  }
}