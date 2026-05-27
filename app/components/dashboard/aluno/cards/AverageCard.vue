<script setup lang="ts">
defineProps<{
  average: number | string
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500">
          Média Geral
        </p>

        <h2 class="text-4xl font-bold text-blue-600 mt-2">
          {{ average }}
        </h2>
      </div>

      <div
        class="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl"
      >
        📘
      </div>
    </div>
  </DashboardSharedDashboardCard>
</template>