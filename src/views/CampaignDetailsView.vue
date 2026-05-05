<template>
  <div>
    <!-- ═══════════ Hero Section ═══════════ -->
    <section class="relative w-full h-[480px] lg:h-[580px] overflow-hidden">
      <!-- Skeleton hero -->
      <template v-if="isLoading">
        <Skeleton width="100%" height="100%" class="!rounded-none" />
      </template>
      <template v-else>
        <img
          :src="coverImage || placeholderImage"
          :alt="campaign?.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
          <div
            v-if="campaign?.status === 'active'"
            class="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4"
          >
            <i class="pi pi-verified !text-sm"></i>
            Verified Campaign
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-headline">
            {{ campaign?.title }}
          </h1>
          <p v-if="campaign?.category" class="text-white/70 text-sm mt-3 uppercase tracking-widest font-semibold">
            {{ campaign.category.name }}
          </p>
        </div>
      </template>
    </section>

    <!-- ═══════════ Main Layout Grid ═══════════ -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

      <!-- ── Left: Main Content ── -->
      <div class="lg:col-span-8 space-y-16">

        <!-- Skeleton for metrics -->
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="'m-skel-'+n" class="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
            <Skeleton width="2rem" height="2rem" class="mb-4" />
            <Skeleton width="60%" height="2rem" class="mb-2" />
            <Skeleton width="80%" height="1rem" />
          </div>
        </div>

        <!-- The Story -->
        <article class="space-y-6" v-if="!isLoading && campaign">
          <h2 class="text-3xl font-bold tracking-tight text-brand-dark font-headline">The Story</h2>
          <div class="space-y-4 text-lg text-brand-gray leading-relaxed whitespace-pre-line break-all">
            {{ campaign.description }}
          </div>
        </article>

        <!-- Story skeleton -->
        <div v-if="isLoading" class="space-y-6">
          <Skeleton width="30%" height="2rem" />
          <div class="space-y-4">
            <Skeleton width="100%" height="1.5rem" v-for="n in 6" :key="'s-skel-'+n" />
          </div>
        </div>

        <!-- Story skeleton -->
        <div v-if="isLoading" class="space-y-6">
          <Skeleton width="30%" height="2rem" />
          <div class="space-y-4">
            <Skeleton width="100%" height="1.5rem" v-for="n in 6" :key="'s-skel-'+n" />
          </div>
        </div>

        <!-- Verified Files -->
        <section
          v-if="!isLoading && (campaign?.legalProofUrl || campaign?.financialAuditUrl)"
          class="space-y-8 bg-surface-container-low p-8 md:p-10 rounded-2xl"
        >
          <div class="flex justify-between items-end">
            <div>
              <h2 class="text-2xl font-bold text-brand-dark font-headline">Verified Files</h2>
              <p class="text-brand-gray text-sm mt-1">Open-source documentation and financial audits.</p>
            </div>
            <i class="pi pi-shield text-brand-green text-xl"></i>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              v-if="campaign.legalProofUrl"
              :href="campaign.legalProofUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 bg-surface-container-lowest rounded-xl border border-surface-container-high hover:border-brand-green/30 transition-all cursor-pointer group"
            >
              <i class="pi pi-file-pdf text-3xl text-red-400 mr-4"></i>
              <div class="flex-grow">
                <p class="font-bold text-brand-dark">Legal Proof Document</p>
                <p class="text-xs text-brand-gray">PDF • Verified Document</p>
              </div>
              <i class="pi pi-download opacity-0 group-hover:opacity-100 transition-opacity text-brand-gray"></i>
            </a>
            <a
              v-if="campaign.financialAuditUrl"
              :href="campaign.financialAuditUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 bg-surface-container-lowest rounded-xl border border-surface-container-high hover:border-brand-green/30 transition-all cursor-pointer group"
            >
              <i class="pi pi-chart-bar text-3xl text-brand-green mr-4"></i>
              <div class="flex-grow">
                <p class="font-bold text-brand-dark">Financial Audit</p>
                <p class="text-xs text-brand-gray">PDF • Transparent Ledger</p>
              </div>
              <i class="pi pi-download opacity-0 group-hover:opacity-100 transition-opacity text-brand-gray"></i>
            </a>
          </div>
        </section>

        <!-- Project Momentum (Gallery) -->
        <section v-if="!isLoading && galleryImages.length > 0" class="space-y-6">
          <h2 class="text-2xl font-bold text-brand-dark font-headline">Project Gallery</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="(img, i) in galleryImages"
              :key="'gal-' + i"
              class="aspect-square rounded-2xl overflow-hidden bg-surface-container-high group"
            >
              <Image
                :src="img.url"
                :alt="campaign?.title + ' gallery ' + (i + 1)"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                preview
                :pt="{
                  image: {
                    class: 'object-cover'
                  }
                }"
              />
            </div>
          </div>
        </section>

        <!-- Milestones -->
        <section v-if="!isLoading && campaign?.milestones?.length" class="space-y-6">
          <h2 class="text-2xl font-bold text-brand-dark font-headline">Funding Milestones</h2>
          <div class="space-y-4">
            <div
              v-for="(ms, i) in campaign.milestones"
              :key="ms.id"
              class="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-xl border border-surface-container-high"
            >
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                :class="isMilestoneReached(ms) ? 'bg-brand-green text-white' : 'bg-surface-container-high text-brand-gray'"
              >
                {{ i + 1 }}
              </div>
              <div class="flex-1">
                <p class="font-bold text-brand-dark">{{ ms.title }}</p>
                <p class="text-xs text-brand-gray">{{ getCurrencySymbol(campaign.currency) }}{{ formatAmount(ms.amount) }}</p>
              </div>
              <i v-if="isMilestoneReached(ms)" class="pi pi-check-circle text-brand-green text-xl"></i>
            </div>
          </div>
        </section>

        <!-- Wall of Kindness -->
        <section v-if="!isLoading && donations.length > 0" class="space-y-8 pb-12">
          <h2 class="text-2xl font-bold text-brand-dark font-headline">Wall of Kindness</h2>
          <div class="space-y-4">
            <div
              v-for="donation in donations"
              :key="donation.id"
              class="flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl border border-surface-container-high hover:border-brand-green/30 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                     :class="donation.donorName === 'Anonymous' ? 'bg-surface-container-high text-brand-gray' : 'bg-brand-lightGreen text-brand-green'">
                  <i v-if="donation.donorName === 'Anonymous'" class="pi pi-user"></i>
                  <span v-else>{{ donation.donorName.substring(0, 2).toUpperCase() }}</span>
                </div>
                <div>
                  <p class="font-bold text-brand-dark">{{ donation.donorName }}</p>
                  <p class="text-sm text-brand-gray">{{ timeAgo(donation.createdAt) }}</p>
                </div>
              </div>
              <span class="text-lg font-bold text-brand-green">{{ getCurrencySymbol(donation.currency) }}{{ formatAmount(donation.amount / 100) }}</span>
            </div>

            <button
              v-if="hasMore"
              @click="handleLoadMoreDonations"
              :disabled="isLoadingDonations"
              class="w-full py-4 rounded-xl text-brand-dark font-bold border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
            >
              <i v-if="isLoadingDonations" class="pi pi-spin pi-spinner"></i>
              <span v-else>Load More</span>
            </button>
          </div>
        </section>
      </div>

      <!-- ── Right: Sticky Sidebar ── -->
      <aside class="lg:col-span-4">
        <div class="sticky top-28 space-y-6">

          <!-- Donation Widget -->
          <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container-high">
            <template v-if="isLoading">
              <Skeleton width="60%" height="2.5rem" class="mb-2" />
              <Skeleton width="40%" height="1rem" class="mb-6" />
              <Skeleton width="100%" height="0.75rem" class="mb-8" />
              <Skeleton width="100%" height="3.5rem" class="mb-4 rounded-full" />
              <Skeleton width="100%" height="3.5rem" class="rounded-full" />
            </template>
            <template v-else-if="campaign">
              <div class="flex justify-between items-baseline mb-6">
                <h2 class="text-4xl font-extrabold text-brand-dark font-headline">
                  {{ getCurrencySymbol(campaign.currency) }}{{ formatAmount(totalCollected) }}
                </h2>
                <span class="text-brand-gray text-sm">
                  of {{ getCurrencySymbol(campaign.currency) }}{{ formatAmount(campaign.goalAmount) }} goal
                </span>
              </div>

              <!-- Progress Bar -->
              <ProgressBar :value="progressPercent" :showValue="false" class="h-3 mb-2" />
              <div class="flex justify-between items-center mb-8">
                <span class="text-brand-green font-bold text-sm">{{ progressPercent }}% Funded</span>
                <div class="flex items-center gap-1 text-sm font-bold" :class="daysLeftValue <= 3 ? 'text-red-500' : 'text-brand-gray'">
                  <i class="pi pi-clock !text-xs"></i>
                  {{ daysLeftText }}
                </div>
              </div>

              <!-- Donation Amount Input -->
              <div class="mb-4">
                <label class="text-xs font-bold text-brand-gray uppercase tracking-wider block mb-2">Donation Amount</label>
                <div class="flex gap-2 mb-3">
                  <button
                    v-for="preset in presetAmounts"
                    :key="preset"
                    @click="donationAmount = preset"
                    :class="[
                      'flex-1 py-2 rounded-full text-sm font-bold transition-colors',
                      donationAmount === preset
                        ? 'bg-brand-green text-white'
                        : 'bg-surface-container-low text-brand-dark hover:bg-surface-container-high'
                    ]"
                  >
                    {{ getCurrencySymbol(campaign.currency) }}{{ preset }}
                  </button>
                </div>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-bold">{{ getCurrencySymbol(campaign.currency) }}</span>
                  <input
                    v-model.number="donationAmount"
                    type="number"
                    min="1"
                    class="w-full pl-8 pr-4 py-3 bg-surface-container-low rounded-xl border border-surface-container-high text-brand-dark font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                  />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3">
                <!-- Stripe Donate -->
                <button
                  @click="handleStripeDonate"
                  :disabled="isDonating || donationAmount < 1"
                  class="w-full bg-gradient-to-r from-[#006c49] to-[#10b981] text-white py-4 rounded-full text-lg font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <i v-if="isDonating" class="pi pi-spin pi-spinner"></i>
                  <template v-else>
                    <i class="pi pi-credit-card"></i>
                    Donate Now
                  </template>
                </button>

                <!-- Monobank (if available) -->
                <a
                  v-if="campaign.monoJarUrl"
                  :href="campaign.monoJarUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full bg-black text-white py-4 rounded-full text-lg font-bold flex items-center justify-center gap-3 hover:bg-gray-900 active:scale-[0.98] transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="white"/>
                    <path d="M6 8h12v2H6V8zm0 3h12v2H6v-2zm0 3h8v2H6v-2z" fill="black"/>
                  </svg>
                  Monobank Jar
                </a>

                <!-- Share -->
                <button
                  @click="handleShare"
                  class="w-full bg-surface-container-high text-brand-dark py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all active:scale-[0.98]"
                >
                  <i class="pi pi-share-alt"></i>
                  Share Campaign
                </button>
              </div>
            </template>
          </div>
        </div>
      </aside>
    </div>

    <!-- Stripe Donation Dialog -->
    <Dialog
      v-model:visible="isStripeDialogOpen"
      modal
      header="Complete Your Donation"
      :style="{ width: '500px' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @hide="cleanupStripe"
    >
      <div class="space-y-6 pt-4">
        <!-- Amount Input inside Dialog -->
        <div class="mb-4">
          <label class="text-xs font-bold text-brand-gray uppercase tracking-wider block mb-2">Donation Amount</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-bold">{{ getCurrencySymbol(campaign.currency) }}</span>
            <input
              v-model.number="donationAmount"
              type="number"
              min="1"
              class="w-full pl-8 pr-4 py-3 bg-surface-container-low rounded-xl border border-surface-container-high text-brand-dark font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              @change="initStripe"
            />
          </div>
        </div>

        <!-- Stripe Payment Element -->
        <div class="min-h-[250px] relative">
          <div id="payment-element"></div>
          
          <div v-if="isInitializingStripe" class="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-sm rounded-xl z-10">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" fill="transparent" animationDuration=".5s" />
            <p class="text-sm text-brand-gray mt-4">Setting up secure payment...</p>
          </div>
        </div>

        <div class="pt-4">
          <button
            @click="handleConfirmPayment"
            :disabled="isProcessingPayment || isInitializingStripe || !stripeElements"
            class="w-full bg-brand-green text-white py-4 rounded-full text-lg font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <i v-if="isProcessingPayment" class="pi pi-spin pi-spinner"></i>
            <template v-else>
              <i class="pi pi-shield"></i>
              Confirm Payment ({{ getCurrencySymbol(campaign.currency) }}{{ donationAmount }})
            </template>
          </button>
          <p class="text-center text-xs text-brand-gray mt-4">
            <i class="pi pi-lock !text-[10px]"></i> Secure encrypted payment via Stripe
          </p>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/axios';
