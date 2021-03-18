import { RouteRecordRaw } from 'vue-router'

const clientRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Lp',
    component: () => import(/* webpackChunkName: "Lp" */ '@/views/ForClient/Lp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/ForClient/Login.vue')
  },
  {
    path: '/top',
    name: 'Top',
    component: () => import(/* webpackChunkName: "Top" */ '@/views/ForClient/Top.vue')
  },
  
  {
    path: '/signup1',
    name: 'Signup1',
    component: () => import(/* webpackChunkName: "Signup1" */ '@/views/ForClient/Signup1.vue')
  },
  {
    path: '/signup2',
    name: 'Signup2',
    component: () => import(/* webpackChunkName: "Signup2" */ '@/views/ForClient/Signup2.vue')
  },
  {
    path: '/signup3/:email',
    name: 'Signup3',
    component:  () => import(/* webpackChunkName: "Signup3" */ '@/views/ForClient/Signup3.vue')
  },
  {
    path: '/register/:token',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '@/views/ForClient/Register.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "MyPage" */ '@/views/ForClient/MyPage.vue'),
    children: [
      {
        path: '',
        name: 'MyPageTop',
        component: () => import(/* webpackChunkName: "MyPageTop" */ '@/views/ForClient/MyPage/Top.vue'),
      },
      {
        path: 'genetics',
        name: 'MyPageGenetics',
        component: () => import(/* webpackChunkName: "MyPageGenetics" */ '@/views/ForClient/MyPage/Genetics.vue'),
      },
      
    ]
  },
  
  {
    path: '/diagnostic',
    name: 'Diagnostic',
    component: () => import(/* webpackChunkName: "Diagnostic" */ '@/views/ForClient/Diagnostic.vue'),
    redirect: { name: 'DiagnosticTop' },
    children: [
      {
        path: 'top',
        name: 'DiagnosticTop',
        component: () => import(/* webpackChunkName: "DiagnosticTop" */ '@/views/ForClient/Diagnostic/Top.vue'),
      },
      // {
      //   path: 'not-completed',
      //   name: 'DiagnosticNotCompleted',
      //   component: () => import(/* webpackChunkName: "DiagnosticNotCompleted" */ '@/views/ForClient/Diagnostic/NotCompleted.vue'),
      // },
      
      {
        path: 'doctors',
        name: 'DiagnosticDoctors',
        component: () => import(/* webpackChunkName: "Doctors" */ '@/views/ForClient/Diagnostic/Doctors.vue'),
        children: [
          {
            path: '',
            name: 'DiagnosticDoctorList',
            component: () => import(/* webpackChunkName: "DoctorTop" */ '@/views/ForClient/Diagnostic/Doctors/List.vue'),
          },
          {
            path: ':id',
            name: 'DiagnosticDoctorDetail',
            component: () => import(/* webpackChunkName: "DoctorDetail" */ '@/views/ForClient/Diagnostic/Doctors/Detail.vue'),
            children: [
              {
                path: '',
                name: 'DiagnosticDoctorDetailTop',
                component: () => import(/* webpackChukName: "DoctorDetailTop" */ '@/views/ForClient/Diagnostic/Doctors/Detail/Top.vue')
              },
              {
                path: 'chat',
                name: 'DiagnosticDoctorDetailChat',
                component: () => import(/* webpackChunkName: "DoctorDetailChat" */ '@/views/ForClient/Diagnostic/Doctors/Detail/Chat.vue'),
              },
            ]
          }
        ]
      },
      {
        path: 'questionaires',
        name: 'DiagnosticQuestionaires',
        component: () => import(/* webpackChunkName: "Questionaires" */ '@/views/ForClient/Diagnostic/Questionaires.vue'),
        children: [
          {
            path: '',
            name: 'DiagnosticQuestionaireTop',
            component: () => import(/* webpackChunkName: "QuestionairesTop" */ '@/views/ForClient/Diagnostic/Questionaires/Top.vue'),
          },
          {
            path: 'done',
            name: 'DiagnosticQuestionaireDone',
            component: () => import(/* webpackChunkName: "QuestionairesDone" */ '@/views/ForClient/Diagnostic/Questionaires/Done.vue'),
          },
          {
            path: ':id',
            name: 'DiagnosticQuestionaireDetail',
            component: () => import(/* webpackChunkName: "QuestionairesDetail" */ '@/views/ForClient/Diagnostic/Questionaires/Detail.vue'),
          }
        ]
      },
      
    ]
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import(/* webpackChunkName: "Logs" */ '@/views/ForClient/Logs.vue'),
    children: [
      {
        path: '',
        name: 'LogsList',
        component: () => import(/* webpackChunkName: "LogsList" */ '@/views/ForClient/Logs/List.vue'),
      },
      {
        path: ':id',
        name: 'LogsDetail',
        component: () => import(/* webpackChunkName: "LogsDetail" */ '@/views/ForClient/Logs/Detail.vue'),
      },
    ]
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "Store" */ '@/views/ForClient/Diagnostic/Store.vue'),
    children: [
      {
        path: 'prescription',
        name: 'StorePrescription',
        component: () => import(/* webpackChunkName: "StorePrescription" */ '@/views/ForClient/Diagnostic/Store/Prescription.vue'),
      },
      {
        path: 'product',
        name: 'StoreProduct',
        component: () => import(/* webpackChunkName: "StoreProduct" */ '@/views/ForClient/Diagnostic/Store/Product.vue'),
        children: [
          {
            path: '',
            name: 'StoreProductList',
            component: () => import(/* webpackChunkName: "StoreProductList" */ '@/views/ForClient/Diagnostic/Store/Product/List.vue')
          },
          {
            path: ':id',
            name: 'StoreProductDetail',
            component: () => import(/* webpackChunkName: "StoreProductDetail" */ '@/views/ForClient/Diagnostic/Store/Product/Detail.vue')
          }
        ]
      },
      {
        path: 'payment1',
        name: 'StorePayment1',
        component: () => import(/* webpackChunkName: "StorePayment1" */ '@/views/ForClient/Diagnostic/Store/Payment1.vue'),
      },
      {
        path: 'payment2',
        name: 'StorePayment2',
        component: () => import(/* webpackChunkName: "StorePayment2" */ '@/views/ForClient/Diagnostic/Store/Payment2.vue'),
      },
      {
        path: 'payment3',
        name: 'StorePayment3',
        component: () => import(/* webpackChunkName: "StorePayment3" */ '@/views/ForClient/Diagnostic/Store/Payment3.vue'),
      },
      {
        path: 'paymentdone',
        name: 'StorePaymentDone',
        component: () => import(/* webpackChunkName: "StorePaymentDone" */ '@/views/ForClient/Diagnostic/Store/PaymentDone.vue'),
      },
    ]
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import(/* webpackChunkName: "Support" */ '@/views/ForClient/Support.vue'),
    children: [
      {
        path: '',
        name: 'SupportTop',
        component:  () => import(/* webpackChunkName: "SupportTop" */ '@/views/ForClient/Support/Top.vue')
      },
      {
        path: 'hair-consultant',
        name: 'SupportHairConsultant',
        component:  () => import(/* webpackChunkName: "SupportHairConsultant" */ '@/views/ForClient/Support/HairConsultant.vue'),
      },
      {
        path: 'cs',
        name: 'SupportCS',
        component: () => import(/* webpackChunkName: "SupportCS" */ '@/views/ForClient/Support/CS.vue'),
      },
      
    ]
  }
]

export default clientRoutes;