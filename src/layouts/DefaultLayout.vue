<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
              Aximilion
            </router-link>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/" class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">Home</router-link>
              <router-link v-if="authStore.isAuthenticated" to="/dashboard" class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">Dashboard</router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
              <router-link to="/register" class="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
            </template>
            <template v-else>
              <button @click="logout" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <router-view class="container mx-auto p-4" />
    </main>
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
