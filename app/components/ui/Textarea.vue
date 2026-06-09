<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(["update:modelValue"])
</script>

<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    class="w-full border rounded px-3 py-2"
  />
</template>