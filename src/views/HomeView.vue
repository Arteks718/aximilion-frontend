<template>
  <div>
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Hero Text -->
        <div class="max-w-2xl">
          <h1 class="text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark leading-[1.1] mb-6 text-balance font-headline">
            Transparent Charity for <span class="text-brand-green">Real Impact</span>
          </h1>
          <p class="text-lg text-brand-gray mb-8 max-w-xl">
            Track every dollar from your wallet to the final beneficiary. Experience the next generation of philanthropic accountability.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/dashboard" class="bg-[#006C49] text-surface-container-lowest px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#005236] transition-colors shadow-sm">
              Donate Now <i class="fa-solid fa-arrow-right text-white text-sm"></i>
            </router-link>
            <a class="bg-surface-container-low text-brand-dark px-6 py-3 rounded-full font-medium hover:bg-surface-container-highest transition-colors" href="#">
              View Reports
            </a>
          </div>
        </div>
        <!-- Hero Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-surface-container-lowest rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <div class="absolute top-0 right-0 w-24 h-24 bg-brand-lightGreen rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
            <p class="text-sm font-medium text-brand-gray mb-1 relative z-10">Total Funds Raised</p>
            <p class="text-4xl font-bold text-brand-dark relative z-10 font-headline">{{ statsStore.totalFundsRaised }}</p>
          </div>
          <div class="bg-surface-container-lowest rounded-3xl p-6 flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <p class="text-sm font-medium text-brand-gray mb-1">Active Campaigns</p>
            <p class="text-4xl font-bold text-brand-dark font-headline">{{ statsStore.activeCampaigns }}</p>
          </div>
          <div class="bg-surface-container-lowest rounded-3xl p-6 flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <p class="text-sm font-medium text-brand-gray mb-1">Total Donors</p>
            <p class="text-4xl font-bold text-brand-dark font-headline">{{ statsStore.totalDonors }}</p>
          </div>
          <div class="bg-[#006C49] rounded-3xl p-6 text-surface-container-lowest shadow-sm flex flex-col items-center justify-center min-h-[140px] gap-2">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
              <i class="fa-solid fa-check text-white text-xl"></i>
            </div>
            <p class="font-bold text-lg">100% Verified</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-x-auto hide-scrollbar bg-surface-container-low py-4 rounded-2xl mx-4 sm:mx-6 lg:mx-auto">
      <div class="flex gap-4 min-w-max">
        <button class="flex items-center gap-3 px-6 py-3 rounded-xl bg-brand-lightGreen text-brand-green font-semibold shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all hover:-translate-y-0.5">
          <i class="fa-solid fa-globe text-lg"></i> All
        </button>
        <button class="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-container-lowest text-brand-dark font-medium shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all hover:-translate-y-0.5">
          <i class="fa-solid fa-shield-halved text-brand-gray text-lg"></i> Military
        </button>
        <button class="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-container-lowest text-brand-dark font-medium shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all hover:-translate-y-0.5">
          <i class="fa-solid fa-truck-medical text-brand-gray text-lg"></i> Medical
        </button>
        <button class="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-container-lowest text-brand-dark font-medium shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all hover:-translate-y-0.5">
          <i class="fa-solid fa-paw text-brand-gray text-lg"></i> Animals
        </button>
        <button class="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-container-lowest text-brand-dark font-medium shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all hover:-translate-y-0.5">
          <i class="fa-solid fa-hammer text-brand-gray text-lg"></i> Rebuild
        </button>
      </div>
    </section>

    <!-- Verified Campaigns Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-2xl font-bold text-brand-dark mb-1 font-headline">Verified Campaigns</h2>
          <p class="text-brand-gray text-sm">Direct impact backed by rigorous documentation.</p>
        </div>
        <router-link to="/explore" class="text-sm font-medium text-brand-dark hover:text-brand-green flex items-center gap-1">
          View All <i class="fa-solid fa-arrow-right text-xs"></i>
        </router-link>
      </div>

      <div class="space-y-6">
        <article v-for="(campaign, index) in verifiedCampaigns" :key="index" class="bg-surface-container-lowest rounded-2xl p-4 flex flex-col md:flex-row gap-6 shadow-[0_4px_24px_rgba(22,28,34,0.04)] hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-shadow">
          <div class="w-full md:w-1/3 aspect-[4/3] md:aspect-auto md:h-48 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low">
            <img :alt="campaign.title" class="w-full h-full object-cover" :src="campaign.image || 'https://via.placeholder.com/400x300?text=Campaign+Image'" />
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-brand-lightGreen text-brand-green">
                  <i class="fa-solid fa-check-circle text-[10px]"></i> VERIFIED DOCUMENTS
                </span>
                <span class="text-xs font-medium text-brand-gray uppercase tracking-wider">{{ campaign.category || 'Medical' }}</span>
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2 font-headline">{{ campaign.title }}</h3>
              <p class="text-sm text-brand-gray line-clamp-2 mb-4">
                {{ campaign.description }}
              </p>
            </div>
            <div>
              <div class="flex justify-between text-sm font-medium mb-1.5">
                <span class="text-brand-dark">${{ campaign.collectedInternal || 0 }} raised</span>
                <span class="text-brand-dark">{{ Math.round(((campaign.collectedInternal || 0) / campaign.goalAmount) * 100) || 0 }}%</span>
              </div>
              <div class="w-full bg-surface-container-low rounded-full h-2 mb-3">
                <div class="bg-brand-green h-2 rounded-full" :style="{ width: Math.min(100, ((campaign.collectedInternal || 0) / campaign.goalAmount) * 100 || 0) + '%' }"></div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-brand-gray font-medium">
                  <span>Target: ${{ campaign.goalAmount }}</span>
                  <span class="flex items-center gap-1"><i class="fa-regular fa-clock"></i> {{ campaign.daysLeft || 14 }} Days Left</span>
                  <span class="flex items-center gap-1"><i class="fa-solid fa-users"></i> {{ campaign.donorsCount || 1140 }} Donors</span>
                </div>
                <button class="bg-[#006C49] text-surface-container-lowest px-6 py-2 rounded-full text-sm font-medium hover:bg-[#005236] transition-colors flex items-center gap-2">
                  Donate <i class="fa-solid fa-arrow-right text-white text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Secondary Content Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Trending Campaigns -->
        <div class="lg:col-span-2">
          <div class="flex justify-between items-end mb-6">
            <h2 class="text-2xl font-bold text-brand-dark font-headline">Trending Campaigns</h2>
            <a class="text-sm font-medium text-brand-dark hover:text-brand-green flex items-center gap-1" href="#">
              View All <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article v-for="(campaign, index) in trendingCampaigns" :key="index" class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(22,28,34,0.04)] hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-shadow flex flex-col">
              <div class="aspect-[4/3] w-full relative bg-surface-container-low">
                <img :alt="campaign.title" class="w-full h-full object-cover" :src="campaign.image || 'https://via.placeholder.com/400x300?text=Trending+Campaign'" />
              </div>
              <div class="p-5 flex-1 flex flex-col">
                <span class="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">{{ campaign.category || 'Medical' }}</span>
                <h3 class="text-lg font-bold text-brand-dark mb-2 line-clamp-1 font-headline">{{ campaign.title }}</h3>
                <p class="text-sm text-brand-gray line-clamp-2 mb-4 flex-1">
                  {{ campaign.description }}
                </p>
                <div class="mt-auto">
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-brand-green">{{ Math.round(((campaign.collectedInternal || 0) / campaign.goalAmount) * 100) || 0 }}%</span>
                  </div>
                  <div class="w-full bg-surface-container-low rounded-full h-1.5 mb-3">
                    <div class="bg-brand-green h-1.5 rounded-full" :style="{ width: Math.min(100, ((campaign.collectedInternal || 0) / campaign.goalAmount) * 100 || 0) + '%' }"></div>
                  </div>
                  <div class="flex items-center gap-4 text-xs text-brand-gray font-medium">
                    <span class="flex items-center gap-1"><i class="fa-solid fa-bullseye"></i> ${{ campaign.collectedInternal || 0 }} raised</span>
                    <span class="flex items-center gap-1"><i class="fa-solid fa-users"></i> {{ campaign.donorsCount || 1130 }} Donors</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Latest Donations -->
        <div>
          <h2 class="text-2xl font-bold text-brand-dark mb-6 font-headline">Latest Donations</h2>
          <div class="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <ul class="flex flex-col gap-6 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              <li class="flex items-center justify-between" v-for="n in 5" :key="n">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center text-brand-green">
                    <i class="fa-regular fa-user"></i>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-brand-dark">Donor Name</p>
                    <p class="text-xs text-brand-gray">Just now</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-brand-dark">${{ Math.floor(Math.random() * 50) + 10 }}.00</p>
                  <p class="text-xs text-brand-gray">Status: OK</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- The Transparency Ledger -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="bg-surface-container-low rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <h2 class="text-3xl font-bold text-brand-dark mb-10 text-center relative z-10 font-headline">The Transparency Ledger</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-6">
              <div class="absolute -top-3 -left-3 w-6 h-6 bg-surface-container-highest rounded-full flex items-center justify-center text-xs font-bold text-brand-gray z-10">1</div>
              <div class="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm">
                <i class="fa-regular fa-file-lines text-3xl text-brand-green"></i>
                <div class="absolute bottom-0 right-0 w-6 h-6 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm">
                  <i class="fa-solid fa-lock text-xs text-brand-green"></i>
                </div>
              </div>
            </div>
            <h3 class="text-lg font-bold text-brand-dark mb-2 font-headline">Publish</h3>
            <p class="text-sm text-brand-gray px-4">Nonprofits submit detailed project plans and documentation.</p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center relative">
            <div class="hidden md:block absolute top-10 -left-1/2 w-full h-[2px] border-t-2 border-brand-gray/20 border-dashed z-0"></div>
            <div class="relative mb-6 bg-surface-container-low">
              <div class="absolute -top-3 -left-3 w-6 h-6 bg-surface-container-highest rounded-full flex items-center justify-center text-xs font-bold text-brand-gray z-10">2</div>
              <div class="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm relative z-10">
                <i class="fa-solid fa-magnifying-glass text-3xl text-brand-green"></i>
              </div>
            </div>
            <h3 class="text-lg font-bold text-brand-dark mb-2 font-headline">Verify Documents</h3>
            <p class="text-sm text-brand-gray px-4">Our team & community verify the authenticity and feasibility.</p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center relative">
            <div class="hidden md:block absolute top-10 -left-1/2 w-full h-[2px] border-t-2 border-brand-gray/20 border-dashed z-0"></div>
            <div class="relative mb-6 bg-surface-container-low">
              <div class="absolute -top-3 -left-3 w-6 h-6 bg-surface-container-highest rounded-full flex items-center justify-center text-xs font-bold text-brand-gray z-10">3</div>
              <div class="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm relative z-10">
                <div class="relative w-12 h-6 border-[2px] border-brand-green rounded-full overflow-hidden">
                  <div class="absolute top-0 left-0 h-full w-2/3 bg-brand-green"></div>
                </div>
                <div class="absolute -top-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm text-[10px] font-bold text-white border-2 border-surface-container-lowest">
                  $
                </div>
              </div>
            </div>
            <h3 class="text-lg font-bold text-brand-dark mb-2 font-headline">Fundraise</h3>
            <p class="text-sm text-brand-gray px-4">Only verified projects go live for transparent funding.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News & Impact Stories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <h2 class="text-2xl font-bold text-brand-dark mb-6 font-headline">Latest News & Impact Stories</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Story 1 -->
        <article class="bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(22,28,34,0.04)] overflow-hidden flex flex-col group hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-shadow">
          <div class="aspect-video w-full relative overflow-hidden bg-surface-container-low">
            <img alt="Clean Water Project" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/ADBb0ujQZjr5XmVyOo1fQIb3kdDhNJdWp4Uex7EVoroEqneJWRTk1LoETeN37I71T3-GLjvmpd_CC2qRuK3AtobDHSm6apqI1I2Cae9JKccjrYyrTUq4QM7XSIskA5ni-eHujAgbdRaM5AZE6a73c-VDBS-RxzyLEmjW1ip7x0pa7JIe0smJklQ16smzpt_8taStcfFDlfg_v0bRUg9jjHeFk3smdUkO6Iwd2QylGCBABRyFYInku37flgEn4A" />
            <span class="absolute top-3 left-3 bg-brand-green/90 text-surface-container-lowest text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">Success Story</span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <span class="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Medical</span>
            <h3 class="text-lg font-bold text-brand-dark mb-3 line-clamp-2 font-headline">Clean Water Project in Kenya Completed Ahead of Schedule</h3>
            <p class="text-sm text-brand-gray mb-4 flex-1 line-clamp-3">
              Thanks to your support, over 5,000 residents now have access to clean, safe drinking water.
            </p>
            <a class="text-brand-green font-semibold text-sm flex items-center gap-1 hover:text-emerald-700 transition-colors mt-auto" href="#">
              Read More <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </article>
        <!-- Story 2 -->
        <article class="bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(22,28,34,0.04)] overflow-hidden flex flex-col group hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-shadow">
          <div class="aspect-video w-full relative overflow-hidden bg-surface-container-low">
            <img alt="Quarterly Transparency Report" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/ADBb0ujFLht6wMcAO_A3emIvMv1CB1VPVXkqyuVwHusF7nHIKfr967_ua2LFpF6VqKo5a6RJzRyooAI8pEcOYJ-Ac4c8TKHW-7aPs_qkqiEGSGrYO1EfIjT45wHTTLb0t0XsYu4I80b_kFnC8dKsmNP8xnWCH1qLQLcSkX_jjCxEvVtx24D9Rb3_t14gCJ8JZekHLAXh0wDQ1VZEEJHb-PipyGZ-mG3XJsMjmlFYWEhKCTGooS59giM_rHPRzAY" />
            <span class="absolute top-3 left-3 bg-blue-500/90 text-surface-container-lowest text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">Update</span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <span class="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Update</span>
            <h3 class="text-lg font-bold text-brand-dark mb-3 line-clamp-2 font-headline">Quarterly Transparency Report: Q2 2024</h3>
            <p class="text-sm text-brand-gray mb-4 flex-1 line-clamp-3">
              Dive into our detailed financial breakdown and impact metrics for the second quarter.
            </p>
            <a class="text-brand-green font-semibold text-sm flex items-center gap-1 hover:text-emerald-700 transition-colors mt-auto" href="#">
              Read More <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </article>
        <!-- Story 3 -->
        <article class="bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(22,28,34,0.04)] overflow-hidden flex flex-col group hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-shadow">
          <div class="aspect-video w-full relative overflow-hidden bg-surface-container-low">
            <img alt="Maria's Education Fund" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/ADBb0ugf-qsEkVBgVAxyuj3KbIgxXHPiBVjQRSjitMLdTXKq8IplaPwkPG7JorQPOtx_AsLqrQnWlnPB8VNcx5h-tvyY6mj3Zv5-BgAPO6ji8y9fRZ-zIJBt0ceN5q1QSEbnRUel0A5Q8iq2ox_UR5ekG7rszXZxA23InR1BEWc3Dz1aqIy0P4bapTmSyTe6hIoj236tGE0QU-cTsyNZNu02mzJuIhDxaBXxCsUFGmZoIz-ifLvT4QGAPfq0cQ" />
            <span class="absolute top-3 left-3 bg-purple-500/90 text-surface-container-lowest text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">Impact Story</span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <span class="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Impact Story</span>
            <h3 class="text-lg font-bold text-brand-dark mb-3 line-clamp-2 font-headline">How Maria's Education Fund Changed Her Life</h3>
            <p class="text-sm text-brand-gray mb-4 flex-1 line-clamp-3">
              Read about how a scholarship from the "Future Leaders" campaign empowered Maria to pursue her dreams.
            </p>
            <a class="text-brand-green font-semibold text-sm flex items-center gap-1 hover:text-emerald-700 transition-colors mt-auto" href="#">
              Read More <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </article>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCampaignsStore } from '../stores/campaigns';
