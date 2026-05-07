<template>
  <header class="mb-2">
        <h2 class="font-headline text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Welcome back, {{ userName }}.</h2>
        <p class="text-gray-500 text-sm">Your impact overview for this quarter.</p>
      </header>

      <!-- Top Section: Metric Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Total Donated -->
        <div class="bg-white rounded-2xl p-8 relative overflow-hidden shadow-sm border border-gray-100">
          <div class="absolute top-0 right-0 p-6 opacity-5">
            <i class="pi pi-wallet text-8xl text-[#006C49]"></i>
          </div>
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Donated</h3>
          <div v-if="loadingStats" class="mt-2"><Skeleton width="10rem" height="3.5rem" /></div>
          <div v-else class="flex items-baseline gap-2">
            <span class="font-headline text-5xl font-black text-gray-900">${{ totalDonated.toLocaleString() }}</span>
            <span class="text-[#006C49] text-sm font-bold">YTD</span>
          </div>
        </div>
        
        <!-- Unique Campaigns -->
        <div class="bg-white rounded-2xl p-8 relative overflow-hidden shadow-sm border border-gray-100">
          <div class="absolute top-0 right-0 p-6 opacity-5">
            <i class="pi pi-users text-8xl text-[#006C49]"></i>
          </div>
          <h3 class="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Unique Campaigns Supported</h3>
          <div v-if="loadingStats" class="mt-2"><Skeleton width="6rem" height="3.5rem" /></div>
          <div v-else class="flex items-baseline gap-2">
            <span class="font-headline text-5xl font-black text-gray-900">{{ uniqueCampaigns }}</span>
            <span class="text-[#006C49] text-sm font-bold">Global</span>
          </div>
        </div>
      </section>

      <!-- Middle Section: Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Donation Streak -->
        <div class="lg:col-span-1 bg-gray-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden border border-gray-100">
          <div class="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 relative z-10">
            <div class="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#006C49] opacity-20 rounded-full blur-xl"></div>
            <i class="pi pi-bolt text-4xl text-[#006C49] relative z-20"></i>
          </div>
          <Skeleton v-if="loadingStats" width="8rem" height="2rem" class="mb-2 z-10" />
          <h3 v-else class="font-headline text-2xl font-bold text-gray-900 mb-1 z-10">{{ streakDays }} Day Streak</h3>
          <p class="text-sm text-gray-500 z-10">Consistent impact matters.</p>
        </div>

        <!-- My Badges -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-headline text-xl font-bold text-gray-900">My Badges</h3>
            <button @click="openAllBadges" class="text-sm text-[#006C49] hover:text-[#005236] transition-colors font-bold">View All</button>
          </div>
          <div v-if="loadingStats" class="grid grid-cols-3 md:grid-cols-5 gap-4">
             <div v-for="n in 5" :key="'skel-badge-'+n" class="flex flex-col items-center text-center gap-2">
                <Skeleton shape="circle" size="3.5rem" />
                <Skeleton width="3rem" height="0.5rem" />
             </div>
          </div>
          <div v-else class="grid grid-cols-3 md:grid-cols-5 gap-4">
            <div v-for="badge in badges" :key="badge.id" 
                 @click="openBadgeDetails(badge)"
                 :class="['flex flex-col items-center text-center gap-2 group cursor-pointer transition-all duration-300', !badge.active ? 'opacity-50 grayscale hover:opacity-75' : '']">
              <div :class="['w-14 h-14 rounded-full flex items-center justify-center transition-transform', badge.active ? 'bg-emerald-50 group-hover:scale-105 shadow-sm' : 'bg-gray-50 border-2 border-dashed border-gray-200']">
                <img v-if="badge.icon_url" :src="badge.icon_url" :alt="badge.name" class="w-10 h-10 object-contain drop-shadow-sm" />
                <i v-else class="pi pi-star text-gray-400 text-xl"></i>
              </div>
              <span :class="['text-xs font-medium leading-tight', badge.active ? 'text-gray-700' : 'text-gray-400']" v-html="badge.name"></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Lower Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recently Supported Campaigns -->
        <section class="lg:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
          <h3 class="font-headline text-xl font-bold text-gray-900 mb-6">Recently Supported</h3>
          
          <div v-if="loadingStats" class="flex flex-col gap-4 flex-1">
            <div v-for="n in 3" :key="n" class="flex gap-4 p-3 bg-white rounded-xl border border-gray-100">
              <Skeleton width="4rem" height="4rem" class="rounded-lg" />
              <div class="flex flex-col justify-center flex-1 gap-2">
                <Skeleton width="80%" height="1rem" />
                <Skeleton width="40%" height="0.8rem" />
              </div>
            </div>
          </div>
          <div v-else-if="recentlySupported.length === 0" class="flex-1 flex items-center justify-center text-gray-500 text-sm">
            You haven't supported any campaigns yet.
          </div>
          <div v-else class="flex flex-col gap-4 flex-1">
            <div v-for="campaign in recentlySupported" :key="campaign.id" class="flex gap-4 p-3 bg-white rounded-xl hover:shadow-sm transition-shadow border border-gray-100 cursor-pointer">
              <img v-if="campaign.imageUrl" :alt="campaign.title" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" :src="campaign.imageUrl" />
              <div v-else class="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0"><i class="pi pi-image text-xl"></i></div>
              <div class="flex flex-col justify-center flex-1">
                <h4 class="font-headline text-sm font-bold text-gray-900 line-clamp-1">{{ campaign.title }}</h4>
                <p class="text-xs text-[#006C49] font-bold mt-1.5">{{ campaign.fundedPercent }}% Funded</p>
                <div class="w-full bg-gray-100 h-1.5 mt-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#006C49] h-full rounded-full" :style="{ width: Math.min(100, campaign.fundedPercent) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Donations Ledger (DataTable) -->
        <section class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-headline text-xl font-bold text-gray-900">Recent Donations Ledger</h3>
            <button class="text-gray-400 hover:text-[#006C49] transition-colors"><i class="pi pi-filter text-lg"></i></button>
          </div>
          <div class="flex-1 overflow-hidden">
            <DataTable 
              :value="donations" 
              :lazy="true"
              :paginator="true" 
              :rows="5" 
              :totalRecords="totalDonations"
              :loading="loadingDonations"
              @page="onPage($event)"
              responsiveLayout="scroll" 
              class="w-full text-sm p-datatable-sm"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            >
              <Column field="date" header="DATE" class="py-4 border-b border-gray-100">
                <template #body="slotProps">
                  <span class="text-gray-500 font-medium">{{ formatDate(slotProps.data.date) }}</span>
                </template>
              </Column>
              <Column field="campaign" header="CAMPAIGN" class="py-4 border-b border-gray-100">
                <template #body="slotProps">
                  <span class="font-medium text-gray-900">{{ slotProps.data.campaign }}</span>
                </template>
              </Column>
              <Column field="amount" header="AMOUNT" class="py-4 border-b border-gray-100 text-right" headerStyle="text-align: right">
                <template #body="slotProps">
                  <span class="font-headline font-bold text-gray-900">${{ slotProps.data.amount.toFixed(2) }}</span>
                </template>
              </Column>
              <Column field="status" header="STATUS" class="py-4 border-b border-gray-100 text-center" headerStyle="text-align: center">
                <template #body="slotProps">
                  <span class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100 capitalize">
                    <i class="pi pi-check-circle text-[10px]" v-if="slotProps.data.status === 'success' || slotProps.data.status === 'Settled'"></i>
                    <i class="pi pi-clock text-[10px]" v-else-if="slotProps.data.status === 'pending'"></i>
                    <i class="pi pi-times-circle text-[10px]" v-else></i>
                    {{ slotProps.data.status === 'success' ? 'Settled' : slotProps.data.status }}
                  </span>
                </template>
              </Column>
              <template #empty>
                <div class="text-center py-8 text-gray-500">No donations found.</div>
              </template>
            </DataTable>
          </div>
        </section>
      </div>

  <!-- Badge Details Modal -->
  <Dialog v-model:visible="showBadgeDialog" modal :header="selectedBadge?.name?.replace('<br/>', ' ')" :style="{ width: '25rem' }" :dismissableMask="true">
    <div v-if="selectedBadge" class="flex flex-col items-center text-center gap-4 py-4">
      <div :class="['w-24 h-24 rounded-full flex items-center justify-center', selectedBadge.active ? 'bg-emerald-50 shadow-md' : 'bg-gray-50 border-2 border-dashed border-gray-200 grayscale opacity-50']">
        <img v-if="selectedBadge.icon_url" :src="selectedBadge.icon_url" class="w-16 h-16 object-contain drop-shadow-md" />
        <i v-else class="pi pi-star text-gray-400 text-3xl"></i>
      </div>
      <div>
        <h4 class="font-headline text-2xl font-bold text-gray-900">{{ selectedBadge.name.replace('<br/>', ' ') }}</h4>
        <p class="text-gray-500 mt-2">{{ getBadgeDescription(selectedBadge) }}</p>
      </div>
      <div v-if="!selectedBadge.active" class="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
        <i class="pi pi-lock"></i> Locked
      </div>
      <div v-else class="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
        <i class="pi pi-check-circle"></i> Earned
      </div>
    </div>
  </Dialog>

  <!-- All Badges Modal -->
  <Dialog v-model:visible="isBadgesModalVisible" modal header="All Badges" :style="{ width: '56rem', maxWidth: '95vw' }" :dismissableMask="true">
    <div v-if="loadingAllBadges" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
      <div v-for="n in 8" :key="'skel-all-badge-'+n" class="flex flex-col items-center text-center gap-3">
        <Skeleton shape="circle" size="4.5rem" />
        <Skeleton width="5rem" height="0.6rem" />
        <Skeleton width="8rem" height="0.5rem" />
      </div>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
      <div
        v-for="badge in allBadges"
        :key="badge.id"
        class="flex flex-col items-center text-center gap-2"
      >
        <div :class="['w-18 h-18 rounded-full flex items-center justify-center p-1', isEarned(badge.id) ? 'bg-emerald-50 shadow-sm' : 'bg-gray-50 border-2 border-dashed border-gray-200']">
          <img
            v-if="badge.icon_url"
            :src="badge.icon_url"
            :alt="badge.name"
            :class="['w-12 h-12 object-contain drop-shadow-sm transition-all', !isEarned(badge.id) ? 'grayscale opacity-50' : '']"
          />
          <i v-else :class="['pi pi-star text-2xl', isEarned(badge.id) ? 'text-[#006C49]' : 'text-gray-300']"></i>
        </div>
        <span :class="['text-xs font-semibold leading-tight', isEarned(badge.id) ? 'text-gray-800' : 'text-gray-400']">{{ badge.name }}</span>
        <span class="text-[10px] text-gray-400 leading-tight px-1">{{ getBadgeDescription(badge) }}</span>
        <span v-if="isEarned(badge.id)" class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
          <i class="pi pi-check-circle text-[9px]"></i> Earned
        </span>
        <span v-else class="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wide">
          <i class="pi pi-lock text-[9px]"></i> Locked
        </span>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import api from '../api/axios';

