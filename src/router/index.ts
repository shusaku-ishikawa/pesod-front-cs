import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Signup1 from '../views/Signup1.vue'
import Signup2 from '../views/Signup2.vue'
import Signup3 from '../views/Signup3.vue'
import Register from '../views/Register.vue'

import Top from '../views/Top.vue'
import Questionaires from '../views/Questionaires.vue'
import QuestionaireTop from '../views/Questionaires/Top.vue'
import QuestionaireDetail from '../views/Questionaires/Detail.vue'
import QuestionaireDone from '../views/Questionaires/Done.vue'

import Doctors from '../views/Doctors.vue';
import DoctorList from '../views/Doctors/List.vue';
import DoctorDetail from '../views/Doctors/Detail.vue';

import Diagnostic from '../views/Diagnostic.vue'
import DiagnosticTop from '../views/Diagnostic/Top.vue'
import DiagnosticNotCompleted from '../views/Diagnostic/NotCompleted.vue';
import DiagnosticChat from '../views/Diagnostic/Chat.vue';

import Logs from '../views/Logs.vue';
import LogsList from '../views/Logs/List.vue';
import LogsDetail from '../views/Logs/Detail.vue';

import HairConsultant from '../views/HairConsultant.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup1',
    name: 'Signup1',
    component: Signup1
  },
  {
    path: '/signup2',
    name: 'Signup2',
    component: Signup2
  },
  {
    path: '/signup3',
    name: 'Signup3',
    component: Signup3
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
  {
    path: '/diagnostic',
    name: 'Diagnostic',
    component: Diagnostic,
    redirect: { name: 'DiagnosticTop' },
    children: [
      {
        path: 'top',
        name: 'DiagnosticTop',
        component: DiagnosticTop,
      },
      {
        path: 'not-completed',
        name: 'DiagnosticNotCompleted',
        component: DiagnosticNotCompleted
      },
      {
        path: 'chat/:doctorId',
        name: 'DiagnosticChat',
        component: DiagnosticChat
      },
    ]
  },
  {
    path: '/questionaires',
    name: 'Questionaires',
    component: Questionaires,
    children: [
      {
        path: '',
        name: 'QuestionaireTop',
        component: QuestionaireTop,
      },
      {
        path: 'done',
        name: 'QuestionaireDone',
        component: QuestionaireDone,
      },
      {
        path: ':id',
        name: 'QuestionaireDetail',
        component: QuestionaireDetail
      }
    ]
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: Doctors,
    children: [
      {
        path: '',
        name: 'DoctorList',
        component: DoctorList
      },
      {
        path: ':id',
        name: 'DoctorDetail',
        component: DoctorDetail
      }
    ]
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    children: [
      {
        path: '',
        name: 'LogsList',
        component: LogsList,
      },
      {
        path: ':id',
        name: 'LogsDetail',
        component: LogsDetail,
      },
    ]
  },
  {
    path: '/hair-consultant',
    name: 'HairConsultant',
    component: HairConsultant,
    // children: [
    //   {
    //     path: '',
    //     name: 'LogsList',
    //     component: LogsList,
    //   },
    // ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