import { loadStripe, type StripeElements, type StripePaymentElement } from '@stripe/stripe-js';

// PrimeVue
import ProgressBar from 'primevue/progressbar';
import Skeleton from 'primevue/skeleton';
import { Image } from 'primevue';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

// Initialize Stripe outside component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ── Types ──────────────────────────────────────────────────
interface CampaignImage { url: string; type: string }
interface Milestone { id: string; title: string; amount: string; sortOrder: number }
interface Category { id: string; name: string }
interface Campaign {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  goalAmount: string;
  collectedInternal: string;
  currency: string;
  images: CampaignImage[] | null;
  legalProofUrl: string | null;
  financialAuditUrl: string | null;
  monoJarUrl: string | null;
  status: string;
  endDate: string | null;
  createdAt: string;
  milestones?: Milestone[];
  category?: Category;
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  createdAt: string;
}

// ── State ──────────────────────────────────────────────────
const route = useRoute();
const toast = useToast();
const campaign = ref<Campaign | null>(null);
const isLoading = ref(true);
const totalCollected = ref<number>(0);

const donations = ref<Donation[]>([]);
const currentPage = ref(1);
const hasMore = ref(false);
const isLoadingDonations = ref(false);

// Payment State
const isDonating = ref(false); // Used for the initial "Donate Now" button
const isStripeDialogOpen = ref(false);
const isInitializingStripe = ref(false);
const isProcessingPayment = ref(false);
const donationAmount = ref(10); // Default to 10 as per requirements

