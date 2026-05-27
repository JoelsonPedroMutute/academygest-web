<script setup lang="ts">
const { $api } = useNuxtApp()
const email = ref("")

async function sendReset() {
  await $api("/auth/forgot-password", {
    method: "POST",
    body: {
      email: email.value,
    },
  })
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Recuperar senha</h2>

    <Input v-model="email" placeholder="Email" />

    <div class="mt-4">
      <Button @click="sendReset">
        Enviar link
      </Button>
    </div>
  </div>
</template>