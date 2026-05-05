<template>
    <div class="flex flex-col gap-8 w-full">
      <header class="mb-2 flex justify-between items-center">
        <div>
          <h2 class="font-headline text-3xl font-extrabold tracking-tight text-gray-900 mb-2">My Campaigns</h2>
          <p class="text-gray-500 text-sm">Track your fundraising performance.</p>
        </div>
        <router-link to="/create-campaign" class="md:hidden bg-gradient-to-br from-emerald-500 to-[#006C49] text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm">
          Create
        </router-link>
      </header>

      <!-- Stats Section -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Raised -->
        <div class="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-100">
          <div class="absolute top-0 right-0 p-4 opacity-5">
            <i class="pi pi-dollar text-6xl text-[#006C49]"></i>
          </div>
          <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Total Raised</h3>
          <div v-if="loadingStats"><Skeleton width="6rem" height="2rem" /></div>
          <div v-else class="font-headline text-3xl font-black text-gray-900">
            ${{ publisherStats.totalRaised.toLocaleString() }}
          </div>
        </div>
        <!-- Active Campaigns -->
        <div class="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-100">
          <div class="absolute top-0 right-0 p-4 opacity-5">
            <i class="pi pi-bolt text-6xl text-[#006C49]"></i>
          </div>
          <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Active Campaigns</h3>
          <div v-if="loadingStats"><Skeleton width="4rem" height="2rem" /></div>
          <div v-else class="font-headline text-3xl font-black text-gray-900">
            {{ publisherStats.activeCampaignsCount }}
          </div>
        </div>
        <!-- Total Donors -->
        <div class="bg-white rounded-2xl p-6 relative overflow-hidden shadow-sm border border-gray-100">
          <div class="absolute top-0 right-0 p-4 opacity-5">
            <i class="pi pi-users text-6xl text-[#006C49]"></i>
          </div>
          <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Total Donors</h3>
          <div v-if="loadingStats"><Skeleton width="4rem" height="2rem" /></div>
          <div v-else class="font-headline text-3xl font-black text-gray-900">
            {{ publisherStats.totalDonors }}
          </div>
        </div>
      </section>

      <!-- Campaigns List -->
      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-headline text-xl font-bold text-gray-900">Campaigns</h3>
        </div>

        <div v-if="loadingCampaigns" class="flex flex-col gap-4">
          <Skeleton v-for="i in 3" :key="i" width="100%" height="6rem" borderRadius="12px" />
        </div>
        
        <div v-else-if="myCampaigns.length === 0" class="text-center py-12">
          <i class="pi pi-inbox text-4xl text-gray-300 mb-4"></i>
          <h4 class="text-gray-900 font-bold mb-2">No campaigns yet</h4>
          <p class="text-gray-500 text-sm mb-6">Start your first fundraising campaign today.</p>
          <router-link to="/create-campaign" class="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-lg hover:bg-emerald-200 transition-colors">
            <i class="pi pi-plus"></i> Create Campaign
          </router-link>
        </div>

        <div v-else class="flex flex-col gap-4">
          <router-link :to="`/campaigns/${campaign.id}`" v-for="campaign in myCampaigns" :key="campaign.id" class="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50">
            <!-- Cover Image -->
            <img :src="getCoverUrl(campaign)" :class="['w-full md:w-32 h-32 md:h-24 rounded-lg object-cover flex-shrink-0', campaign.status === 'pending' || campaign.status === 'draft' ? 'grayscale opacity-60' : '']" alt="Campaign cover" />
            
            <div class="flex-grow flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-headline text-lg font-bold text-gray-900 line-clamp-1">{{ campaign.title }}</h4>
                  <span :class="getStatusBadgeClass(campaign.status)" class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                    {{ campaign.status === 'pending' ? 'Pending' : campaign.status }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mb-3 line-clamp-1 break-all">{{ campaign.description }}</p>
              </div>
              
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-xs font-semibold">
                  <span class="text-[#006C49]">{{ getFundedPercent(campaign) }}% Funded</span>
                  <span class="text-gray-500">${{ (campaign.collectedInternal || 0).toLocaleString() }} / ${{ campaign.goalAmount.toLocaleString() }}</span>
                </div>
                <div class="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#006C49] h-full rounded-full transition-all duration-500" :style="{ width: `${Math.min(100, getFundedPercent(campaign))}%` }"></div>
                </div>
              </div>
            </div>

            <!-- <div class="flex flex-col justify-center items-end md:ml-4 flex-shrink-0 mt-4 md:mt-0">
              <router-link v-if="campaign.status === 'active'" :to="`/campaigns/${campaign.id}`" class="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-200 transition-colors whitespace-nowrap">
                Manage
              </router-link>
              <router-link v-else-if="campaign.status === 'pending' || campaign.status === 'draft'" :to="`/create-campaign?edit=${campaign.id}`" class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap flex items-center gap-2">
                <i class="pi pi-pencil"></i> Edit Draft
              </router-link>
              <router-link v-else :to="`/campaigns/${campaign.id}/report`" class="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap">
                View Report
              </router-link>
            </div> -->
          </router-link>
        </div>
      </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Skeleton from 'primevue/skeleton';
import api from '../api/axios';

const loadingStats = ref(true);
const loadingCampaigns = ref(true);

const publisherStats = ref({
  totalRaised: 0,
  activeCampaignsCount: 0,
  totalDonors: 0
});

const myCampaigns = ref<any[]>([]);

onMounted(async () => {
  try {
    // Fetch stats
    const statsRes = await api.get('/users/me/publisher-stats');
    publisherStats.value = statsRes.data;
  } catch (error) {
    console.error('Error fetching publisher stats', error);
  } finally {
    loadingStats.value = false;
  }

  try {
    // Fetch campaigns
    const campaignsRes = await api.get('/users/me/campaigns');
    myCampaigns.value = campaignsRes.data;
  } catch (error) {
    console.error('Error fetching my campaigns', error);
  } finally {
    loadingCampaigns.value = false;
  }
});

const getFundedPercent = (campaign: any) => {
  const goal = parseFloat(campaign.goalAmount) || 0;
  const collected = parseFloat(campaign.collectedInternal) || 0;
  if (goal === 0) return 0;
  return Math.round((collected / goal) * 100);
};

const getCoverUrl = (campaign: any) => {
  if (campaign.images && Array.isArray(campaign.images)) {
    const cover = campaign.images.find((img: any) => img.type === 'cover');
    if (cover) return cover.url;
    if (campaign.images.length > 0) return campaign.images[0].url;
  }
  return 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop';
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800';
    case 'pending':
    case 'draft':
      return 'bg-gray-200 text-gray-700';
    case 'closed':
    case 'completed':
      return 'bg-slate-200 text-slate-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
</script>