// Stripe State
const stripeElements = ref<StripeElements | null>(null);
const stripePaymentElement = ref<StripePaymentElement | null>(null);
const clientSecret = ref('');

const presetAmounts = [10, 25, 50, 100];

const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22600%22%20fill%3D%22%23eef4fc%22%3E%3Crect%20width%3D%221200%22%20height%3D%22600%22%2F%3E%3C%2Fsvg%3E';

// ── Computed ───────────────────────────────────────────────
const coverImage = computed(() => {
  if (!campaign.value?.images) return '';
  const cover = campaign.value.images.find(img => img.type === 'cover');
  return cover?.url || '';
});

const galleryImages = computed(() => {
  if (!campaign.value?.images) return [];
  return campaign.value.images.filter(img => img.type === 'gallery');
});

const progressPercent = computed(() => {
  if (!campaign.value) return 0;
  const collected = totalCollected.value;
  const goal = parseFloat(campaign.value.goalAmount || '1');
  return Math.min(100, Math.round((collected / goal) * 100));
});

const daysLeftValue = computed(() => {
  if (!campaign.value?.endDate) return -1;
  const end = new Date(campaign.value.endDate);
  const now = new Date();
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
});

const daysLeftText = computed(() => {
  if (daysLeftValue.value === -1) return 'Ongoing';
  if (daysLeftValue.value <= 0) return 'Ended';
  return `${daysLeftValue.value} Days Left`;
});

