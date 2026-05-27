<script setup lang="ts">
defineProps<{
  modelValue: string | number
  type?: string
  placeholder?: string
}>()

defineEmits(["update:modelValue"])
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="w-full border rounded px-3 py-2"
  />
</template>