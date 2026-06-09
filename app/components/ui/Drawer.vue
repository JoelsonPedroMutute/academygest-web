<script setup lang="ts">
defineProps<{
  open: boolean
  position?: "left" | "right"
}>()

defineEmits(["close"])
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex">
    
    <!-- overlay -->
    <div
      class="fixed inset-0 bg-black/50"
      @click="$emit('close')"
    />

    <!-- drawer -->
    <div
      class="relative bg-white w-80 h-full shadow-lg"
      :class="{
        'ml-auto': position === 'right',
        'mr-auto': position !== 'right',
      }"
    >
      <!-- header -->
      <div class="flex justify-between items-center p-4 border-b">
        <slot name="header">
          <h2 class="font-semibold">Menu</h2>
        </slot>

        <button @click="$emit('close')" class="text-gray-500">
          ✕
        </button>
      </div>

      <!-- content -->
      <div class="p-4 overflow-y-auto h-full">
        <slot />
      </div>
    </div>

  </div>
</template>