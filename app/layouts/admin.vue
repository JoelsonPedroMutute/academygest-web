<script setup lang="ts">
import ToastContainer from '~/components/ui/ToastContainer.vue';

definePageMeta({
  middleware: ['auth', 'admin']
});

const sidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppSidebar 
      :is-open="sidebarOpen" 
      @close="sidebarOpen = false" 
    />
    
    <div class="lg:ml-72 min-h-screen">
      <AppTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <main class="p-6">
        <NuxtPage />
      </main>
    </div>

    <ToastContainer />
  </div>
</template>
