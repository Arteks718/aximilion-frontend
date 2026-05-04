<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div v-if="globalError" class="p-4 bg-red-50 rounded-xl border border-red-200">
      <p class="text-sm text-red-600 text-center font-medium">{{ globalError }}</p>
    </div>

    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-widest text-[#3c4a42] font-label" for="name">Full Name</label>
      <div class="relative">
        <input 
          v-model="name" 
          type="text" 
          class="w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all font-body outline-none focus:ring-0 text-brand-dark placeholder:text-brand-gray/50" 
          :class="[nameError ? 'border-red-500 focus:border-red-500' : 'border-[#e3e9f1] focus:border-[#006C49]']"
          id="name" 
          placeholder="Jane Doe" 
        />
        <p v-if="nameError" class="text-red-600 text-xs mt-1">{{ nameError }}</p>
      </div>
    </div>

    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-widest text-[#3c4a42] font-label" for="reg-email">Email Address</label>
      <div class="relative">
        <input 
          v-model="email" 
          type="email" 
          class="w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all font-body outline-none focus:ring-0 text-brand-dark placeholder:text-brand-gray/50" 
          :class="[emailError ? 'border-red-500 focus:border-red-500' : 'border-[#e3e9f1] focus:border-[#006C49]']"
          id="reg-email" 
          placeholder="name@example.com" 
        />
        <p v-if="emailError" class="text-red-600 text-xs mt-1">{{ emailError }}</p>
      </div>
    </div>

    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-widest text-[#3c4a42] font-label" for="reg-password">Password</label>
      <div class="relative">
        <input 
          v-model="password" 
          type="password" 
          class="w-full px-0 py-3 bg-transparent border-0 border-b-2 transition-all font-body outline-none focus:ring-0 text-brand-dark placeholder:text-brand-gray/50" 
          :class="[passwordError ? 'border-red-500 focus:border-red-500' : 'border-[#e3e9f1] focus:border-[#006C49]']"
          id="reg-password" 
          placeholder="••••••••" 
        />
        <p v-if="passwordError" class="text-red-600 text-xs mt-1">{{ passwordError }}</p>
      </div>
    </div>

    <div class="pt-4">
      <button :disabled="isSubmitting" type="submit" class="w-full py-4 bg-gradient-to-br from-[#006c49] to-[#10b981] text-white rounded-full font-bold text-sm tracking-widest uppercase transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50">
        <span v-if="isSubmitting">Creating...</span>
        <template v-else>
          <span>Create Account</span>
          <i class="pi pi-arrow-right text-lg"></i>
        </template>
      </button>
    </div>

    <div class="relative flex items-center py-4">
      <div class="flex-grow border-t border-[#e3e9f1]"></div>
      <span class="flex-shrink mx-4 text-xs font-medium text-[#6c7a71] uppercase tracking-widest">Or continue with</span>
      <div class="flex-grow border-t border-[#e3e9f1]"></div>
    </div>

    <div class="grid grid-cols-1 gap-4 w-full">
      <button @click="loginWithGoogle" type="button" class="flex w-full items-center justify-center px-4 py-3 bg-white border border-[#bbcabf]/30 rounded-full hover:bg-gray-50 transition-colors space-x-3">
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        </svg>
        <span class="text-sm font-semibold text-brand-dark">Continue with Google</span>
      </button>

      <button @click="loginWithFacebook" type="button" class="flex w-full items-center justify-center px-4 py-3 bg-white border border-[#bbcabf]/30 rounded-full hover:bg-gray-50 transition-colors space-x-3">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span class="text-sm font-semibold text-brand-dark">Continue with Facebook</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { supabase } from '../../lib/supabase';

const authStore = useAuthStore();
const router = useRouter();
const globalError = ref('');

const schema = yup.object({
  name: yup.string().required('Full Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema });
const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  globalError.value = '';
  try {
    await authStore.register(values);
    router.push('/dashboard');
  } catch (error: any) {
    globalError.value = error.response?.data?.message || 'Registration failed. Please try again.';
  }
});

const loginWithGoogle = () => {
  supabase.auth.signInWithOAuth({ provider: 'google' });
};

const loginWithFacebook = () => {
  supabase.auth.signInWithOAuth({ provider: 'facebook' });
};
</script>
