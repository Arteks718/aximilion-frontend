<template>
  <div class="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 md:p-8">
    <!-- Auth Card Container -->
    <div class="w-full max-w-5xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_4px_40px_rgba(22,28,34,0.08)]">
      
      <!-- Branding/Value Prop Side -->
      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#006c49] to-[#10b981] p-12 flex-col justify-between text-white">
        <div class="space-y-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <i class="pi pi-shield !text-sm mr-2"></i>
            <span class="text-xs font-medium uppercase tracking-wider font-label">Aximilion</span>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight leading-tight font-headline">Empowering transparency through capital.</h1>
          <p class="text-[#4edea3] opacity-90 text-lg leading-relaxed">Join a global community of impact investors tracking every dollar from contribution to change.</p>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-12">
          <div class="space-y-1">
            <div class="text-3xl font-bold font-headline">100%</div>
            <div class="text-xs font-medium uppercase tracking-widest opacity-70">Financial Visibility</div>
          </div>
          <div class="space-y-1">
            <div class="text-3xl font-bold font-headline">1.2M+</div>
            <div class="text-xs font-medium uppercase tracking-widest opacity-70">Lives Impacted</div>
          </div>
        </div>
      </div>
      
      <!-- Form Side -->
      <div class="w-full md:w-1/2 p-8 md:p-16 bg-white flex flex-col justify-center">
        <!-- Toggle Navigation -->
        <div class="flex space-x-8 mb-12 border-b border-[#e3e9f1]">
          <button 
            @click="switchTab('login')"
            class="pb-4 text-sm tracking-wide transition-all border-b-2 uppercase cursor-pointer"
            :class="activeTab === 'login' ? 'font-bold border-[#006c49] text-brand-dark' : 'font-medium border-transparent text-[#3c4a42] hover:text-[#006c49]'"
          >
            Sign In
          </button>
          <button 
            @click="switchTab('register')"
            class="pb-4 text-sm tracking-wide transition-all border-b-2 uppercase cursor-pointer"
            :class="activeTab === 'register' ? 'font-bold border-[#006c49] text-brand-dark' : 'font-medium border-transparent text-[#3c4a42] hover:text-[#006c49]'"
          >
            Create Account
          </button>
        </div>

        <!-- Render active form component -->
        <LoginForm v-if="activeTab === 'login'" />
        <RegisterForm v-else />

        <!-- Secure Indicator -->
        <div class="mt-12 flex items-center justify-center space-x-2 text-[#6c7a71]">
          <i class="pi pi-lock !text-sm"></i>
          <span class="text-[10px] font-bold uppercase tracking-[0.2em] font-label">Bank-Level 256-bit Encryption</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

const route = useRoute();
const router = useRouter();
const activeTab = ref('login');

const switchTab = (tab: string) => {
  activeTab.value = tab;
  router.push(`/${tab}`);
};

onMounted(() => {
  if (route.path.includes('register')) {
    activeTab.value = 'register';
  } else {
    activeTab.value = 'login';
  }
});

watch(() => route.path, (newPath) => {
  if (newPath.includes('register')) {
    activeTab.value = 'register';
  } else if (newPath.includes('login')) {
    activeTab.value = 'login';
  }
});
</script>