const authStore = useAuthStore();

const userName = computed(() => {
  return authStore.user?.user_metadata?.full_name || authStore.user?.email?.split('@')[0] || 'User';
});

const loadingStats = ref(true);
const loadingDonations = ref(true);

// Reactive state
const totalDonated = ref(0);
const uniqueCampaigns = ref(0);
const streakDays = ref(0);
const recentlySupported = ref<any[]>([]);

const badges = ref<any[]>([]);

const showBadgeDialog = ref(false);
const selectedBadge = ref<any>(null);

const openBadgeDetails = (badge: any) => {
  selectedBadge.value = badge;
  showBadgeDialog.value = true;
};

// All Badges modal
const isBadgesModalVisible = ref(false);
const allBadges = ref<any[]>([]);
const loadingAllBadges = ref(false);

// Set of badge IDs that the current user has earned (populated from fetchStats)
const earnedBadgeIds = computed<Set<string>>(() => {
  return new Set(badges.value.filter((b: any) => b.active).map((b: any) => b.id));
});

const isEarned = (badgeId: string) => earnedBadgeIds.value.has(badgeId);

const fetchAllBadges = async () => {
  if (allBadges.value.length > 0) return; // cached
  loadingAllBadges.value = true;
  try {
    const { data } = await api.get('/badges');
    // Normalise camelCase Drizzle response to snake_case for consistent template bindings
    allBadges.value = data.map((b: any) => ({
      id: b.id,
      name: b.name,
      icon_url: b.icon_url ?? b.iconUrl,
      criteria_type: b.criteria_type ?? b.criteriaType,
      criteria_value: b.criteria_value ?? b.criteriaValue,
    }));
  } catch (err) {
    console.error('Failed to load all badges', err);
  } finally {
    loadingAllBadges.value = false;
  }
};

