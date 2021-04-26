import { RouteRecordRaw } from 'vue-router'

const doctorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'DoctorLp',
    component: () => import(/* webpackChunkName "DoctorLp" */ '@/views/ForDoctor/Lp.vue'),
  },
  {
    path: '/login',
    name: 'DoctorLogin',
    component: () => import(/* webpackChunkName "DoctorLogin" */ '@/views/ForDoctor/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'DoctorDashboard',
    component: () => import(/* webpackChunkName "DoctorDashboard" */ '@/views/ForDoctor/Dashboard.vue'),
  }
]

export default doctorRoutes;