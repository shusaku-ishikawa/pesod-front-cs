import { ref } from 'vue';
import { ILog } from './Interfaces';

const logs = ref<ILog[]>([
  {
    id: 1,
    date: '1/22',
    imgFront: 'https://d3cmdai71kklhc.cloudfront.net/post_watermark/marketplace/90809/mp_20181216-234005931_ddbvc.jpg',
    imgTop: 'https://d3cmdai71kklhc.cloudfront.net/post_watermark/marketplace/90809/mp_20181216-234005931_ddbvc.jpg',
    sunshine: true,
    alchol: true,
    cigar: false,
    exercise: true,
  },
  {
    id: 2,
    date: '1/22',
    imgFront: 'https://d3cmdai71kklhc.cloudfront.net/post_watermark/marketplace/90809/mp_20181216-234005931_ddbvc.jpg',
    imgTop: 'https://d3cmdai71kklhc.cloudfront.net/post_watermark/marketplace/90809/mp_20181216-234005931_ddbvc.jpg',
    sunshine: true,
    alchol: true,
    cigar: false,
    exercise: true,
  },
  
]);
const fetchLogs = () => {
  console.log('hoge')
};

export default function useLogs() {
  return {
    logs,
    fetchLogs
  }
}