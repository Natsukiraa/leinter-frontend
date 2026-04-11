import axios, { type AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: config.public.apiBaseUrl as string || 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return {
    provide: {
      axios: api
    }
  };
});

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}