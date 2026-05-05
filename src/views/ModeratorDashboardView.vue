<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans w-full">
    <header class="mb-12">
      <h1 class="text-4xl font-extrabold text-brand-dark font-headline mb-2">Moderator Dashboard</h1>
      <p class="text-brand-gray">Manage campaigns, verify documents, and issue badges.</p>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Main Content: Pending Campaigns -->
      <div class="xl:col-span-2 space-y-8">
        <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 class="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
            <i class="pi pi-clock text-[#006C49]"></i> Pending Approvals
          </h2>
          
          <DataTable :value="pendingCampaigns" :loading="isLoading" paginator :rows="5" class="p-datatable-sm w-full" :emptyMessage="'No pending campaigns.'">
            <Column field="title" header="Campaign" class="font-medium text-brand-dark"></Column>
            <Column header="Goal">
              <template #body="slotProps">
                <span class="text-brand-gray">${{ Number(slotProps.data.goalAmount).toLocaleString() }}</span>
              </template>
            </Column>
            <Column header="Actions" alignFrozen="right">
              <template #body="slotProps">
                <div class="flex items-center gap-2">
                  <router-link :to="`/campaigns/${slotProps.data.id}`" target="_blank" class="p-2 text-brand-gray hover:text-brand-dark bg-surface-container-low rounded-lg transition-colors" title="View details">
                    <i class="pi pi-external-link"></i>
                  </router-link>
                  <button @click="updateCampaignStatus(slotProps.data.id, 'active')" :disabled="isUpdating" class="px-3 py-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs rounded-lg transition-colors">
                    Approve
                  </button>
                  <button @click="updateCampaignStatus(slotProps.data.id, 'rejected')" :disabled="isUpdating" class="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-200 font-bold text-xs rounded-lg transition-colors">
                    Reject
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </section>
      </div>

      <!-- Right Sidebar: System Actions -->
      <aside class="space-y-8">
        <section class="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-sm">
          <h2 class="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <i class="pi pi-cog text-[#006C49]"></i> System Actions
          </h2>
          <div class="space-y-4">
            <button @click="isBadgeModalOpen = true" class="w-full bg-[#006C49] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#005236] transition-colors shadow-sm flex justify-center items-center gap-2">
              <i class="pi pi-plus-circle"></i> Create New Badge
            </button>
          </div>
        </section>
      </aside>
    </div>

    <!-- Create Badge Dialog -->
    <Dialog v-model:visible="isBadgeModalOpen" modal header="Create Achievement Badge" :style="{ width: '400px' }" class="p-fluid">
      <form @submit.prevent="createBadge" class="space-y-5 pt-2">
        <div>
          <label class="block text-sm font-semibold text-brand-gray mb-1">Badge Name</label>
          <InputText v-model="name" placeholder="e.g. Early Supporter" class="w-full bg-surface-container-low" :class="{'p-invalid': errors.name}" />
          <small class="text-red-500 mt-1 block" v-if="errors.name">{{ errors.name }}</small>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-brand-gray mb-1">Badge Icon</label>
          <input type="file" @change="onFileChange" accept="image/*" class="w-full text-sm text-brand-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-brand-green hover:file:bg-emerald-100 cursor-pointer" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-brand-gray mb-1">Criteria Type</label>
          <Select v-model="criteria_type" :options="criteriaOptions" optionLabel="label" optionValue="value" placeholder="Select criteria" class="w-full bg-surface-container-low" :class="{'p-invalid': errors.criteria_type}" />
          <small class="text-red-500 mt-1 block" v-if="errors.criteria_type">{{ errors.criteria_type }}</small>
        </div>

        <div>
          <label class="block text-sm font-semibold text-brand-gray mb-1">Criteria Value</label>
          <InputText v-model.number="criteria_value" type="number" placeholder="Target threshold" class="w-full bg-surface-container-low" :class="{'p-invalid': errors.criteria_value}" />
          <small class="text-red-500 mt-1 block" v-if="errors.criteria_value">{{ errors.criteria_value }}</small>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button type="button" @click="isBadgeModalOpen = false" class="px-4 py-2 font-bold text-brand-gray hover:text-brand-dark transition-colors">Cancel</button>
          <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-[#006C49] text-white font-bold rounded-full hover:bg-[#005236] transition-colors disabled:opacity-50">
            <i v-if="isSubmitting" class="pi pi-spin pi-spinner mr-2"></i> Create
          </button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/axios';
import { useToast } from 'primevue/usetoast';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// PrimeVue
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const toast = useToast();
const pendingCampaigns = ref([]);
const isLoading = ref(true);
const isUpdating = ref(false);

const isBadgeModalOpen = ref(false);
const selectedFile = ref<File | null>(null);

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  } else {
    selectedFile.value = null;
  }
}

const criteriaOptions = [
  { label: 'Donation Count', value: 'donations_count' },
  { label: 'Total Amount ($)', value: 'total_amount' },
  { label: 'Unique Campaigns', value: 'unique_campaigns' }
];

// Badge Form Schema
const schema = yup.object({
  name: yup.string().required('Badge name is required'),
  criteria_type: yup.string().required('Select a criteria type'),
  criteria_value: yup.number().positive('Must be positive').required('Value is required')
});

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name } = useField<string>('name');
const { value: criteria_type } = useField<string>('criteria_type');
const { value: criteria_value } = useField<number>('criteria_value');

onMounted(async () => {
  await fetchPendingCampaigns();
});

async function fetchPendingCampaigns() {
  isLoading.value = true;
  try {
    const { data } = await api.get('/moderator/campaigns/pending');
    pendingCampaigns.value = data;
  } catch (error) {
    console.error('Failed to fetch pending campaigns:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load pending campaigns', life: 3000 });
  } finally {
    isLoading.value = false;
  }
}

async function updateCampaignStatus(id: string, status: 'active' | 'rejected') {
  isUpdating.value = true;
  try {
    await api.patch(`/moderator/campaigns/${id}/status`, { status });
    toast.add({ severity: 'success', summary: 'Success', detail: `Campaign ${status === 'active' ? 'approved' : 'rejected'}`, life: 3000 });
    await fetchPendingCampaigns(); // Refresh
  } catch (error) {
    console.error('Failed to update status:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Action failed', life: 3000 });
  } finally {
    isUpdating.value = false;
  }
}

const createBadge = handleSubmit(async (values) => {
  if (!selectedFile.value) {
    toast.add({ severity: 'warn', summary: 'Missing File', detail: 'Please select an icon image.', life: 3000 });
    return;
  }

  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('criteria_type', values.criteria_type);
  formData.append('criteria_value', values.criteria_value.toString());
  formData.append('icon', selectedFile.value);

  try {
    await api.post('/moderator/badges', formData);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Badge created successfully', life: 3000 });
    isBadgeModalOpen.value = false;
    resetForm();
    selectedFile.value = null;
  } catch (error: any) {
    console.error('Failed to create badge:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || 'Failed to create badge', life: 3000 });
  }
});
</script>
