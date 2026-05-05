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
            <router-link :to="{ name: 'campaigns' }" class="bg-[#006C49] text-surface-container-lowest px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#005236] transition-colors shadow-sm">
              Donate Now <i class="pi pi-arrow-right text-white text-sm"></i>
            </router-link>
          </div>
        </div>
        <!-- Hero Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-surface-container-lowest rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <div class="absolute top-0 right-0 w-24 h-24 bg-brand-lightGreen rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
            <p class="text-sm font-medium text-brand-gray mb-1 relative z-10">Total Funds Raised</p>
            <Skeleton v-if="isLoadingStats" width="8rem" height="2.5rem" class="relative z-10" />
            <p v-else class="text-4xl font-bold text-brand-dark relative z-10 font-headline">${{ formatCompactNumber(platformStats.totalFundsRaised) }}</p>
          </div>
          <div class="bg-surface-container-lowest rounded-3xl p-6 flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <p class="text-sm font-medium text-brand-gray mb-1">Active Campaigns</p>
            <Skeleton v-if="isLoadingStats" width="6rem" height="2.5rem" />
            <p v-else class="text-4xl font-bold text-brand-dark font-headline">{{ formatCompactNumber(platformStats.activeCampaigns) }}</p>
          </div>
          <div class="bg-surface-container-lowest rounded-3xl p-6 flex flex-col justify-center min-h-[140px] shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <p class="text-sm font-medium text-brand-gray mb-1">Total Donors</p>
            <Skeleton v-if="isLoadingStats" width="6rem" height="2.5rem" />
            <p v-else class="text-4xl font-bold text-brand-dark font-headline">{{ formatCompactNumber(platformStats.totalDonors) }}</p>
          </div>
          <div class="bg-[#006C49] rounded-3xl p-6 text-surface-container-lowest shadow-sm flex flex-col items-center justify-center min-h-[140px] gap-2">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
              <i class="pi pi-check text-white text-xl"></i>
            </div>
            <p class="font-bold text-lg">100% Verified</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-x-auto hide-scrollbar bg-surface-container-low py-4 rounded-2xl mx-4 sm:mx-6 lg:mx-auto">
      <Skeleton v-if="categories.length === 1" height="4rem" class="mx-auto" />
      <div v-else-if="categories.length > 1" class="flex gap-4 min-w-max">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="handleCategoryClick(category.id)"
          :class="[
            'flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5',
            selectedCategory === category.id 
              ? 'bg-brand-lightGreen text-brand-green font-semibold shadow-md border border-brand-green/30' 
              : 'bg-surface-container-lowest text-brand-dark font-medium shadow-sm hover:shadow-md'
          ]"
        >
          <i :class="[category.iconPrefix, selectedCategory === category.id ? 'text-brand-green' : 'text-brand-gray', 'text-lg pi']"></i> 
          {{ category.name }}
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
        <router-link :to="{ name: 'campaigns' }" class="text-sm font-medium text-brand-dark hover:text-brand-green flex items-center gap-1">
          View All <i class="pi pi-arrow-right text-xs"></i>
        </router-link>
      </div>

      <div class="space-y-6">
        <!-- Skeleton Loading -->
        <template v-if="isLoading">
          <div v-for="n in 3" :key="'v-skel-' + n" class="bg-surface-container-lowest rounded-2xl p-4 flex flex-col md:flex-row gap-6 shadow-sm">
            <Skeleton width="100%" height="12rem" class="md:w-1/3 !rounded-xl" />
            <div class="flex-1 flex flex-col justify-between py-2">
              <div>
                <Skeleton width="40%" height="1rem" class="mb-4" />
                <Skeleton width="80%" height="2rem" class="mb-4" />
                <Skeleton width="100%" height="3rem" />
              </div>
              <div class="mt-8">
                <Skeleton width="100%" height="0.5rem" class="rounded-full" />
              </div>
            </div>
          </div>
        </template>

        <!-- Real Cards -->
        <article 
          v-else-if="verifiedCampaigns.length > 0"
          v-for="campaign in verifiedCampaigns" 
          :key="campaign.id" 
          @click="navigateToDetail(campaign.id)"
          class="bg-surface-container-lowest rounded-2xl p-4 flex flex-col md:flex-row gap-6 shadow-[0_4px_24px_rgba(22,28,34,0.04)] hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-all cursor-pointer"
        >
          <div class="w-full md:w-1/3 aspect-[4/3] md:aspect-auto md:h-48 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low">
            <img :alt="campaign.title" class="w-full h-full object-cover transition-transform group-hover:scale-105" :src="getCoverImage(campaign) || 'https://via.placeholder.com/400x300?text=Campaign+Image'" />
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-brand-lightGreen text-brand-green">
                  <i class="pi pi-verified text-[10px]"></i> VERIFIED DOCUMENTS
                </span>
                <span class="text-xs font-medium text-brand-gray uppercase tracking-wider">{{ getCategoryName(campaign.categoryId) }}</span>
              </div>
              <h3 class="text-xl font-bold text-brand-dark mb-2 font-headline group-hover:text-brand-green">{{ campaign.title }}</h3>
              <p class="text-sm text-brand-gray line-clamp-2 mb-4 break-all">
                {{ campaign.description }}
              </p>
            </div>
            <div>
              <div class="flex justify-between text-sm font-medium mb-1.5">
                <span class="text-brand-dark">{{ currencySymbol(campaign) }}{{ formatAmount(campaign.collectedInternal || 0) }} raised</span>
                <span class="text-brand-dark">{{ progressPercent(campaign) }}%</span>
              </div>
              <ProgressBar :value="progressPercent(campaign)" :showValue="false" class="h-2 mb-3" />
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-brand-gray font-medium">
                  <span>Target: {{ currencySymbol(campaign) }}{{ formatAmount(campaign.goalAmount) }}</span>
                  <span class="flex items-center gap-1"><i class="pi pi-clock text-[10px]"></i> {{ getDaysLeft(campaign) }}</span>
                </div>
                <button class="bg-[#006C49] text-surface-container-lowest px-6 py-2 rounded-full text-sm font-medium hover:bg-[#005236] transition-colors flex items-center gap-2">
                  Donate <i class="pi pi-arrow-right text-white text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- No verified campaigns placeholder -->
        <div v-else class="w-full h-[12rem] col-span-2 flex justify-center items-center bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_24px_rgba(22,28,34,0.04)]">No verified campaigns</div>
      </div>
    </section>

    <!-- Secondary Content Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Trending Campaigns -->
        <div class="lg:col-span-2">
          <div class="flex justify-between items-end mb-6">
            <h2 class="text-2xl font-bold text-brand-dark font-headline">Trending Campaigns</h2>
            <router-link :to="{ name: 'campaigns' }" class="text-sm font-medium text-brand-dark hover:text-brand-green flex items-center gap-1">
              View All <i class="pi pi-arrow-right text-xs"></i>
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Skeleton Loading -->
            <template v-if="isLoading">
              <div v-for="n in 2" :key="'t-skel-' + n" class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <Skeleton width="100%" height="12rem" />
                <div class="p-5 flex-1 space-y-4">
                  <Skeleton width="40%" height="0.75rem" />
                  <Skeleton width="90%" height="1.5rem" />
                  <Skeleton width="100%" height="3rem" />
                  <Skeleton width="100%" height="0.5rem" class="mt-4" />
                </div>
              </div>
            </template>

            <!-- Real Cards -->
            <article 
              v-else-if="trendingCampaigns.length > 0"
              v-for="campaign in trendingCampaigns" 
              :key="campaign.id" 
              @click="navigateToDetail(campaign.id)"
              class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(22,28,34,0.04)] hover:shadow-[0_8px_40px_rgba(22,28,34,0.08)] transition-all flex flex-col cursor-pointer group"
            >
              <div class="aspect-[4/3] w-full relative bg-surface-container-low overflow-hidden">
                <img :alt="campaign.title" class="w-full h-full object-cover transition-transform group-hover:scale-105" :src="getCoverImage(campaign) || 'https://via.placeholder.com/400x300?text=Trending+Campaign'" />
              </div>
              <div class="p-5 flex-1 flex flex-col">
                <span class="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">{{ getCategoryName(campaign.categoryId) }}</span>
                <h3 class="text-lg font-bold text-brand-dark mb-2 line-clamp-1 font-headline group-hover:text-brand-green">{{ campaign.title }}</h3>
                <p class="text-sm text-brand-gray line-clamp-2 mb-4 flex-1">
                  {{ campaign.description }}
                </p>
                <div class="mt-auto">
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-brand-green">{{ progressPercent(campaign) }}%</span>
                  </div>
                  <ProgressBar :value="progressPercent(campaign)" :showValue="false" class="h-1.5 mb-3" />
                  <div class="flex items-center gap-4 text-xs text-brand-gray font-medium">
                    <span class="flex items-center gap-1"><i class="pi pi-target text-[10px]"></i> {{ currencySymbol(campaign) }}{{ formatAmount(campaign.collectedInternal || 0) }} raised</span>
                  </div>
                </div>
              </div>
            </article>
            
            <!-- No trending campaigns placeholder -->
            <div v-else class="w-full h-[12rem] col-span-2 flex justify-center items-center bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_24px_rgba(22,28,34,0.04)]">No trending campaigns</div>
          </div>
        </div>

        <!-- Latest Donations -->
        <div>
          <h2 class="text-2xl font-bold text-brand-dark mb-6 font-headline">Latest Donations</h2>
          <div class="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
            <ul class="flex flex-col gap-6 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              <template v-if="isLoadingDonations">
                <li class="flex items-center justify-between" v-for="n in 5" :key="'skel-' + n">
                  <div class="flex items-center gap-3">
                    <Skeleton shape="circle" width="2.5rem" height="2.5rem" />
                    <div>
                      <Skeleton width="6rem" height="1rem" class="mb-1" />
                      <Skeleton width="4rem" height="0.75rem" />
                    </div>
                  </div>
                  <div class="text-right flex flex-col items-end">
                    <Skeleton width="3rem" height="1rem" class="mb-1" />
                    <Skeleton width="4rem" height="0.75rem" />
                  </div>
                </li>
              </template>
              <template v-else-if="latestDonations.length > 0">
                <li class="flex items-center justify-between" v-for="donation in latestDonations" :key="donation.id">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                         :class="donation.donorName === 'Anonymous' ? 'bg-surface-container-high text-brand-gray' : 'bg-brand-lightGreen text-brand-green'">
                      <i v-if="donation.donorName === 'Anonymous'" class="pi pi-user"></i>
                      <span v-else>{{ donation.donorName.substring(0, 2).toUpperCase() }}</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-brand-dark">{{ donation.donorName }}</p>
                      <p class="text-xs text-brand-gray">{{ timeAgo(donation.createdAt) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-brand-dark">{{ getCurrencySymbol(donation.currency) }}{{ formatAmount(donation.amount / 100) }}</p>
                    <p class="text-xs text-brand-green font-medium">Status: OK</p>
                  </div>
                </li>
              </template>
              <template v-else>
                <li class="text-center py-8 text-brand-gray text-sm">No donations yet.</li>
              </template>
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
                <i class="pi pi-file !text-2xl text-brand-green"></i>
                <div class="absolute bottom-0 right-0 w-6 h-6 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm">
                  <i class="pi pi-lock !text-xs text-brand-green"></i>
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
                <i class="pi pi-search !text-2xl text-brand-green"></i>
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
              Read More <i class="pi pi-arrow-right text-xs"></i>
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
              Read More <i class="pi pi-arrow-right text-xs"></i>
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
              Read More <i class="pi pi-arrow-right text-xs"></i>
            </a>
          </div>
        </article>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/axios';

// PrimeVue components
import ProgressBar from 'primevue/progressbar';
import Skeleton from 'primevue/skeleton';

const router = useRouter();

// --- Campaign types ---
interface CampaignImage { url: string; type: string; }
interface Campaign {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  goalAmount: string;
  collectedInternal: string;
  currency: string;
  images: CampaignImage[] | null;
  status: string;
  endDate: string | null;
  createdAt: string;
  donorsCount?: number;
}
interface Category {
  id: string;
  name: string;
  iconPrefix: string;
}
interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  createdAt: string;
}
interface PlatformStats {
  totalDonors: number;
  activeCampaigns: number;
  totalFundsRaised: number;
}

const DEFAULT_CATEGORY_ID = 'All'

// --- State ---
const campaigns = ref<Campaign[]>([]);
const isLoading = ref(true);
const selectedCategory = ref(DEFAULT_CATEGORY_ID);

const categories = ref<Category[]>([
  { id: DEFAULT_CATEGORY_ID, name: 'All', iconPrefix: 'pi pi-globe' }
]);

const latestDonations = ref<Donation[]>([]);
const isLoadingDonations = ref(true);

const platformStats = ref<PlatformStats>({ totalDonors: 0, activeCampaigns: 0, totalFundsRaised: 0 });
const isLoadingStats = ref(true);

// --- Helpers ---
const currencySymbolMap: Record<string, string> = { USD: '$', EUR: '€', UAH: '₴' };

function getCoverImage(campaign: any): string {
  if (campaign.image) return campaign.image; // fallback data
  const imgs = campaign.images as CampaignImage[] | null;
  const cover = imgs?.find((i) => i.type === 'cover');
  return cover?.url || '';
}

function getCurrencySymbol(currency: string | undefined): string {
  if (!currency) return '$';
  return currencySymbolMap[currency.toUpperCase()] || currency || '$';
}

function currencySymbol(c: any): string {
  return currencySymbolMap[c?.currency] || '$';
}

function formatAmount(val: string | number): string {
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (!n || isNaN(n)) return '0';
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

function progressPercent(c: any): number {
  const collected = parseFloat(c.collectedInternal || '0');
  const goal = parseFloat(c.goalAmount || '1');
  return Math.min(100, Math.round((collected / goal) * 100));
}

function getDaysLeft(c: any): string {
  if (c.daysLeft) return `${c.daysLeft} Days Left`;
  if (!c.endDate) return 'Ongoing';
  const end = new Date(c.endDate);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} Days Left` : 'Ended';
}

function getCategoryName(categoryId: string): string {
  const cat = categories.value.find(c => c.id === categoryId);
  return cat ? cat.name : 'General';
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

// --- Fetch ---
async function fetchCampaigns() {
  isLoading.value = true;
  try {
    const params: any = {};
    if (selectedCategory.value !== DEFAULT_CATEGORY_ID) {
      params.category = selectedCategory.value;
    }
    const { data: response } = await api.get('/campaigns', { params });
    // Support both shapes: new { data, totalCount } and legacy array
    campaigns.value = Array.isArray(response) ? response : response.data;
  } catch (err) {
    console.error('Failed to fetch campaigns:', err);
  } finally {
    isLoading.value = false;
  }
}

async function fetchCategories() {
  try {
    const { data: response } = await api.get('/categories');
    categories.value.push(...(Array.isArray(response) ? response : response.data));
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
}

async function fetchLatestDonations() {
  isLoadingDonations.value = true;
  try {
    const { data } = await api.get('/donations/latest');
    latestDonations.value = data;
  } catch (err) {
    console.error('Failed to fetch latest donations:', err);
  } finally {
    isLoadingDonations.value = false;
  }
}

async function fetchPlatformStats() {
  isLoadingStats.value = true;
  try {
    const { data } = await api.get('/stats/platform');
    platformStats.value = data;
  } catch (err) {
    console.error('Failed to fetch platform stats:', err);
  } finally {
    isLoadingStats.value = false;
  }
}

function handleCategoryClick(catId: string) {
  if(selectedCategory.value === catId) return;
  selectedCategory.value = catId;
  fetchCampaigns();
}

function navigateToDetail(id: string) {
  router.push({ name: 'campaign-detail', params: { id } });
}

onMounted(async () => {
  await fetchPlatformStats();
  await fetchCampaigns();
  await fetchCategories();
  await fetchLatestDonations();
});

const allCampaigns = computed(() => campaigns.value.length > 0 ? campaigns.value : []);
const verifiedCampaigns = computed(() => allCampaigns.value.slice(0, 3));
const trendingCampaigns = computed(() => allCampaigns.value.slice(3, 5));
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