// ── Helpers ────────────────────────────────────────────────
const currencyMap: Record<string, string> = { USD: '$', EUR: '€', UAH: '₴', ETH: 'Ξ', BTC: '₿' };

function getCurrencySymbol(currency: string | undefined): string {
  if (!currency) return '$';
  return currencyMap[currency.toUpperCase()] || currency || '$';
}

function formatAmount(val: string | number): string {
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (!n || isNaN(n)) return '0';
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function isMilestoneReached(ms: Milestone): boolean {
  if (!campaign.value) return false;
  return totalCollected.value >= parseFloat(ms.amount);
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

// ── API ────────────────────────────────────────────────────
async function fetchCampaign() {
  isLoading.value = true;
  try {
    const id = route.params.id as string;
    const { data } = await api.get(`/campaigns/${id}`);
    campaign.value = data;
    totalCollected.value = parseFloat(data.collectedInternal || '0');
  } catch (err) {
    console.error('Failed to fetch campaign:', err);
  } finally {
    isLoading.value = false;
  }
}

async function fetchDonations(loadMore = false) {
  if (!campaign.value) return;
  isLoadingDonations.value = true;
  try {
    const limit = 5;
    const offset = (currentPage.value - 1) * limit;
    const { data } = await api.get(`/campaigns/${campaign.value.id}/donations`, {
      params: { limit, offset }
    });
    
    if (loadMore) {
      donations.value = [...donations.value, ...data.donations];
    } else {
      donations.value = data.donations;
    }
    hasMore.value = data.hasMore;
  } catch (err) {
    console.error('Failed to fetch donations:', err);
  } finally {
    isLoadingDonations.value = false;
  }
}

function handleLoadMoreDonations() {
  currentPage.value++;
  fetchDonations(true);
}

async function handleStripeDonate() {
  if (!campaign.value || isDonating.value || donationAmount.value < 1) return;
  
  isStripeDialogOpen.value = true;
  await initStripe();
}

async function initStripe() {
  if (!campaign.value || donationAmount.value < 1) return;
  
  isInitializingStripe.value = true;
  try {
    // 1. Create payment intent
    const { data } = await api.post('/payments/create-intent', {
      campaignId: campaign.value.id,
      amount: donationAmount.value, // raw amount, backend handles cents
      currency: campaign.value.currency?.toLowerCase() || 'usd',
    });

    clientSecret.value = data.clientSecret;

    // 2. Initialize Stripe Elements
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    // Clean up existing elements if any
    if (stripePaymentElement.value) {
      stripePaymentElement.value.unmount();
    }

    stripeElements.value = stripe.elements({
      clientSecret: clientSecret.value,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#10b981',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          borderRadius: '12px',
        },
      },
    });

    // 3. Create and mount Payment Element
    stripePaymentElement.value = stripeElements.value.create('payment');
    
    // Ensure the DOM element is available
    await nextTick();
    const el = document.getElementById('payment-element');
    if (el) {
      stripePaymentElement.value.mount('#payment-element');
    }
  } catch (err: any) {
    console.error('Failed to initialize Stripe:', err);
    toast.add({
      severity: 'error',
      summary: 'Payment Error',
      detail: err?.response?.data?.message || 'Could not initialize payment system.',
      life: 5000
    });
  } finally {
    isInitializingStripe.value = false;
  }
}

