<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "danger"
  type?: "button" | "submit"
  disabled?: boolean
}>()

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
}
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="px-4 py-2 rounded font-medium disabled:opacity-50"
    :class="variants[variant || 'primary']"
  >
    <slot />
  </button>
</template>