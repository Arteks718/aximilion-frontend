<template>
  <div class="min-h-screen bg-surface flex flex-col font-sans text-brand-dark">
    <!-- Header -->
    <header class="bg-surface-container-lowest/80 backdrop-blur-[24px] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2">
            <router-link to="/" class="font-bold text-xl tracking-tight text-brand-dark font-headline">Auxilium</router-link>
          </div>
          <!-- Navigation Links (Desktop) -->
          <nav class="hidden md:flex space-x-8">
            <router-link to="/explore" class="text-brand-dark font-medium border-b-2 border-brand-green py-5 px-4">Explore</router-link>
            <a class="text-brand-gray hover:text-brand-dark font-medium px-1 py-5 transition-colors" href="#">Impact</a>
            <a class="text-brand-gray hover:text-brand-dark font-medium px-1 py-5 transition-colors" href="#">Transparency</a>
          </nav>
          <!-- Search Bar -->
          <div class="hidden lg:flex flex-1 justify-center px-8">
            <div class="max-w-md w-full relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fa-solid fa-search text-brand-gray text-sm"></i>
              </div>
              <input class="block w-full pl-10 pr-3 py-2 bg-surface-container-low rounded-full leading-5 placeholder-brand-gray focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-brand-green sm:text-sm transition-colors" placeholder="Search campaigns..." type="text"/>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex items-center gap-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link :to="{name: 'login'}" class="text-brand-dark font-medium hover:text-brand-green transition-colors text-sm">Sign In</router-link>
              <router-link :to="{name: 'create-campaign'}" class="bg-[#006C49] text-surface-container-lowest px-4 py-2 rounded-full font-medium text-sm hover:bg-[#005236] transition-colors shadow-sm">Create Campaign</router-link>
            </template>
            <template v-else>
              <router-link :to="{name: 'dashboard'}" class="text-brand-dark font-medium hover:text-brand-green transition-colors text-sm">Dashboard</router-link>
              <button @click="logout" class="bg-[#006C49] text-surface-container-lowest px-4 py-2 rounded-full font-medium text-sm hover:bg-[#005236] transition-colors shadow-sm">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-surface-container-lowest pt-16 pb-8 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div class="md:col-span-1">
            <span class="font-bold text-xl tracking-tight block mb-4 font-headline">The Ethical Ledger</span>
            <p class="text-sm text-brand-gray leading-relaxed pr-4">
              Pioneering verified transparency in global giving through verifiable blockchain forensics and meticulous human auditing.
            </p>
          </div>
          <div>
            <h4 class="font-semibold text-brand-dark tracking-wider uppercase text-xs mb-4">Platform</h4>
            <ul class="space-y-3 text-sm text-brand-gray">
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Explore</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">How it Works</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">API Documentation</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-brand-dark tracking-wider uppercase text-xs mb-4">Organization</h4>
            <ul class="space-y-3 text-sm text-brand-gray">
              <li><router-link class="hover:text-brand-green transition-colors" to="/">About Us</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Impact Report</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Careers</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-brand-dark tracking-wider uppercase text-xs mb-4">Legal</h4>
            <ul class="space-y-3 text-sm text-brand-gray">
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Privacy Policy</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Terms of Service</router-link></li>
              <li><router-link class="hover:text-brand-green transition-colors" to="/">Tax Compliance</router-link></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-brand-gray/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-brand-gray">
            © 2026 Aximilion. Built for transparency.
          </p>
          <div class="flex items-center gap-4 text-brand-gray">
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="fa-solid fa-globe"></i></a>
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="fa-brands fa-twitter"></i></a>
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="fa-solid fa-share-nodes"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
