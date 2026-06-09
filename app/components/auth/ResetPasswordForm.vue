<script setup lang="ts">
const { $api } = useNuxtApp()

const password = ref("")
const confirm = ref("")

const route = useRoute()

async function reset() {
  if (password.value !== confirm.value) return

  await $api("/auth/reset-password", {
    method: "POST",
    body: {
      token: route.query.token,
      password: password.value,
    },
  })

  await navigateTo("/login")
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Nova senha</h2>

    <Input v-model="password" type="password" placeholder="Nova senha" />
    <div class="mt-3">
      <Input v-model="confirm" type="password" placeholder="Confirmar senha" />
    </div>

    <div class="mt-4">
      <Button @click="reset">
        Alterar senha
      </Button>
    </div>
  </div>
</template>