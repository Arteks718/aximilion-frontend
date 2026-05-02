<template>
  <div class="py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900">Welcome to Aximilion</h1>
      <p class="mt-4 text-lg text-gray-500">The premier charity platform for making a difference.</p>
    </div>

    <div v-if="campaignsStore.campaigns.length === 0" class="text-center text-gray-500">
      Loading campaigns or none available...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="campaign in campaignsStore.campaigns" :key="campaign.id" class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <img src="https://via.placeholder.com/400x200" alt="Placeholder" class="w-full h-48 object-cover" />
        <div class="p-6 flex-1 flex flex-col">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ campaign.title }}</h3>
          <p class="text-gray-600 flex-1 mb-4 line-clamp-3">{{ campaign.description }}</p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-sm font-semibold text-gray-500">Goal:</span>
            <span class="text-lg font-bold text-indigo-600">${{ campaign.goalAmount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCampaignsStore } from '../stores/campaigns';

const campaignsStore = useCampaignsStore();

onMounted(() => {
  campaignsStore.fetchCampaigns();
});
</script>
