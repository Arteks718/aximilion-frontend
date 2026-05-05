<template>
  <div class="flex-grow flex w-full max-w-7xl mx-auto px-4 md:px-8 py-8 gap-8 font-sans">
    <!-- Sidebar Navigation -->
    <aside class="hidden md:flex flex-col w-64 flex-shrink-0 gap-2">
      <div class="mb-6 px-4">
        <h2 class="font-headline text-2xl font-bold tracking-tight text-brand-dark">Settings</h2>
        <p class="text-sm text-brand-gray mt-1">Manage your account preferences.</p>
      </div>
      <nav class="flex flex-col gap-1">
        <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 bg-white text-brand-green font-bold rounded-lg shadow-sm">
          <i class="pi pi-user"></i>
          <span class="text-md">Profile</span>
        </router-link>
        <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-brand-gray hover:text-brand-green hover:bg-surface-container-low rounded-lg transition-all hover:translate-x-1 duration-300">
          <i class="pi pi-chart-line"></i>
          <span class="text-md">Dashboard</span>
        </router-link>
        <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-brand-gray hover:text-brand-green hover:bg-surface-container-low rounded-lg transition-all hover:translate-x-1 duration-300">
          <i class="pi pi-megaphone"></i>
          <span class="text-md">My campaigns</span>
        </router-link>
      </nav>
    </aside>

    <!-- Right Content Area -->
    <div class="flex-grow flex flex-col gap-8 max-w-3xl">
      <div class="md:hidden mb-4">
        <h1 class="font-headline text-3xl font-bold tracking-tight text-brand-dark">Profile Settings</h1>
      </div>

      <!-- Profile Settings Card -->
      <section class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 class="font-headline text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
          <i class="pi pi-user-edit text-brand-green"></i> Personal Information
        </h2>
        
        <form class="space-y-6" @submit.prevent="saveChanges">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-brand-gray mb-2">Full Name</label>
              <InputText v-model="fullName" class="w-full bg-surface-container-lowest" :class="{'p-invalid': profileErrors.fullName}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="profileErrors.fullName">{{ profileErrors.fullName }}</small>
            </div>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-brand-gray mb-2">Email Address</label>
              <InputText v-model="email" type="email" class="w-full bg-surface-container-lowest" :class="{'p-invalid': profileErrors.email}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="profileErrors.email">{{ profileErrors.email }}</small>
            </div>
            <!-- Date of Birth -->
            <div class="flex flex-col">
              <label class="block text-sm font-medium text-brand-gray mb-2">Date of Birth</label>
              <DatePicker v-model="dob" dateFormat="mm/dd/yy" class="w-full bg-surface-container-lowest" :class="{'p-invalid': profileErrors.dob}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="profileErrors.dob">{{ profileErrors.dob }}</small>
            </div>
            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-brand-gray mb-2">Phone Number</label>
              <InputText v-model="phone" type="tel" placeholder="+1 (555) 000-0000" class="w-full bg-surface-container-lowest" :class="{'p-invalid': profileErrors.phone}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="profileErrors.phone">{{ profileErrors.phone }}</small>
            </div>
            <!-- Gender -->
            <div class="flex flex-col">
              <label class="block text-sm font-medium text-brand-gray mb-2">Gender</label>
              <Select v-model="gender" :options="genderOptions" class="w-full bg-surface-container-lowest" :class="{'p-invalid': profileErrors.gender}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="profileErrors.gender">{{ profileErrors.gender }}</small>
            </div>
          </div>
          <div class="pt-6 flex justify-end">
            <button type="submit" :disabled="!profileMeta.dirty || !profileMeta.valid" class="bg-[#006C49] text-white font-bold px-6 py-3 rounded-full hover:bg-[#005236] transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              Save Changes <i class="pi pi-save"></i>
            </button>
          </div>
          
          <div class="h-px w-full bg-gray-100 my-8"></div>
          
          <h2 class="font-headline text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
            <i class="pi pi-shield text-brand-green"></i> Security Settings
          </h2>
        </form>
         
        <form class="space-y-6" @submit.prevent="updatePassword">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-brand-gray">Current Password</label>
              <Password v-model="currentPassword" toggleMask :feedback="false" class="w-full" inputClass="w-full" :class="{'p-invalid': securityErrors.currentPassword}" />
              <small class="text-xs text-red-500 mt-1 block" v-if="securityErrors.currentPassword">{{ securityErrors.currentPassword }}</small>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-brand-gray">New Password</label>
                <Password v-model="newPassword" toggleMask class="w-full" inputClass="w-full" :class="{'p-invalid': securityErrors.newPassword}" />
                <small class="text-xs text-red-500 mt-1 block" v-if="securityErrors.newPassword">{{ securityErrors.newPassword }}</small>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-brand-gray">Confirm New Password</label>
                <Password v-model="confirmPassword" toggleMask :feedback="false" class="w-full" inputClass="w-full" :class="{'p-invalid': securityErrors.confirmPassword}" />
                <small class="text-xs text-red-500 mt-1 block" v-if="securityErrors.confirmPassword">{{ securityErrors.confirmPassword }}</small>
              </div>
            </div>
          </div>

          <div class="pt-6 flex justify-end">
            <button type="submit" :disabled="!securityMeta.dirty || !securityMeta.valid" class="bg-[#006C49] text-white font-bold px-6 py-3 rounded-full hover:bg-[#005236] transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              Update Password <i class="pi pi-refresh"></i>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'primevue/usetoast';
