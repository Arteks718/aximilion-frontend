import { defineStore } from 'pinia';
import api from '../api/axios';

export const useCampaignsStore = defineStore('campaigns', {
  state: () => ({
    campaigns: [] as any[],
  }),
  actions: {
    async fetchCampaigns() {
      try {
        const response = await api.get('/campaigns');
        this.campaigns = response.data;
      } catch (error) {
        console.error('Failed to fetch campaigns', error);
      }
    },
  },
});
