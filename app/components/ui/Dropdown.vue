<script setup lang="ts">
defineProps<{ items: any[] }>()
</script>

<template>
  <div class="relative">
    <slot name="trigger" />

    <div class="absolute bg-white shadow mt-2 p-2 rounded">
      <div v-for="item in items" :key="item.label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>