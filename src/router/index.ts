import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
  },
  {
    path: '/top',
    name: 'Top',
    component: () => import(/* webpackChunkName: "Top" */ '@/views/Top.vue')
  },
  
  {
    path: '/signup1',
    name: 'Signup1',
    component: () => import(/* webpackChunkName: "Signup1" */ '@/views/Signup1.vue')
  },
  {
    path: '/signup2',
    name: 'Signup2',
    component: () => import(/* webpackChunkName: "Signup2" */ '@/views/Signup2.vue')
  },
  {
    path: '/signup3',
    name: 'Signup3',
    component:  () => import(/* webpackChunkName: "Signup3" */ '@/views/Signup3.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '@/views/Register.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "MyPage" */ '@/views/MyPage.vue'),
    children: [
      {
        path: '',
        name: 'MyPageTop',
        component: () => import(/* webpackChunkName: "MyPageTop" */ '@/views/MyPage/Top.vue'),
      },
      {
        path: 'genetics',
        name: 'MyPageGenetics',
        component: () => import(/* webpackChunkName: "MyPageGenetics" */ '@/views/MyPage/Genetics.vue'),
      },
      
    ]
  },
  
  {
    path: '/diagnostic',
    name: 'Diagnostic',
    component: () => import(/* webpackChunkName: "Diagnostic" */ '@/views/Diagnostic.vue'),
    redirect: { name: 'DiagnosticTop' },
    children: [
      {
        path: 'top',
        name: 'DiagnosticTop',
        component: () => import(/* webpackChunkName: "DiagnosticTop" */ '@/views/Diagnostic/Top.vue'),
      },
      // {
      //   path: 'not-completed',
      //   name: 'DiagnosticNotCompleted',
      //   component: () => import(/* webpackChunkName: "DiagnosticNotCompleted" */ '@/views/Diagnostic/NotCompleted.vue'),
      // },
      
      {
        path: 'doctors',
        name: 'DiagnosticDoctors',
        component: () => import(/* webpackChunkName: "Doctors" */ '@/views/Diagnostic/Doctors.vue'),
        children: [
          {
            path: '',
            name: 'DiagnosticDoctorList',
            component: () => import(/* webpackChunkName: "DoctorTop" */ '@/views/Diagnostic/Doctors/List.vue'),
          },
          {
            path: ':id',
            name: 'DiagnosticDoctorDetail',
            component: () => import(/* webpackChunkName: "DoctorDetail" */ '@/views/Diagnostic/Doctors/Detail.vue'),
            children: [
              {
                path: '',
                name: 'DiagnosticDoctorDetailTop',
                component: () => import(/* webpackChukName: "DoctorDetailTop" */ '@/views/Diagnostic/Doctors/Detail/Top.vue')
              },
              {
                path: 'chat',
                name: 'DiagnosticDoctorDetailChat',
                component: () => import(/* webpackChunkName: "DoctorDetailChat" */ '@/views/Diagnostic/Doctors/Detail/Chat.vue'),
              },
            ]
          }
        ]
      },
      {
        path: 'questionaires',
        name: 'DiagnosticQuestionaires',
        component: () => import(/* webpackChunkName: "Questionaires" */ '@/views/Diagnostic/Questionaires.vue'),
        children: [
          {
            path: '',
            name: 'DiagnosticQuestionaireTop',
            component: () => import(/* webpackChunkName: "QuestionairesTop" */ '@/views/Diagnostic/Questionaires/Top.vue'),
          },
          {
            path: 'done',
            name: 'DiagnosticQuestionaireDone',
            component: () => import(/* webpackChunkName: "QuestionairesDone" */ '@/views/Diagnostic/Questionaires/Done.vue'),
          },
          {
            path: ':id',
            name: 'DiagnosticQuestionaireDetail',
            component: () => import(/* webpackChunkName: "QuestionairesDetail" */ '@/views/Diagnostic/Questionaires/Detail.vue'),
          }
        ]
      },
      
    ]
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import(/* webpackChunkName: "Logs" */ '@/views/Logs.vue'),
    children: [
      {
        path: '',
        name: 'LogsList',
        component: () => import(/* webpackChunkName: "LogsList" */ '@/views/Logs/List.vue'),
      },
      {
        path: ':id',
        name: 'LogsDetail',
        component: () => import(/* webpackChunkName: "LogsDetail" */ '@/views/Logs/Detail.vue'),
      },
    ]
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "Store" */ '@/views/Diagnostic/Store.vue'),
    children: [
      {
        path: 'prescription',
        name: 'StorePrescription',
        component: () => import(/* webpackChunkName: "StorePrescription" */ '@/views/Diagnostic/Store/Prescription.vue'),
      },
      {
        path: 'product',
        name: 'StoreProduct',
        component: () => import(/* webpackChunkName: "StoreProduct" */ '@/views/Diagnostic/Store/Product.vue'),
      },
      {
        path: 'payment1',
        name: 'StorePayment1',
        component: () => import(/* webpackChunkName: "StorePayment1" */ '@/views/Diagnostic/Store/Payment1.vue'),
      },
      {
        path: 'payment2',
        name: 'StorePayment2',
        component: () => import(/* webpackChunkName: "StorePayment2" */ '@/views/Diagnostic/Store/Payment2.vue'),
      },
    ]
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import(/* webpackChunkName: "Support" */ '@/views/Support.vue'),
    children: [
      {
        path: '',
        name: 'SupportTop',
        component:  import(/* webpackChunkName: "SupportTop" */ '@/views/Support/Top.vue')
      },
      {
        path: 'hair-consultant',
        name: 'SupportHairConsultant',
        component:  import(/* webpackChunkName: "SupportHairConsultant" */ '@/views/Support/HairConsultant.vue'),
      },
      {
        path: 'cs',
        name: 'SupportCS',
        component:  import(/* webpackChunkName: "SupportCS" */ '@/views/Support/CS.vue'),
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
