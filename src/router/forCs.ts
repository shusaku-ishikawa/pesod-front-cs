import { RouteRecordRaw } from 'vue-router'

const doctorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'Login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName "CsLogin" */ '@/views/ForCs/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName "DoctorDashboard" */ '@/views/ForCs/Dashboard.vue'),
  }
]

export default doctorRoutes;