import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { useAuthStore } from 'stores/auth';
import { Routes } from 'src/enums/Routes';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default defineBoot(({ app, router }) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore().logout();
        router
          .push({ name: Routes.SIGN_IN })
          .catch((err) => console.error('Navigation error:', err));
      }

      if (error instanceof Error) {
        return Promise.reject(error);
      }

      return Promise.reject(new Error('Request failed'));
    },
  );

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

const getAxiosWithAuth = () => {
  const authStore = useAuthStore();

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${authStore.user?.token}`,
    },
  });
};

export { api, getAxiosWithAuth };
