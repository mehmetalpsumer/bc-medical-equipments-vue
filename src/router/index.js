import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

// Containers
const MinistryContainer = () => import('@/containers/ministry/TheContainer');
const ProducerContainer = () => import('@/containers/producer/TheContainer');
const BankContainer = () => import('@/containers/bank/TheContainer');
const HospitalContainer = () => import('@/containers/hospital/TheContainer');

// Ministry views
const MinistryDashboard = () => import('@/views/ministry/Dashboard');
const MinistryHospitalList = () => import('@/views/ministry/HospitalList');
const MinistryOrderList = () => import('@/views/ministry/OrderList');
const MinistryProducerList = () => import('@/views/ministry/ProducerList');
const MinistryPaymentList = () => import('@/views/ministry/PaymentList');

// Producer views
const ProducerDashboard = () => import('@/views/producer/ProducerDashboard');
const ProducerOrderList = () => import('@/views/producer/OrderList');
const ProducerPaymentList = () => import('@/views/producer/PaymentList');

// Bank views
const BankDashboard = () => import('@/views/bank/BankDashboard');

// Hospital views
const HospitalDashboard = () => import('@/views/hospital/HospitalDashboard');

// Views - Pages
const Page404 = () => import('@/views/general/Page404');
const Page500 = () => import('@/views/general/Page500');
const Login = () => import('@/views/general/Login');
const Register = () => import('@/views/general/Register');


Vue.use(Router);

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },

    // Ministry routes
    {
      path: '/ministry',
      redirect: '/ministry/dashboard',
      name: 'Ministry of Health',
      meta: {
        requiresAuth: true,
        role: 'MINISTRY',
      },
      component: MinistryContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: MinistryDashboard,
        },
        {
          path: 'hospitals',
          name: 'Hospitals',
          component: MinistryHospitalList,
        },
        {
          path: 'payments',
          name: 'Payments',
          component: MinistryPaymentList,
        },
        {
          path: 'orders',
          name: 'Orders',
          component: MinistryOrderList,
        },
        {
          path: 'producers',
          name: 'Producers',
          component: MinistryProducerList,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters.group !== 'MINISTRY') {
          next('/' + store.getters.group.toLowerCase());
          return;
        }
        next();
      }
    },

    // Producer routes
    {
      path: '/producer',
      redirect: '/producer/dashboard',
      name: 'Producer',
      meta: {
        requiresAuth: true,
        role: 'PRODUCER',
      },
      component: ProducerContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: ProducerDashboard,
        },
        {
          path: 'orders',
          name: 'Orders',
          component: ProducerOrderList,
        },
        {
          path: 'payments',
          name: 'Payments',
          component: ProducerPaymentList,
        },
      ],
      beforeEnter: (to, from, next) => {

        if (store.getters.group !== 'PRODUCER') {
          next('/' + store.getters.group.toLowerCase());
          return;
        }
        next();


      }
    },

    // Bank routes
    {
      path: '/bank',
      redirect: '/bank/dashboard',
      name: 'Bank',
      meta: {
        requiresAuth: true,
        role: 'BANK',
      },
      component: BankContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: BankDashboard,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters.group !== 'BANK') {
          next('/' + store.getters.group.toLowerCase());
          return;
        }
        next();
      }
    },

    // Hospital routes
    {
      path: '/hospital',
      redirect: '/hospital/dashboard',
      name: 'Hospital',
      meta: {
        requiresAuth: true,
        role: 'HOSPITAL',
      },
      component: HospitalContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: HospitalDashboard,
        },
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters.group !== 'HOSPITAL') {
          next('/' + store.getters.group.toLowerCase());
          return;
        }
        next();
      }
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    }
  ],
});

// Route guard
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
