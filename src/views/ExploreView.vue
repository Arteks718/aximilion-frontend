<template>
  <div class="pt-8 min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 pb-20">

    <!-- ═══════════ Sidebar ═══════════ -->
    <aside class="w-full lg:w-64 flex-shrink-0 flex flex-col gap-8 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-y-auto">
      <div class="flex flex-col gap-2 p-6 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-sm">

        <!-- Heading -->
        <div class="mb-4">
          <h2 class="text-lg font-bold text-brand-dark font-headline">Filter Strategy</h2>
          <p class="text-brand-gray text-xs font-semibold uppercase tracking-wider">Refine your impact</p>
        </div>

        <!-- Category Nav -->
        <nav class="flex flex-col gap-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.id)"
            :class="[
              'flex items-center gap-3 p-3 rounded-lg transition-all text-sm',
              filters.category === cat.id
                ? 'text-brand-green font-bold border-r-4 border-brand-green bg-brand-lightGreen/20'
                : 'text-brand-gray font-semibold hover:bg-surface-container-low'
            ]"
          >
            <i :class="[cat.iconPrefix, 'pi']"></i>
            <span class="font-label">{{ cat.name }}</span>
          </button>
        </nav>

        <!-- Advanced Filters -->
        <div class="mt-8 space-y-6">

          <!-- Funding Goal Slider -->
          <div>
            <label class="text-sm font-bold text-brand-dark block mb-3">Funding Goal</label>
            <Slider
              v-model="filters.goalRange"
              :min="0"
              :max="100000"
              :step="1000"
              range
              class="w-full"
            />
            <div class="flex justify-between mt-2 text-[10px] text-brand-gray font-mono">
              <span>{{ formatCurrency(filters.goalRange[0]) }}</span>
              <span>{{ filters.goalRange[1] >= 100000 ? '$100K+' : formatCurrency(filters.goalRange[1]) }}</span>
            </div>
          </div>

          <!-- Urgency -->
          <div>
            <label class="text-sm font-bold text-brand-dark block mb-3">Urgency</label>
            <div class="space-y-3">
              <div v-for="opt in urgencyOptions" :key="opt.value" class="flex items-center gap-2">
                <RadioButton
                  v-model="filters.sortBy"
                  :inputId="opt.value"
                  name="urgency"
                  :value="opt.value"
                />
                <label :for="opt.value" class="text-sm text-brand-gray hover:text-brand-dark cursor-pointer transition-colors">{{ opt.label }}</label>
              </div>
            </div>
          </div>

          <!-- Verified Only -->
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="verifiedOnly"
              v-model="filters.verified"
              class="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green/20 cursor-pointer"
            />
            <label for="verifiedOnly" class="text-sm font-semibold text-brand-gray hover:text-brand-dark cursor-pointer transition-colors">Verified Only</label>
          </div>
        </div>

        <!-- CTA -->
        <router-link
          :to="{ name: 'create-campaign' }"
          class="mt-8 w-full bg-brand-green text-white font-bold py-3 rounded-full text-sm shadow-sm hover:bg-emerald-700 transition-colors text-center block"
        >
          Start a Campaign
        </router-link>
      </div>
    </aside>

    <!-- ═══════════ Main Content ═══════════ -->
    <section class="flex-1 flex flex-col gap-8">

      <!-- Top Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold font-headline text-brand-dark tracking-tight">Active Campaigns</h1>
          <p class="text-brand-gray text-sm mt-1">
            Showing {{ totalCount }} Active Campaign{{ totalCount !== 1 ? 's' : '' }}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <!-- View toggle -->
          <div class="flex items-center bg-surface-container-lowest border border-surface-container-high p-1 rounded-full shadow-sm">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-3 rounded-full transition-colors flex items-center justify-center',
                viewMode === 'grid' ? 'bg-brand-lightGreen text-brand-green shadow-sm' : 'text-brand-gray hover:text-brand-green'
              ]"
            >
              <i class="pi pi-th-large !text-xl"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-3 rounded-full transition-colors flex items-center justify-center',
                viewMode === 'list' ? 'bg-brand-lightGreen text-brand-green shadow-sm' : 'text-brand-gray hover:text-brand-green'
              ]"
            >
              <i class="pi pi-list !text-xl"></i>
            </button>
          </div>

          <!-- Sort Dropdown -->
          <Select
            v-model="filters.sortBy"
            :options="sortOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Sort By"
            class="rounded-full text-sm font-semibold shadow-sm min-w-[160px]"
          />
        </div>
      </div>

      <!-- ═══════════ Campaign Grid ═══════════ -->

      <!-- Loading Skeletons -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="n in filters.limit" :key="n" class="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden flex flex-col shadow-sm">
          <Skeleton height="12rem" class="!rounded-none" />
          <div class="p-5 space-y-4">
            <Skeleton width="40%" height="0.75rem" />
            <Skeleton height="1.5rem" />
            <Skeleton width="90%" height="0.75rem" />
            <div class="pt-4">
              <Skeleton height="0.5rem" class="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="campaigns.length === 0" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center">
          <i class="pi pi-search text-3xl text-brand-gray/40"></i>
        </div>
        <h3 class="text-xl font-bold text-brand-dark font-headline">No campaigns found</h3>
        <p class="text-brand-gray text-sm text-center max-w-sm">Try adjusting your filters or check back later for new campaigns.</p>
        <button @click="resetFilters" class="mt-2 px-6 py-2.5 bg-brand-lightGreen text-brand-green font-semibold rounded-full text-sm hover:bg-brand-lightGreen/80 transition-colors">
          Reset Filters
        </button>
      </div>

      <!-- Grid/List View -->
      <div v-else :class="['flex',
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'flex flex-col gap-6'
      ]">
        <router-link
          v-for="campaign in campaigns"
          :key="campaign.id"
          :to="{ name: 'campaign-detail', params: { id: campaign.id } }"
          :class="[
            'group bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden flex transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer shadow-sm',
            viewMode === 'grid' ? 'flex-col' : 'flex-row'
          ]"
        >
          <!-- Image Container -->
          <div :class="[
            'relative overflow-hidden bg-surface-container-low',
            viewMode === 'grid' ? 'h-48 w-full' : 'w-64 h-auto flex-shrink-0'
          ]">
            <img
              :alt="campaign.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :src="getCoverImage(campaign) || placeholderImage"
            />
            <!-- Badge Overlay -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span
                v-if="getCategoryName(campaign.categoryId)"
                class="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-green text-[10px] font-bold uppercase tracking-widest rounded-md border border-surface-container-high shadow-sm w-fit"
              >
                {{ getCategoryName(campaign.categoryId) }}
              </span>
              <span
                v-if="campaign.status === 'active'"
                class="px-2.5 py-1 bg-brand-green/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 shadow-sm w-fit"
              >
                <i class="pi pi-verified !text-[12px]"></i>
                Verified
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-brand-dark leading-tight mb-2 font-headline line-clamp-1 group-hover:text-brand-green transition-colors">
              {{ campaign.title }}
            </h3>
            <p class="text-brand-gray text-sm line-clamp-2 mb-6 leading-relaxed break-all">
              {{ campaign.description }}
            </p>

            <div class="mt-auto space-y-4">
              <!-- Progress Tracking -->
              <div>
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Progress</span>
                  <span class="text-sm font-bold text-brand-green">
                    {{ getCurrencySymbol(campaign.currency) }}{{ formatAmount(campaign.collectedInternal || '0') }}
                    <span class="text-brand-gray font-medium text-xs">of {{ getCurrencySymbol(campaign.currency) }}{{ formatGoalShort(campaign.goalAmount) }}</span>
                  </span>
                </div>
                <ProgressBar
                  :value="calculateProgress(campaign)"
                  :showValue="false"
                  class="h-1.5"
                />
              </div>

              <!-- Card Footer Meta -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-xs text-brand-gray font-medium">
                  <i class="pi pi-clock !text-[14px]"></i>
                  <span>{{ daysLeft(campaign) }}</span>
                </div>
                <span class="text-xs font-bold text-brand-green group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Details
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- ═══════════ Pagination ═══════════ -->
      <div class="mt-12 flex justify-center">
        <Paginator
          v-if="totalCount > filters.limit"
          :rows="filters.limit"
          :totalRecords="totalCount"
          :first="(filters.page - 1) * filters.limit"
          @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          class="shadow-sm border border-surface-container-high rounded-full px-4"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import api from '../api/axios'