import api from '../api/axios';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// PrimeVue components
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import Password from 'primevue/password';

const authStore = useAuthStore();
const toast = useToast();

const genderOptions = ['Prefer not to say', 'Female', 'Male', 'Non-binary'];

const profileSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  dob: yup.date().nullable().optional(),
  phone: yup.string().optional(),
  gender: yup.string().optional(),
});

const securitySchema = yup.object({
  currentPassword: yup.string().required('Current Password is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Confirm Password is required'),
});

const { handleSubmit: handleProfileSubmit, meta: profileMeta, setValues: setProfileValues, errors: profileErrors } = useForm({
  validationSchema: profileSchema,
  initialValues: {
    fullName: '',
    email: '',
    dob: null as Date | null,
    phone: '',
    gender: 'Prefer not to say',
  }
});

const { value: fullName } = useField<string>('fullName');
const { value: email } = useField<string>('email');
const { value: dob } = useField<Date | null>('dob');
const { value: phone } = useField<string>('phone');
const { value: gender } = useField<string>('gender');

const { handleSubmit: handleSecuritySubmit, meta: securityMeta, resetForm: resetSecurityForm, errors: securityErrors } = useForm({
  validationSchema: securitySchema,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
});

const { value: currentPassword } = useField<string>('currentPassword');
const { value: newPassword } = useField<string>('newPassword');
const { value: confirmPassword } = useField<string>('confirmPassword');

onMounted(() => {
  if (authStore.user) {
    setProfileValues({
      email: authStore.user.email || '',
      fullName: authStore.user.fullName || authStore.user.user_metadata?.full_name || '',
      phone: authStore.user.phone || '',
      gender: authStore.user.gender || 'Prefer not to say',
      dob: authStore.user.dateOfBirth ? new Date(authStore.user.dateOfBirth) : null,
    });
  }
});

const saveChanges = handleProfileSubmit(async (values) => {
  try {
    const payload = { ...values, userId: authStore.user.id };
    await api.patch('/users/profile', payload);
    await authStore.refreshSession(); // Refresh user data locally
    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || 'Failed to update profile', life: 3000 });
  }
});

const updatePassword = handleSecuritySubmit(async (values) => {
  try {
    await api.post('/users/change-password', {
      newPassword: values.newPassword,
    });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully', life: 3000 });
    resetSecurityForm();
  } catch (error: any) {
    console.error('Failed to update password:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || 'Failed to update password', life: 3000 });
  }
});
</script>
