<script setup lang="ts">
defineProps<{
  modelValue: string | number
  options: { label: string; value: string | number }[]
}>()

defineEmits(["update:modelValue"])
</script>

<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="w-full border rounded px-3 py-2"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>