<script setup lang="ts">
import { Menu, Bell } from 'lucide-vue-next';

const { user } = useAuth();

const emit = defineEmits<{
  toggleSidebar: [];
}>();

const userInitials = computed(() => {
  if (!user.value?.name) return 'AM';
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
    <div class="flex items-center justify-between">
      <button @click="emit('toggleSidebar')" class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
        <Menu class="w-6 h-6" />
      </button>

      <div class="flex items-center gap-4">
        <button class="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell class="w-6 h-6" />
          <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#C0120C] text-white font-semibold text-sm">
            {{ userInitials }}
          </div>

          <div class="hidden md:block">
            <p class="text-sm font-semibold text-gray-900">
              {{ user?.name || 'Administrador' }}
            </p>
            <p class="text-xs text-gray-500">Gestão Académica</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
