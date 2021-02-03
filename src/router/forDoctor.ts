import { RouteRecordRaw } from 'vue-router'

const doctorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/doctor/',
    name: 'DoctorLp',
    component: () => import(/* webpackChunkName "DoctorLp" */ '@/views/ForDoctor/Lp.vue'),
  },
  {
    path: '/doctor/login',
    name: 'DoctorLogin',
    component: () => import(/* webpackChunkName "DoctorLogin" */ '@/views/ForDoctor/Login.vue'),
  },
  {
    path: '/doctor/dashboard',
    name: 'DoctorDashboard',
    component: () => import(/* webpackChunkName "DoctorDashboard" */ '@/views/ForDoctor/Dashboard.vue'),
  }
]

export default doctorRoutes;