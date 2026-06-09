<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { success, error } = useToast()

const { data: res } = await useAsyncData("aluno-edit", () =>
  $api(`/admin/alunos/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)

const { data: turmasRes } = await useAsyncData("turmas-edit", () =>
  $api("/admin/turmas")
)

const turmas = computed<any[]>(
  () => (turmasRes.value as any)?.data ?? turmasRes.value ?? []
)

const form = reactive({
  name: "",
  email: "",
  turma_id: "",
  data_nascimento: "",
  numero_estudante: "",
})

watchEffect(() => {
  const a = item.value
  if (!a) return
  form.name = a.user?.name ?? a.name ?? ""
  form.email = a.user?.email ?? a.email ?? ""
  form.turma_id = a.turma_id ?? ""
  form.data_nascimento = a.data_nascimento ?? ""
  form.numero_estudante = a.numero_estudante ?? ""
})

async function update() {
  try {
    await $api(`/admin/alunos/${route.params.id}`, {
      method: "PUT",
      body: form,
    })

    success("Aluno atualizado com sucesso.")
    router.push("/alunos")
  } catch (e) {
    error("Erro ao atualizar aluno.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Aluno</h1>

    <div class="card">
      <input
        v-model="form.name"
        class="input mb-2"
        placeholder="Nome"
      />
      <input
        v-model="form.email"
        type="email"
        class="input mb-2"
        placeholder="Email"
      />

      <select v-model="form.turma_id" class="input mb-2">
        <option value="">Selecione a turma</option>
        <option v-for="t in turmas" :key="t.id" :value="t.id">
          {{ t.nome }}
        </option>
      </select>

      <input
        v-model="form.data_nascimento"
        type="date"
        class="input mb-2"
        placeholder="Data de nascimento"
      />

      <input
        v-model="form.numero_estudante"
        class="input mb-4"
        placeholder="Nº de estudante (opcional)"
      />

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>
