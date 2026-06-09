<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { success, error } = useToast()

const { data: res } = await useAsyncData("docente", () =>
  $api(`/admin/docentes/${route.params.id}`)
)
const item = computed<any>(() => (res.value as any)?.data ?? res.value)

const form = reactive({
  name: "",
  email: "",
  telefone: "",
  especialidade: "",
  data_nascimento: "",
})

watchEffect(() => {
  const i = item.value
  if (!i) return
  form.name = i.user?.name ?? i.name ?? ""
  form.email = i.user?.email ?? i.email ?? ""
  form.telefone = i.telefone ?? ""
  form.especialidade = i.especialidade ?? ""
  form.data_nascimento = i.data_nascimento ?? ""
})

async function update() {
  try {
    await $api(`/admin/docentes/${route.params.id}`, {
      method: "PUT",
      body: form,
    })

    success("Docente atualizado com sucesso.")
    router.push("/docentes")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao atualizar docente.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Docente</h1>

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

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>
