<template>
  <div class="space-y-5 animate-pulse">
    <div class="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <div
        v-for="n in 4"
        :key="n"
        class="h-36 bg-gray-200 dark:bg-gray-800 rounded-2xl"
      />
    </div>

    <div class="h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
  </div>
</template>