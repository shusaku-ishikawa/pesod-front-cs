import { ref, computed } from 'vue';
import { IDoctor } from './Interfaces';

const doctors = ref<IDoctor[]>([
  {
    id: 1,
    name: '窪田 真知',
    clinicName: 'スマルナ医科歯科',
    status: '休診中（12/8 8:00まで）',
    prefecture: '福岡県',
    description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'

  },
  {
    id: 2,
    name: '山根 秀一',
    clinicName: '医療法人梅華会',
    status: '休診中（12/8 8:00まで）',
    prefecture: '兵庫県',
    description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
  },
  {
    id: 3,
    name: '松村 遥',
    clinicName: '松村クリニック',
    status: '休診中（12/8 8:00まで）',
    prefecture: '大阪府',
    description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
  },
  {
    id: 4,
    name: '苅田 正子',
    clinicName: 'さくま診療所',
    status: '休診中（12/8 8:00まで）',
    prefecture: '大阪府',
    description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
  },
  {
    id: 5,
    name: '苅田 正子',
    clinicName: 'さくま診療所',
    status: '休診中（12/8 8:00まで）',
    prefecture: '大阪府',
    description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
  },
]);
const fetchDoctors = (): void => {
  doctors.value = [
    {
      id: 1,
      name: '窪田 真知',
      clinicName: 'スマルナ医科歯科',
      status: '休診中（12/8 8:00まで）',
      prefecture: '福岡県',
      description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
    },
    {
      id: 2,
      name: '山根 秀一',
      clinicName: '医療法人梅華会',
      status: '休診中（12/8 8:00まで）',
      prefecture: '兵庫県',
      description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
    },
    {
      id: 3,
      name: '松村 遥',
      clinicName: '松村クリニック',
      status: '休診中（12/8 8:00まで）',
      prefecture: '大阪府',
      description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
    },
    {
      id: 4,
      name: '苅田 正子',
      clinicName: 'さくま診療所',
      status: '休診中（12/8 8:00まで）',
      prefecture: '大阪府',
      description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
    },
    {
      id: 5,
      name: '苅田 正子',
      clinicName: 'さくま診療所',
      status: '休診中（12/8 8:00まで）',
      prefecture: '大阪府',
      description: '医師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール師プロフィール'
    
    },
  ];
}
const myDoctor = computed(() => {
  return doctors.value.find(d => d.id===1);
})
export default function useDoctors() {

  return {
    myDoctor,
    doctors,
    fetchDoctors
  }
}