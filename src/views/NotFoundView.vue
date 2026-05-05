<template>
  <div class="min-h-screen bg-surface flex flex-col items-center justify-center font-sans text-center px-4">
    <div class="mb-8 relative flex items-center justify-center">
      <h1 class="text-9xl md:text-[12rem] font-black text-[#006C49] opacity-10 absolute select-none">404</h1>
      <h1 class="text-6xl md:text-8xl font-extrabold text-gray-900 relative z-10 font-headline drop-shadow-sm">404</h1>
    </div>
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-headline relative z-10">Page not found</h2>
    <p class="text-gray-500 mb-8 max-w-md relative z-10">Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
    <router-link to="/" class="relative z-10 bg-gradient-to-br from-emerald-500 to-[#006C49] text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
      <i class="pi pi-home"></i> Return to Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>
