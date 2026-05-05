<template>
  <div class="min-h-screen bg-surface flex flex-col font-sans text-brand-dark">
    <!-- Header -->
    <header class="bg-surface-container-lowest/80 backdrop-blur-[24px] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Left side: Logo & Explore -->
          <div class="flex items-center">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center gap-2">
              <router-link to="/" class="font-bold text-xl tracking-tight text-brand-dark font-headline">
                <img :src="Logo" alt="Aximilion" width="175"/>
              </router-link>
            </div>
            <!-- Navigation Links (Desktop) -->
            <nav class="hidden md:flex ml-12">
              <router-link :to="{ name: 'campaigns' }" class="text-brand-dark font-medium border-b-2 border-transparent hover:border-brand-green py-5 px-4 transition-colors">Explore</router-link>
            </nav>
          </div>

          <div class="hidden lg:flex flex-1 justify-center px-8">
            <div class="max-w-lg w-full relative z-50">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-search text-brand-gray !text-sm"></i>
              </div>
              <input 
                v-model="searchQuery" 
                @input="onSearchInput"
                class="block w-full pl-10 pr-3 py-2 bg-surface-container-low rounded-full leading-5 placeholder-brand-gray focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-brand-green sm:text-sm transition-colors" 
                placeholder="Search campaigns..." 
                type="text"
              />
              
              <!-- Search Dropdown Panel -->
              <div v-if="searchQuery.trim().length > 0" class="absolute top-full mt-2 w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50">
                <div v-if="isSearching" class="p-4 flex justify-center">
                  <ProgressSpinner style="width: 30px; height: 30px" strokeWidth="4" />
                </div>
                <div v-else-if="searchResults.length === 0" class="p-4 text-center text-sm text-brand-gray">
                  No campaigns found.
                </div>
                <ul v-else class="max-h-80 overflow-y-auto">
                  <li v-for="result in searchResults" :key="result.id" class="border-b border-gray-50 last:border-0 hover:bg-surface-container-lowest transition-colors">
                    <router-link 
                      :to="{ name: 'campaign-detail', params: { id: result.id } }" 
                      @click="clearSearch"
                      class="flex items-center gap-3 p-3"
                    >
                      <div class="w-10 h-10 flex-shrink-0 bg-surface-container-low rounded-md overflow-hidden">
                        <img v-if="result.coverUrl" :src="result.coverUrl" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-brand-gray bg-gray-100"><i class="pi pi-image text-xs"></i></div>
                      </div>
                      <span class="text-sm font-medium text-brand-dark line-clamp-2 leading-tight flex-1">{{ result.title }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex items-center gap-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link :to="{name: 'login'}" class="text-brand-dark font-medium hover:text-brand-green transition-colors text-sm">Sign In</router-link>
              <router-link :to="{name: 'register'}" class="bg-[#006C49] text-surface-container-lowest px-4 py-2 rounded-full font-medium text-sm hover:bg-[#005236] transition-colors shadow-sm">Sign Up</router-link>
            </template>
            <template v-else>
              <div class="relative flex items-center gap-4">
                <router-link v-if="authStore.user?.role === 'moderator'" to="/moderator/dashboard" class="text-xs font-bold text-[#006C49] hover:text-[#005236] transition-colors flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full">
                  <i class="pi pi-shield"></i> Mod Dashboard
                </router-link>
                <button @click="toggleMenu" aria-haspopup="true" aria-controls="user_menu" class="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold bg-brand-lightGreen text-brand-green hover:ring-2 hover:ring-brand-green transition-all shadow-sm">
                  {{ userInitials }}
                </button>
                <Menu ref="menu" id="user_menu" :model="menuItems" :popup="true" class="mt-2 w-48" />
              </div>
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
            <span class="font-bold text-xl tracking-tight block mb-4 font-headline">Aximilion</span>
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
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="pi pi-globe"></i></a>
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="pi pi-twitter"></i></a>
            <a class="hover:text-brand-dark transition-colors" href="#"><i class="pi pi-share-alt"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import Logo from '/aximilion-logo.svg';
import api from '../api/axios';

const authStore = useAuthStore();
const router = useRouter();

const menu = ref();

const toggleMenu = (event: any) => {
  menu.value.toggle(event);
};

const logout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};

// Search state
const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const isSearching = ref(false);

let debounceTimeout: ReturnType<typeof setTimeout>;

const onSearchInput = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    isSearching.value = false;
    return;
  }

  isSearching.value = true;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    try {
      const response = await api.get(`/campaigns/search?q=${encodeURIComponent(searchQuery.value)}`);
      searchResults.value = response.data;
    } catch (error) {
      console.error('Search failed:', error);
      searchResults.value = [];
    } finally {
      isSearching.value = false;
    }
  }, 300);
};

const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
};

const menuItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => {
      router.push({ name: 'profile' });
    }
  },
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-line',
    command: () => {
      router.push({ name: 'dashboard' });
    }
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      logout();
    }
  }
]);

const userInitials = computed(() => {
  if (!authStore.user) return 'U';
  const email = authStore.user.email || '';
  return email.substring(0, 2).toUpperCase() || 'U';
});
</script>
