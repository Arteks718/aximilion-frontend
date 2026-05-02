<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Stitch By Google Dashboard</h1>

    <!-- Stats Section -->
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Campaigns</h3>
        <p class="mt-2 text-3xl font-extrabold text-gray-900">{{ stats.totalActiveCampaigns }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Collected</h3>
        <p class="mt-2 text-3xl font-extrabold text-gray-900">${{ stats.totalAmountCollected }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Registered Users</h3>
        <p class="mt-2 text-3xl font-extrabold text-gray-900">{{ stats.totalUsers }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500 mb-12">Loading stats...</div>

    <!-- Badges Section -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">My Badges</h2>
      <div v-if="badges.length === 0" class="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
        You haven't earned any badges yet. Start donating to unlock milestones!
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div v-for="badge in badges" :key="badge.id" class="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105">
          <div class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          </div>
          <h4 class="font-bold text-gray-900">{{ badge.name }}</h4>
          <p class="text-xs text-gray-500 mt-1">{{ badge.requiredDonationsCount }} Donations</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const stats = ref<any>(null);
const badges = ref<any[]>([]);

const fetchDashboardData = async () => {
  try {
    const [statsRes, badgesRes] = await Promise.all([
      api.get('/stats'),
      api.get('/badges/my')
    ]);
    stats.value = statsRes.data;
    badges.value = badgesRes.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data', error);
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>
