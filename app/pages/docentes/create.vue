<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive({
  name: "",
  email: "",
  telefone: "",
  especialidade: "",
  data_nascimento: "",
})

async function submit() {
  try {
    await $api("/admin/docentes", {
      method: "POST",
      body: form,
    })

    success("Docente criado com sucesso.")
    router.push("/docentes")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao criar docente.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Docente</h1>

    <div class="card">
      <label class="block text-sm text-gray-600 mb-1">Nome</label>
      <input v-model="form.name" class="input mb-3" placeholder="Nome" />

      <label class="block text-sm text-gray-600 mb-1">Email</label>
      <input v-model="form.email" type="email" class="input mb-3" placeholder="Email" />

      <label class="block text-sm text-gray-600 mb-1">Telefone</label>
      <input v-model="form.telefone" class="input mb-3" placeholder="Telefone" />

      <label class="block text-sm text-gray-600 mb-1">Especialidade</label>
      <input
        v-model="form.especialidade"
        class="input mb-3"
        placeholder="Especialidade"
      />

      <label class="block text-sm text-gray-600 mb-1">Data de Nascimento</label>
      <input v-model="form.data_nascimento" type="date" class="input mb-4" />

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>
