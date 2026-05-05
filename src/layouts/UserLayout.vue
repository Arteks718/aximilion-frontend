<template>
  <div class="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 gap-4 md:gap-8 font-sans">
    
    <!-- Mobile Top Tabs -->
    <div class="md:hidden flex overflow-x-auto gap-2 pb-2 mb-2 border-b border-gray-100 w-full" style="scrollbar-width: none;">
      <router-link to="/me/profile" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-gray-500 bg-gray-50 border border-transparent transition-colors" active-class="!bg-emerald-50 !text-[#006C49] !font-bold !border-emerald-100">
        Profile
      </router-link>
      <router-link to="/me/dashboard" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-gray-500 bg-gray-50 border border-transparent transition-colors" active-class="!bg-emerald-50 !text-[#006C49] !font-bold !border-emerald-100">
        Dashboard
      </router-link>
      <router-link to="/me/campaigns" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-gray-500 bg-gray-50 border border-transparent transition-colors" active-class="!bg-emerald-50 !text-[#006C49] !font-bold !border-emerald-100">
        My Campaigns
      </router-link>
    </div>

    <!-- Sidebar Navigation -->
    <aside class="hidden md:flex flex-col w-64 flex-shrink-0 gap-2">
      <div class="mb-6 px-4">
        <h2 class="font-headline text-2xl font-bold tracking-tight text-gray-900">My Account</h2>
        <p class="text-sm text-gray-500 mt-1">Manage your impact.</p>
      </div>
      <nav class="flex flex-col gap-1">
        <router-link to="/me/profile" class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-[#006C49] hover:bg-emerald-50/50 rounded-lg transition-all hover:translate-x-1 duration-300" active-class="bg-white !text-[#006C49] font-bold shadow-sm border border-gray-100 !translate-x-0">
          <i class="pi pi-user"></i>
          <span class="text-md">Profile</span>
        </router-link>
        <router-link to="/me/dashboard" class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-[#006C49] hover:bg-emerald-50/50 rounded-lg transition-all hover:translate-x-1 duration-300" active-class="bg-white !text-[#006C49] font-bold shadow-sm border border-gray-100 !translate-x-0">
          <i class="pi pi-chart-line"></i>
          <span class="text-md">Dashboard</span>
        </router-link>
        <router-link to="/me/campaigns" class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-[#006C49] hover:bg-emerald-50/50 rounded-lg transition-all hover:translate-x-1 duration-300" active-class="bg-white !text-[#006C49] font-bold shadow-sm border border-gray-100 !translate-x-0">
          <i class="pi pi-megaphone"></i>
          <span class="text-md">My campaigns</span>
        </router-link>
      </nav>
      <div class="mt-auto px-4">
        <router-link to="/create-campaign" class="w-full bg-gradient-to-br from-emerald-500 to-[#006C49] text-white font-semibold px-4 py-3 rounded-xl hover:shadow-lg transition-all flex justify-center items-center gap-2">
          Create Campaign
          <i class="pi pi-arrow-right text-sm"></i>
        </router-link>
      </div>
    </aside>

    <!-- Right Content Area (Injected via router-view) -->
    <div class="flex-grow flex flex-col gap-8 w-full overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
