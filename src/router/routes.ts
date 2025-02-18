import type { RouteRecordRaw } from 'vue-router';
import { Routes } from 'src/enums/Routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    name: Routes.SIGNUP,
  },
  {
    path: '/signIn',
    name: Routes.SIGN_IN,
    component: () => import('pages/SignInPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: Routes.HOME,
      },
      {
        path: '/updatePassword',
        component: () => import('pages/UpdatePasswordPage.vue'),
        name: Routes.UPDATE_PASSWORD,
      },
      {
        path: '/updateName',
        component: () => import('pages/UpdateNamePage.vue'),
        name: Routes.UPDATE_NAME,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
