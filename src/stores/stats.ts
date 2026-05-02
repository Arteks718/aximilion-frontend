import { defineStore } from 'pinia';
import api from '../api/axios';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    totalFundsRaised: '$12.4M',
    activeCampaigns: 142,
    totalDonors: '45K',
  }),
  actions: {
    async fetchStats() {
      try {
        const response = await api.get('/stats');
        this.totalFundsRaised = response.data.totalFundsRaised || '$12.4M';
        this.activeCampaigns = response.data.activeCampaigns || 142;
        this.totalDonors = response.data.totalDonors || '45K';
      } catch (error) {
        console.error('Failed to fetch stats, using mock data', error);
      }
    },
  },
});