// PrimeVue components (Standard Mode)
import Slider from 'primevue/slider'
import Select from 'primevue/select'
import RadioButton from 'primevue/radiobutton'
import ProgressBar from 'primevue/progressbar'
import Paginator from 'primevue/paginator'
import Skeleton from 'primevue/skeleton'
import { getCurrencySymbol } from '../helpers'

// ── Types ──────────────────────────────────────────────────
interface CampaignImage { url: string; type: string }
interface Campaign {
  id: string
  title: string
  description: string
  categoryId: string
  goalAmount: string
  collectedInternal: string
  currency: string
  images: CampaignImage[] | null
  status: string
  endDate: string | null
  createdAt: string
}

interface Category {
  id: string
  name: string
  iconPrefix: string
}

const DEFAULT_CATEGORY_ID = 'All'

// ── State ──────────────────────────────────────────────────
const loading = ref(true)
const campaigns = ref<Campaign[]>([])
const categories = ref<Category[]>([
  { id: DEFAULT_CATEGORY_ID, name: 'All Campaigns', iconPrefix: 'pi-globe' }
])
const totalCount = ref(0)
const viewMode = ref<'grid' | 'list'>('grid')

const filters = reactive({
  category: DEFAULT_CATEGORY_ID,
  goalRange: [0, 100000],
  verified: true,
  sortBy: 'recent' as 'recent' | 'funded' | 'ending',
  page: 1,
  limit: 12,
})

