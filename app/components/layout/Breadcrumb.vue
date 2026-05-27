<script setup lang="ts">
const route = useRoute()

const pathArray = computed(() =>
  route.path.split("/").filter(Boolean)
)
</script>

<template>
  <div class="text-sm text-gray-500 mb-4">
    <span v-for="(p, index) in pathArray" :key="index">
      / {{ p }}
    </span>
  </div>
</template>