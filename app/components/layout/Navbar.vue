<script setup lang="ts">
const user = process.client
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  navigateTo("/login")
}
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-white shadow">
    <div class="font-semibold">
      Sistema Académico
    </div>

    <div class="flex items-center gap-4">
      <span>{{ user?.name }}</span>

      <button @click="logout" class="text-red-600">
        Sair
      </button>
    </div>
  </header>
</template>