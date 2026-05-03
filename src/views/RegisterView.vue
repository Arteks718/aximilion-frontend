<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-surface-container-lowest rounded-3xl shadow-[0_4px_24px_rgba(22,28,34,0.04)]">
    <h2 class="text-3xl font-bold mb-8 text-center text-brand-dark font-headline">Create Account</h2>
    
    <!-- Global Backend Error -->
    <div v-if="globalError" class="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
      <p class="text-sm text-red-600 text-center font-medium">{{ globalError }}</p>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-brand-dark mb-2">Full Name</label>
        <input 
          v-model="name" 
          type="text" 
          class="block w-full bg-surface-container-lowest border border-[#bbcabf]/20 rounded-xl p-3 text-brand-dark outline-none focus:ring-0 focus:border-b-2 transition-all" 
          :class="[
            nameError 
              ? 'border-red-500 focus:border-red-500 focus:border-b-red-500' 
              : 'focus:border-[#bbcabf]/20 focus:border-b-[#006C49]'
          ]"
          placeholder="Enter your full name"
        />
        <p v-if="nameError" class="text-red-600 text-sm mt-1">{{ nameError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-brand-dark mb-2">Email Address</label>
        <input 
          v-model="email" 
          type="email" 
          class="block w-full bg-surface-container-lowest border border-[#bbcabf]/20 rounded-xl p-3 text-brand-dark outline-none focus:ring-0 focus:border-b-2 transition-all" 
          :class="[
            emailError 
              ? 'border-red-500 focus:border-red-500 focus:border-b-red-500' 
              : 'focus:border-[#bbcabf]/20 focus:border-b-[#006C49]'
          ]"
          placeholder="Enter your email"
        />
        <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-brand-dark mb-2">Password</label>
        <input 
          v-model="password" 
          type="password" 
          class="block w-full bg-surface-container-lowest border border-[#bbcabf]/20 rounded-xl p-3 text-brand-dark outline-none focus:ring-0 focus:border-b-2 transition-all" 
          :class="[
            passwordError 
              ? 'border-red-500 focus:border-red-500 focus:border-b-red-500' 
              : 'focus:border-[#bbcabf]/20 focus:border-b-[#006C49]'
          ]"
          placeholder="Create a password"
        />
        <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>
      </div>
      <button :disabled="isSubmitting" type="submit" class="w-full bg-[#006C49] text-surface-container-lowest py-3 px-4 rounded-full font-medium hover:bg-[#005236] transition-colors shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
        <span v-if="isSubmitting">Registering...</span>
        <span v-else class="flex items-center gap-2">Register <i class="fa-solid fa-arrow-right text-white text-sm"></i></span>
      </button>
      <div class="text-center mt-6">
        <p class="text-sm text-brand-gray">
          Already have an account? 
          <router-link to="/login" class="text-[#006C49] font-semibold hover:underline">Sign in</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const authStore = useAuthStore();
const router = useRouter();

const globalError = ref('');

const schema = yup.object({
  name: yup.string().required('Full Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  globalError.value = '';
  try {
    await authStore.register(values);
    router.push('/dashboard');
  } catch (error: any) {
    globalError.value = error.response?.data?.message || 'Registration failed. User may already exist.';
  }
});
</script>
