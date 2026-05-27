<script setup lang="ts">
type LoginResponse = {
  token: string
}

const email = ref("")
const password = ref("")

const { $api } = useNuxtApp()
const router = useRouter()

async function login() {
  try {
    const res = await $api<LoginResponse>("/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    })

    localStorage.setItem("token", res.token)

    router.push("/dashboard/admin")
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="card w-96">
      <h2 class="text-xl font-bold mb-4">
        Login
      </h2>

      <input
        v-model="email"
        class="input mb-2"
        placeholder="Email"
      />

      <input
        v-model="password"
        type="password"
        class="input mb-4"
        placeholder="Password"
      />

      <button
        class="btn-primary w-full"
        @click="login"
      >
        Entrar
      </button>
    </div>
  </div>
</template>