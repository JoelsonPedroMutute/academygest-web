<script setup lang="ts">
interface Props {
  cols?: number
}

withDefaults(defineProps<Props>(), {
  cols: 4
})
</script>

<template>
  <div
    class="grid gap-5"
    :class="{
      'grid-cols-1 md:grid-cols-2 xl:grid-cols-4': cols === 4,
      'grid-cols-1 md:grid-cols-2 xl:grid-cols-3': cols === 3,
      'grid-cols-1 md:grid-cols-2': cols === 2
    }"
  >
    <slot />
  </div>
</template>