import axios from 'axios';

import { supabase } from '../lib/supabase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    if (data.session && config.headers) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
