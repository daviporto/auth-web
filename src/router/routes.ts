import type { RouteRecordRaw } from 'vue-router';
import { Routes } from 'src/enums/Routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    name: Routes.SIGNUP,
  },
  {
    path: '/signIn',
    name: Routes.SIGN_IN,
    component: () => import('pages/SignInPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: Routes.HOME,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
