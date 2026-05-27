<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>

<template>
  <DashboardSharedDashboardCard>
    <p class="text-sm text-gray-500">
      Matrícula
    </p>

    <div class="mt-3">
      <span
        class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
      >
        {{ status }}
      </span>
    </div>
  </DashboardSharedDashboardCard>
</template>