async function handleConfirmPayment() {
  if (!stripeElements.value || isProcessingPayment.value) return;

  isProcessingPayment.value = true;
  const stripe = await stripePromise;

  try {
    const { error } = await stripe!.confirmPayment({
      elements: stripeElements.value,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Payment Failed',
        detail: error.message,
        life: 5000
      });
    }
    // If successful, Stripe redirects to return_url
  } catch (err: any) {
    console.error('Payment confirmation error:', err);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unexpected error occurred during payment.',
      life: 5000
    });
  } finally {
    isProcessingPayment.value = false;
  }
}

function cleanupStripe() {
  if (stripePaymentElement.value) {
    stripePaymentElement.value.unmount();
    stripePaymentElement.value = null;
  }
  stripeElements.value = null;
  clientSecret.value = '';
}

function handleShare() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: campaign.value?.title, url });
  } else {
    navigator.clipboard.writeText(url);
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Link copied to clipboard!',
      life: 2000
    })
  }
}

async function getDataFromMonobankJar() {
  if(!campaign.value?.monoJarUrl) return;

  const jarId = campaign.value.monoJarUrl.split('/').pop();
  if(!jarId) return;

  try {
    const response = await api.get(`/payments/mono-status/${jarId}`);
    const { jarAmount, currency, rate } = response.data;
    
    const amount = Number(jarAmount) / 100;
    
    let mappedCurrency = '';
    if (currency == 980) mappedCurrency = 'UAH';
    else if (currency == 840) mappedCurrency = 'USD';
    else if (currency == 978) mappedCurrency = 'EUR';

    let convertedJar = amount;
    const campaignCurrency = campaign.value.currency?.toUpperCase() || 'USD';

    if (mappedCurrency && mappedCurrency !== campaignCurrency && rate) {
      if (mappedCurrency === 'UAH' && campaignCurrency === 'USD') {
        convertedJar = amount / rate.usd.sale;
      } else if (mappedCurrency === 'USD' && campaignCurrency === 'UAH') {
        convertedJar = amount * rate.usd.buy;
      } else if (mappedCurrency === 'UAH' && campaignCurrency === 'EUR') {
        convertedJar = amount / rate.eur.sale;
      } else if (mappedCurrency === 'EUR' && campaignCurrency === 'UAH') {
        convertedJar = amount * rate.eur.buy;
      } else if (mappedCurrency === 'USD' && campaignCurrency === 'EUR') {
        convertedJar = (amount * rate.usd.buy) / rate.eur.sale;
      } else if (mappedCurrency === 'EUR' && campaignCurrency === 'USD') {
        convertedJar = (amount * rate.eur.buy) / rate.usd.sale;
      }
    }

    totalCollected.value = Number(campaign.value.collectedInternal || '0') + convertedJar;
  } catch (error) {
    console.error('Failed to get Monobank jar data:', error);
  }
}

watch(totalCollected, async (newTotal) => {
  if (!campaign.value) return;
  const goal = parseFloat(campaign.value.goalAmount || '0');
  if (newTotal >= goal && campaign.value.status !== 'completed') {
    try {
      await api.post(`/campaigns/${campaign.value.id}/complete`);
      campaign.value.status = 'completed';
    } catch (err) {
      console.error('Failed to complete campaign:', err);
    }
  }
});

// ── Lifecycle ──────────────────────────────────────────────
onMounted(async () => {
  await fetchCampaign();
  await getDataFromMonobankJar();
  if (campaign.value) {
    await fetchDonations();
  }
});
</script>

<style scoped>
:deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #047857, #10b981) !important;
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
