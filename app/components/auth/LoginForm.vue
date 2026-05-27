<script setup lang="ts">
const { $api } = useNuxtApp()

type LoginResponse = {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

const email = ref("")
const password = ref("")
const loading = ref(false)

async function login() {
  loading.value = true

  try {
    const res = await $api<LoginResponse>("/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    })

    localStorage.setItem("token", res.token)
    localStorage.setItem("user", JSON.stringify(res.user))

    await navigateTo("/dashboard")
  } catch (err) {
    console.error("Login error", err)
  } finally {
    loading.value = false
  }
}
</script>