import { useStatsStore } from '../stores/stats';

const campaignsStore = useCampaignsStore();
const statsStore = useStatsStore();

onMounted(() => {
  campaignsStore.fetchCampaigns();
  statsStore.fetchStats();
});

// Since we have limited data right now, slice the first two for Verified, next two for Trending.
// In a real app we'd have a property 'isVerified' or 'isTrending'.
const defaultCampaigns = [
  {
    title: 'Community Health Hub Construction',
    description: 'Providing essential medical infrastructure to over 5,000 families in rural sectors with full blockchain-backed expense reporting.',
    category: 'Medical',
    goalAmount: 55000,
    collectedInternal: 43000,
    daysLeft: 14,
    donorsCount: 1140,
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ujFLht6wMcAO_A3emIvMv1CB1VPVXkqyuVwHusF7nHIKfr967_ua2LFpF6VqKo5a6RJzRyooAI8pEcOYJ-Ac4c8TKHW-7aPs_qkqiEGSGrYO1EfIjT45wHTTLb0t0XsYu4I80b_kFnC8dKsmNP8xnWCH1qLQLcSkX_jjCxEvVtx24D9Rb3_t14gCJ8JZekHLAXh0wDQ1VZEEJHb-PipyGZ-mG3XJsMjmlFYWEhKCTGooS59giM_rHPRzAY'
  },
  {
    title: 'Zero-Hunger Logistics Network',
    description: 'Scaling our cold-chain storage to prevent food waste and feed metropolitan areas during economic shifts.',
    category: 'Social',
    goalAmount: 30000,
    collectedInternal: 12200,
    daysLeft: 8,
    donorsCount: 642,
    image: 'https://lh3.googleusercontent.com/aida/ADBb0uhVR52u9lBYawUIQaw2-mTbe6YfRSo7UrnnnizsFM0VTuXYtMwAYtLTfSSHFVOK5vrl82zoNj-bVQUvt_iIB2RSDUZGwGP3-u6yRCxXZ1bbcjsJzmVv0zeyWPQP3KGxTV198tcWLTfbsd0euvPoXV-Q8h1DP3scjDtKPwUDqdhMwWXP7e_bq6cVysK-vEBArgGZc0gZwFx_BF056KGVMkLp2dEAoOogtQgOirNnA7pwUMsQNYf_ubI6Mn8'
  },
  {
    title: 'Advanced Medical Kits',
    description: 'Providing provincial medical clinics with full block-chain expense reporting.',
    category: 'Medical',
    goalAmount: 71000,
    collectedInternal: 55600,
    daysLeft: 5,
    donorsCount: 1130,
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugoSvgmmv33hu5p4WxK_aKhUhQXlkJD0yxx51Pr7bgV9DZu5GSmikL3-YJuVS-gCi5ffj35qdKFiGKAbHU72csPtTozd4WqR3SyTSB36Z_OOzrlLcBTegEUtxtVwAKPb-DovH6UAPCBiUDXHYo6_IKg2CxkV9EbOhooFQY177Fba5wOv2Dh7NFaWpcphKSr6vF8Rdq1cMCp9Y1l-Ov6pJlOHmrupCITDg7NVmOEPVaJzZyeTJMB4S1xAA'
  },
  {
    title: 'Emergency Sanctuary Expansion',
    description: 'Scaling our cold-chain wildlife sanctuary and an used metropolitans.',
    category: 'Social',
    goalAmount: 15750,
    collectedInternal: 6300,
    daysLeft: 12,
    donorsCount: 642,
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ujSfOylj1IX5HPMpLsN-y2WR_YSsLsWvQfYx11AUSJoMC3YmD8KcOoVM5_cxIz1faXWNx8nLUNmWrM_CMcnPXc6jY9eZRUrhAlL_J93gSdTPFdBi_aa7VkhepFbmyRG2qMNH4vRmQc41_yTRF7nU6dDRivqxPGAtaUy-rZz84x7nXxE6H8JCPi9_7nizYros9MEOGtXdyOAhMM8QNK_Oz3R3mU5B0u7lQLpMmqm6R5Zo8cDMEKrhsqBMAo'
  }
];

const verifiedCampaigns = computed(() => {
  const storeCamps = campaignsStore.campaigns.length > 0 ? campaignsStore.campaigns : defaultCampaigns;
  return storeCamps.slice(0, 2);
});

const trendingCampaigns = computed(() => {
  const storeCamps = campaignsStore.campaigns.length > 0 ? campaignsStore.campaigns : defaultCampaigns;
  return storeCamps.slice(2, 4);
});

</script>
