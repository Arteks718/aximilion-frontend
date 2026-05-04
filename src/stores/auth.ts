import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';
import api from '../api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    session: null as any | null,
    isInitialized: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.session,
  },
  actions: {
    async initialize() {
      if (this.isInitialized) return;

      const { data } = await supabase.auth.getSession();
      this.session = data.session;

      try {
        const response = await api.post('/auth/sync');
        // Overwrite user with the local DB record (includes role, id, etc.)
        this.user = response.data;
      } catch (err) {
        console.error('Failed to sync user on initialize:', err);
      }

      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session;
      });

      this.isInitialized = true;
    },

    async login(credentials: any) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
      this.session = data.session;
      this.user = data.user;

      try {
        const response = await api.post('/auth/sync');
        // Overwrite user with the local DB record (includes role, id, etc.)
        this.user = response.data;
      } catch (err) {
        console.error('Failed to sync user on login:', err);
      }
    },

    async register(userData: any) {
      const { data: authData, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.name,
          },
        },
      });
      if (error) throw error;
      this.session = authData.session;
      this.user = authData.user;

      try {
        const response = await api.post('/auth/sync');
        // Overwrite user with the local DB record (includes role, id, etc.)
        this.user = response.data;
      } catch (err) {
        console.error('Failed to sync user on register:', err);
      }
    },

    async logout() {
      await supabase.auth.signOut();
      this.session = null;
      this.user = null;
    },
  },
});
