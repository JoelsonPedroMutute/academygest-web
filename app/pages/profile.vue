<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const { user, logout } = useAuth();
</script>

<template>
  <div class="p-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

      <div class="space-y-4 mb-8">
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div class="w-16 h-16 rounded-full bg-[#C0120C] flex items-center justify-center text-white text-xl font-bold">
            {{ user?.nome?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ user?.nome }}</h2>
            <p class="text-gray-500">{{ user?.email }}</p>
            <span class="inline-block mt-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {{ user?.role }}
            </span>
          </div>
        </div>
      </div>

      <Button variant="danger" @click="logout">
        Sair da Conta
      </Button>
    </div>
  </div>
</template>
