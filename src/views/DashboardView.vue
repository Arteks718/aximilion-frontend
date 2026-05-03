<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Welcome Section -->
    <div class="mb-12">
      <h1 class="text-4xl font-extrabold text-brand-dark mb-2 font-headline">Welcome back, {{ userName }}</h1>
      <p class="text-brand-gray">Here is a summary of your impact and activities.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(22,28,34,0.04)] flex flex-col justify-center min-h-[140px]">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center">
            <i class="fa-solid fa-hand-holding-dollar text-[#006C49]"></i>
          </div>
          <p class="text-sm font-medium text-brand-gray">Total Donated</p>
        </div>
        <p class="text-3xl font-bold text-brand-dark font-headline">$1,250</p>
      </div>

      <div class="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(22,28,34,0.04)] flex flex-col justify-center min-h-[140px]">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
            <i class="fa-solid fa-heart text-brand-gray"></i>
          </div>
          <p class="text-sm font-medium text-brand-gray">Campaigns Supported</p>
        </div>
        <p class="text-3xl font-bold text-brand-dark font-headline">12</p>
      </div>

      <div class="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_24px_rgba(22,28,34,0.04)] flex flex-col justify-center min-h-[140px]">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
            <i class="fa-solid fa-medal text-brand-gray"></i>
          </div>
          <p class="text-sm font-medium text-brand-gray">Badges Earned</p>
        </div>
        <p class="text-3xl font-bold text-brand-dark font-headline">4</p>
      </div>
    </div>

    <!-- Badges Grid -->
    <div>
      <h2 class="text-2xl font-bold text-brand-dark mb-6 font-headline">Your Badges</h2>
      <div class="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-[#006C49]/10 rounded-full flex items-center justify-center mb-3">
              <i class="fa-solid fa-seedling text-3xl text-[#006C49]"></i>
            </div>
            <p class="font-bold text-brand-dark text-sm">First Seed</p>
            <p class="text-xs text-brand-gray mt-1">Donated to 1 campaign</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
              <i class="fa-solid fa-water text-3xl text-blue-500"></i>
            </div>
            <p class="font-bold text-brand-dark text-sm">Clean Water</p>
            <p class="text-xs text-brand-gray mt-1">Supported a medical cause</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
              <i class="fa-solid fa-book-open text-3xl text-purple-500"></i>
            </div>
            <p class="font-bold text-brand-dark text-sm">Educator</p>
            <p class="text-xs text-brand-gray mt-1">Supported education</p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-3">
              <i class="fa-solid fa-star text-3xl text-yellow-600"></i>
            </div>
            <p class="font-bold text-brand-dark text-sm">Rising Star</p>
            <p class="text-xs text-brand-gray mt-1">Over $1,000 donated</p>
          </div>

          <div class="flex flex-col items-center text-center opacity-40 grayscale">
            <div class="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-3">
              <i class="fa-solid fa-shield-heart text-3xl text-brand-gray"></i>
            </div>
            <p class="font-bold text-brand-dark text-sm">Guardian</p>
            <p class="text-xs text-brand-gray mt-1">Locked</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const userName = computed(() => {
  return authStore.user?.email?.split('@')[0] || 'User';
});
</script>
