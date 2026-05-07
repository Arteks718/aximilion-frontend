<template>
  <div>
    <!-- Page Header -->
    <header class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-headline text-brand-dark">
        Initialize Your Impact
      </h1>
      <p class="text-brand-gray text-lg max-w-2xl leading-relaxed">
        Bring your vision to life. Define your purpose, secure your narrative, and tap into
        the Aximilion ecosystem of global liquidity.
      </p>
    </header>

    <form class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12" @submit.prevent="onSubmit">

      <!-- Basic Identity -->
      <section class="bg-surface-container-low rounded-2xl p-8 md:p-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-widest font-bold text-brand-gray">Campaign Name</label>
            <input v-model="title" type="text"
              class="w-full bg-surface-container-lowest rounded-full px-6 py-4 text-brand-dark placeholder:text-brand-gray/50 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-colors"
              placeholder="Enter a compelling title..." />
            <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-widest font-bold text-brand-gray">Category</label>
            <select v-model="categoryId"
              class="w-full bg-surface-container-lowest rounded-full px-6 py-4 text-brand-dark appearance-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-colors">
              <option value="" disabled>Select a category...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <p v-if="errors.categoryId" class="text-red-500 text-xs mt-1">{{ errors.categoryId }}</p>
          </div>
        </div>
      </section>

      <!-- Narrative & Impact -->
      <section class="space-y-8">
        <div class="flex items-center gap-3">
          <i class="pi pi-briefcase !text-primary !text-lg"></i>
          <h2 class="text-xl font-bold tracking-tight font-headline text-brand-dark">Narrative &amp; Impact</h2>
        </div>
        <div class="space-y-6">
          <div class="bg-surface-container-low rounded-2xl overflow-hidden">
            <textarea v-model="description"
              class="w-full bg-transparent p-6 text-brand-dark placeholder:text-brand-gray/50 resize-none focus:outline-none focus:ring-0"
              placeholder="Tell your story... What drives this change?" rows="6"></textarea>
          </div>
          <p v-if="errors.description" class="text-red-500 text-xs -mt-4">{{ errors.description }}</p>
        </div>
      </section>

      <!-- Visual Assets -->
      <section class="space-y-6">
        <div class="flex items-center gap-3">
          <i class="pi pi-image !text-primary text-lg"></i>
          <h2 class="text-xl font-bold tracking-tight font-headline text-brand-dark">Visual Assets</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Primary Cover Image -->
          <label
            class="lg:col-span-2 aspect-video bg-surface-container-low rounded-2xl flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden transition-all hover:shadow-[0_8px_40px_rgba(22,28,34,0.06)]">
            <input type="file" accept="image/*" class="hidden" @change="onCoverImageChange" />
            <div class="relative z-10 flex flex-col items-center">
              <i
                class="pi pi-camera text-4xl text-brand-gray/40 group-hover:text-primary mb-2 transition-colors"></i>
              <p class="font-bold text-brand-dark text-sm">
                {{ uploadedFiles.coverImage || 'Primary Cover Image' }}
              </p>
              <p class="text-xs text-brand-gray">Recommended: 1920×1080px (Max 5MB)</p>
            </div>
          </label>
          <!-- Additional image slots -->
          <div class="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <label
              class="aspect-square bg-surface-container-low rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-[0_8px_40px_rgba(22,28,34,0.06)] transition-all group">
              <input type="file" accept="image/*" class="hidden" @change="(e) => onExtraImageChange(e, 0)" />
              <i v-if="!uploadedFiles.extraImages[0]"
                class="pi pi-plus text-brand-gray/40 group-hover:text-primary transition-colors"></i>
              <span v-else class="text-xs text-brand-dark font-medium text-center px-2 truncate">{{
                uploadedFiles.extraImages[0] }}</span>
            </label>
            <label
              class="aspect-square bg-surface-container-low rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-[0_8px_40px_rgba(22,28,34,0.06)] transition-all group">
              <input type="file" accept="image/*" class="hidden" @change="(e) => onExtraImageChange(e, 1)" />
              <i v-if="!uploadedFiles.extraImages[1]"
                class="pi pi-plus text-brand-gray/40 group-hover:text-primary transition-colors"></i>
              <span v-else class="text-xs text-brand-dark font-medium text-center px-2 truncate">{{
                uploadedFiles.extraImages[1] }}</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Transparency Vault -->
      <section
        class="bg-surface-container-lowest rounded-2xl p-8 space-y-6 relative overflow-hidden shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
        <div class="absolute top-0 right-0 p-4">
          <div
            class="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-tight">
            <i class="pi pi-shield !text-xs"></i>
            Vault Verified
          </div>
        </div>
        <div>
          <h2 class="text-xl font-bold tracking-tight mb-2 font-headline text-brand-dark">The Transparency Vault</h2>
          <p class="text-sm text-brand-gray">Uploaded documents are cryptographically hashed to ensure trust and
            compliance.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label
            class="flex items-center justify-between p-4 bg-surface-container-low rounded-full cursor-pointer group hover:shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all">
            <div class="flex items-center gap-4">
              <i class="pi pi-hammer text-primary"></i>
              <span class="text-sm font-medium text-brand-dark">
                {{ uploadedFiles.legalProof || 'Legal Proof (PDF)' }}
              </span>
            </div>
            <i class="pi pi-upload text-brand-gray/40 group-hover:text-primary transition-colors"></i>
            <input type="file" accept=".pdf" class="hidden" @change="onLegalProofChange" />
          </label>
          <label
            class="flex items-center justify-between p-4 bg-surface-container-low rounded-full cursor-pointer group hover:shadow-[0_4px_24px_rgba(22,28,34,0.04)] transition-all">
            <div class="flex items-center gap-4">
              <i class="pi pi-warehouse text-primary"></i>
              <span class="text-sm font-medium text-brand-dark">
                {{ uploadedFiles.financialAudit || 'Financial Audit' }}
              </span>
            </div>
            <i class="pi pi-upload text-brand-gray/40 group-hover:text-primary transition-colors"></i>
            <input type="file" accept=".pdf,.csv,.xlsx" class="hidden" @change="onFinancialAuditChange" />
          </label>
        </div>
      </section>

      <!-- Capital Target & Fee Breakdown -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <i class="pi pi-coin text-primary text-lg"></i>
            <h2 class="text-xl font-bold tracking-tight font-headline text-brand-dark">Capital Target</h2>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="w-1/3">
                <label class="text-xs uppercase tracking-widest font-bold text-brand-gray block mb-2">Currency</label>
                <select v-model="currency"
                  class="w-full bg-surface-container-low rounded-full px-6 py-4 text-brand-dark font-bold focus:outline-none focus:ring-0">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="UAH">UAH</option>
                </select>
              </div>
              <div class="w-2/3">
                <label class="text-xs uppercase tracking-widest font-bold text-brand-gray block mb-2">Amount</label>
                <div class="relative">
                  <span
                    class="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gray font-extrabold text-xl pointer-events-none">{{
                    currencySymbol }}</span>
                  <input v-model.number="goalAmount" type="number" min="1"
                    class="w-full bg-surface-container-low rounded-full pl-12 pr-6 py-4 text-brand-dark font-extrabold text-xl focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-colors"
                    placeholder="50,000" />
                </div>
              </div>
            </div>
            <p v-if="errors.goalAmount" class="text-red-500 text-xs">{{ errors.goalAmount }}</p>
            <!-- Monobank Jar URL -->
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-widest font-bold text-brand-gray">Monobank Jar URL
                (optional)</label>
              <input v-model="monoJarUrl" type="url"
                class="w-full bg-surface-container-lowest rounded-full px-6 py-4 text-brand-dark placeholder:text-brand-gray/50 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-colors"
                placeholder="https://send.monobank.ua/jar/..." />
            </div>
          </div>
        </div>

        <!-- Fee Breakdown -->
        <div class="bg-surface-container-low rounded-2xl p-6 space-y-4">
          <h3 class="text-xs uppercase tracking-widest font-extrabold text-brand-gray">Fee Breakdown</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm">
              <span class="text-brand-gray">Platform Fee (3%)</span>
              <span class="font-medium text-brand-dark">{{ currencySymbol }}{{ platformFee }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-brand-gray">Verification Cost</span>
              <span class="font-medium text-brand-dark">{{ currencySymbol }}150.00</span>
            </div>
            <div class="h-px bg-brand-gray/10"></div>
            <div class="flex justify-between items-center font-bold">
              <span class="text-brand-dark">Total Expected Net</span>
              <span class="text-primary">{{ currencySymbol }}{{ totalExpectedNet }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Funding Milestones -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="pi pi-list text-primary text-lg"></i>
            <h2 class="text-xl font-bold tracking-tight font-headline text-brand-dark">Funding Milestones</h2>
          </div>
          <button type="button"
            class="text-primary text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
            @click="addMilestone">
            <i class="pi pi-plus-circle !text-sm"></i>
            Add Milestone
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="(milestone, index) in milestones" :key="index"
            class="bg-surface-container-low p-6 rounded-2xl flex items-start gap-6"
            :style="{ borderLeft: '4px solid #006c49' }">
            <div
              class="h-10 w-10 shrink-0 bg-primary text-white rounded-full flex items-center justify-center font-extrabold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="milestone.title" type="text"
                class="bg-transparent font-bold text-brand-dark p-0 focus:outline-none focus:ring-0 placeholder:text-brand-gray/40"
                :placeholder="'Phase ' + (index + 1) + ': Description'" />
              <div class="flex items-center justify-end gap-2">
                <span class="text-xs font-bold text-brand-gray uppercase">Requirement:</span>
                <input v-model.number="milestone.amount" type="number" min="0"
                  class="font-extrabold text-primary bg-transparent w-28 text-right p-0 focus:outline-none focus:ring-0 placeholder:text-brand-gray/40"
                  placeholder="0" />
                <span class="text-sm font-bold text-brand-gray uppercase">{{ currencySymbol }}</span>
              </div>
            </div>
            <button type="button" class="text-brand-gray/40 hover:text-red-500 transition-colors"
              @click="removeMilestone(index)">
              <i class="pi pi-trash !text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Actions Footer -->
      <footer class="pt-12 flex flex-col md:flex-row gap-4 items-center justify-end">
        <button type="submit" :disabled="isSubmitting"
          class="w-full md:w-auto px-12 py-4 rounded-full bg-primary text-white font-extrabold text-lg shadow-[0_8px_40px_rgba(0,108,73,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isSubmitting ? 'Launching...' : 'Launch Campaign' }}
        </button>
      </footer>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import api from '../api/axios';

const router = useRouter();

// --- Categories ---
const categories = ref<{ id: string; name: string }[]>([]);

onMounted(async () => {
  try {
    const response = await api.get('/categories');
    categories.value = response.data;
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
});

// --- Validation Schema ---
const validationSchema = yup.object({
  title: yup.string().required('Campaign name is required'),
  categoryId: yup.string().required('Category is required'),
  description: yup.string().required('Description is required').min(100, 'Description must be at least 100 characters'),
  goalAmount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Goal amount is required')
    .positive('Amount must be a positive number'),
});

const { handleSubmit, errors } = useForm({ validationSchema });
const { value: title } = useField<string>('title');
const { value: categoryId } = useField<string>('categoryId');
const { value: description } = useField<string>('description');
const { value: goalAmount } = useField<number>('goalAmount');

// --- Non-validated fields ---
const monoJarUrl = ref('');
const currency = ref('USD');
const isSubmitting = ref(false);

// --- Currency Symbol ---
import { getCurrencySymbol } from '../helpers';

const currencySymbol = computed(() => getCurrencySymbol(currency.value));

// --- Milestones ---
const milestones = reactive<{ title: string; amount: number | null }[]>([
  { title: '', amount: null },
]);

const addMilestone = () => {
  milestones.push({ title: '', amount: null });
};

const removeMilestone = (index: number) => {
  if (milestones.length > 1) {
    milestones.splice(index, 1);
  }
};

// --- Fee Breakdown ---
const PLATFORM_FEE_RATE = 0.03;
const VERIFICATION_COST = 150;

const platformFee = computed(() => {
  const amount = goalAmount.value || 0;
  return (amount * PLATFORM_FEE_RATE).toFixed(2);
});

const totalExpectedNet = computed(() => {
  const amount = goalAmount.value || 0;
  const net = amount - amount * PLATFORM_FEE_RATE - VERIFICATION_COST;
  return Math.max(0, net).toFixed(2);
});

// --- Supabase Storage Upload Utility ---
import { supabase } from '../lib/supabase';

const BUCKET = 'campaign-assets';

async function uploadToSupabase(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const uniqueName = `${folder}/${Date.now()}_${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(uniqueName, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(uniqueName);
  return data.publicUrl;
}

// --- Media State ---
const images = reactive<{ url: string; type: 'cover' | 'gallery' }[]>([]);
const legalProofUrl = ref('');
const financialAuditUrl = ref('');

// UI display labels
const uploadedFiles = reactive({
  coverImage: '',
  extraImages: ['', ''] as string[],
  legalProof: '',
  financialAudit: '',
});

// --- Upload Handlers ---
const onCoverImageChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadedFiles.coverImage = `Uploading ${file.name}…`;
  try {
    const url = await uploadToSupabase(file, 'covers');
    // Replace any existing cover entry
    const idx = images.findIndex((i) => i.type === 'cover');
    if (idx !== -1) images.splice(idx, 1);
    images.push({ url, type: 'cover' });
    uploadedFiles.coverImage = file.name;
  } catch (err: any) {
    console.error(err);
    uploadedFiles.coverImage = 'Upload failed — try again';
  }
};

const onExtraImageChange = async (e: Event, slotIndex: number) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadedFiles.extraImages[slotIndex] = 'Uploading…';
  try {
    const url = await uploadToSupabase(file, 'gallery');
    // Replace the gallery entry for this slot if it already exists
    const galleryEntries = images.filter((i) => i.type === 'gallery');
    if (galleryEntries[slotIndex]) {
      const realIdx = images.indexOf(galleryEntries[slotIndex]);
      images.splice(realIdx, 1);
    }
    images.push({ url, type: 'gallery' });
    uploadedFiles.extraImages[slotIndex] = file.name;
  } catch (err: any) {
    console.error(err);
    uploadedFiles.extraImages[slotIndex] = 'Upload failed';
  }
};

const onLegalProofChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadedFiles.legalProof = `Uploading ${file.name}…`;
  try {
    legalProofUrl.value = await uploadToSupabase(file, 'documents');
    uploadedFiles.legalProof = file.name;
  } catch (err: any) {
    console.error(err);
    uploadedFiles.legalProof = 'Upload failed — try again';
  }
};

const onFinancialAuditChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadedFiles.financialAudit = `Uploading ${file.name}…`;
  try {
    financialAuditUrl.value = await uploadToSupabase(file, 'documents');
    uploadedFiles.financialAudit = file.name;
  } catch (err: any) {
    console.error(err);
    uploadedFiles.financialAudit = 'Upload failed — try again';
  }
};

// --- Submit ---
const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    await api.post('/campaigns', {
      title: values.title,
      categoryId: values.categoryId,
      description: values.description,
      goalAmount: values.goalAmount,
      currency: currency.value,
      monoJarUrl: monoJarUrl.value || undefined,
      images: images.length > 0 ? [...images] : undefined,
      legalProofUrl: legalProofUrl.value || undefined,
      financialAuditUrl: financialAuditUrl.value || undefined,
      milestones: milestones
        .filter((m) => m.title.trim())
        .map((m) => ({ title: m.title, amount: m.amount })),
    });
    router.push({name: 'my-campaigns'});
  } catch (err: any) {
    console.error('Failed to create campaign:', err);
    alert(err?.response?.data?.message || 'Failed to create campaign. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
});
</script>