const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eef4fc%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%236B7280%22%20font-size%3D%2214%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'

const urgencyOptions = [
  { label: 'All (Recent)', value: 'recent' },
  { label: 'Most Funded', value: 'funded' },
  { label: 'Ending Soon', value: 'ending' },
]

const sortOptions = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Most Funded', value: 'funded' },
  { label: 'Ending Soon', value: 'ending' },
]

function getCoverImage(campaign: Campaign): string {
  if (!campaign.images) return ''
  const cover = campaign.images.find(img => img.type === 'cover')
  return cover ? cover.url : ''
}

function calculateProgress(campaign: Campaign): number {
  const collected = parseFloat(campaign.collectedInternal || '0')
  const goal = parseFloat(campaign.goalAmount || '1')
  return Math.min(100, Math.round((collected / goal) * 100))
}

function formatAmount(val: string | number): string {
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (!n || isNaN(n)) return '0'
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatGoalShort(val: string): string {
  const n = parseFloat(val)
  if (!n || isNaN(n)) return '0'
  if (n >= 1000) return Math.round(n / 1000) + 'k'
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatCurrency(val: number): string {
  if (val >= 1000) return '$' + Math.round(val / 1000) + 'K'
  return '$' + val
}

function daysLeft(c: Campaign): string {
  if (!c.endDate) return 'Ongoing'
  const end = new Date(c.endDate)
  const now = new Date()
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diff <= 0) return 'Ended'
  return `${diff} Day${diff !== 1 ? 's' : ''} Left`
}

function getCategoryName(categoryId: string): string {
  const cat = categories.value.find(c => c.id === categoryId)
  return cat ? cat.name : ''
}

function selectCategory(id: string) {
  if(filters.category == id) return;
  filters.category = id === DEFAULT_CATEGORY_ID ? DEFAULT_CATEGORY_ID : id
  filters.page = 1
}

function resetFilters() {
  filters.category = DEFAULT_CATEGORY_ID
  filters.goalRange = [0, 100000]
  filters.verified = true
  filters.sortBy = 'recent'
  filters.page = 1
}

function onPageChange(event: any) {
  filters.page = event.page + 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── API Logic ──────────────────────────────────────────────
async function fetchCampaigns() {
  loading.value = true
  try {
    const params: Record<string, unknown> = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      verified: filters.verified,
      minGoal: filters.goalRange[0] > 0 ? filters.goalRange[0] : undefined,
      maxGoal: filters.goalRange[1] < 100000 ? filters.goalRange[1] : undefined
    }
    if (filters.category != DEFAULT_CATEGORY_ID) params.category = filters.category

    const { data } = await api.get('/campaigns', { params })
    campaigns.value = data.data
    totalCount.value = data.totalCount
  } catch (err) {
    console.error('Failed to fetch campaigns:', err)
    campaigns.value = []
    totalCount.value = 0
  } finally {
    loading.value = false
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

// ── Watchers ───────────────────────────────────────────────
// Re-fetch on any filter change (debounced for slider)
let fetchTimeout: ReturnType<typeof setTimeout> | null = null
watch(filters, () => {
  if (fetchTimeout) clearTimeout(fetchTimeout)
  fetchTimeout = setTimeout(() => {
    fetchCampaigns()
  }, 300)
}, { deep: true })

// ── Lifecycle ──────────────────────────────────────────────
onMounted(async () => {
  await fetchCategories()
  await fetchCampaigns()
})
</script>

<style scoped>

/* Custom styles to force brand colors on standard components if theme is not perfect */
:deep(.p-slider-range) {
  background: #047857 !important;
}
:deep(.p-slider-handle) {
  border: 2px solid #047857 !important;
}
:deep(.p-progressbar-value) {
  background: #047857 !important;
}
:deep(.p-radiobutton-box.p-highlight) {
  background: #047857 !important;
  border-color: #047857 !important;
}
:deep(.p-paginator .p-paginator-page.p-highlight) {
  background: #047857 !important;
  color: #ffffff !important;
}
</style>