const openAllBadges = () => {
  isBadgesModalVisible.value = true;
  fetchAllBadges();
};

const getBadgeDescription = (badge: any) => {
  if (!badge) return '';
  // Support both snake_case (dashboard-stats) and camelCase (GET /badges)
  const val = Number(badge.criteria_value ?? badge.criteriaValue);
  const type = badge.criteria_type ?? badge.criteriaType;
  switch(type) {
    case 'donations_count': return `Make ${val} successful donations.`;
    case 'total_amount': return `Donate a cumulative total of $${val.toLocaleString()}.`;
    case 'unique_campaigns': return `Support ${val} distinct campaigns.`;
    default: return 'Complete the hidden requirement to earn this badge.';
  }
};

const donations = ref<any[]>([]);
const totalDonations = ref(0);

const fetchStats = async () => {
  loadingStats.value = true;
  try {
    const { data } = await api.get('/users/me/dashboard-stats');
    totalDonated.value = data.totalDonated || 0;
    uniqueCampaigns.value = data.uniqueCampaignsCount || 0;
    streakDays.value = data.streakDays || 0;
    recentlySupported.value = data.recentlySupported || [];
    
    // Process badges directly from backend response
    badges.value = data.badges?.map((b: any) => ({
      ...b,
      name: b.name.replace(' ', '<br/>'), // Formatting for circle UI
    })) || [];
  } catch (err) {
    console.error('Failed to load stats', err);
  } finally {
    loadingStats.value = false;
  }
};

const fetchDonations = async (limit = 5, offset = 0) => {
  loadingDonations.value = true;
  try {
    const { data } = await api.get('/users/me/donations', {
      params: { limit, offset }
    });
    donations.value = data.data;
    totalDonations.value = data.total;
  } catch (err) {
    console.error('Failed to load donations', err);
  } finally {
    loadingDonations.value = false;
  }
};

const onPage = (event: any) => {
  fetchDonations(event.rows, event.first);
};

onMounted(() => {
  fetchStats();
  fetchDonations();
});

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
};
</script>

<style scoped>
/* Customizing PrimeVue DataTable to match Tailwind aesthetics */
.p-datatable .p-datatable-thead > tr > th {
  background-color: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.p-datatable .p-paginator {
  background-color: transparent;
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;
  margin-top: 0.5rem;
  padding: 0;
  justify-content: space-between;
}
.p-paginator .p-paginator-current {
  font-size: 0.875rem;
  color: #6b7280;
}
.p-paginator .p-paginator-pages .p-paginator-page {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background-color: #006C49;
  color: #ffffff;
}
</style>
