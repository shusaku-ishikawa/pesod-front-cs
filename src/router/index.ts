import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


// import clientRoutes from './forClient';
import csRoutes from './forCs';

const routes = [...csRoutes];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
