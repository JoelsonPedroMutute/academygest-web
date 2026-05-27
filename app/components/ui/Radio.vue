<script setup lang="ts">
defineProps<{
  modelValue: string | number
  value: string | number
  name: string
}>()

defineEmits(["update:modelValue"])
</script>

<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    :checked="modelValue === value"
    @change="$emit('update:modelValue', value)"
  />
</template>