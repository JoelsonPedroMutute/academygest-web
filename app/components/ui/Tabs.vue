<script setup lang="ts">
defineProps<{ tabs: string[] }>()
const active = ref(0)
</script>

<template>
  <div>
    <div class="flex gap-2">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        @click="active = i"
        :class="{ 'font-bold': active === i }"
      >
        {{ tab }}
      </button>
    </div>

    <div class="mt-4">
      <slot :active="active" />
    </div>
  </div>
</template>