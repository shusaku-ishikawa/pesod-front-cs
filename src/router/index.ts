import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


import clientRoutes from './forClient';
import doctorRoutes from './forDoctor';

const routes = [...clientRoutes, ...doctorRoutes];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
