<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  turma_id: "",
  data_nascimento: "",
})

const { data: turmasRes } = await useAsyncData("turmas", () =>
  $api("/admin/turmas")
)

const turmas = computed<any[]>(
  () => (turmasRes.value as any)?.data ?? turmasRes.value ?? []
)

async function submit() {
  try {
    await $api("/admin/alunos", {
      method: "POST",
      body: form,
    })

    success("Aluno criado com sucesso.")
    router.push("/alunos")
  } catch (e) {
    error("Erro ao criar aluno.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Aluno</h1>

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
      <input
        v-model="form.password"
        type="password"
        class="input mb-2"
        placeholder="Palavra-passe"
      />
      <input
        v-model="form.password_confirmation"
        type="password"
        class="input mb-2"
        placeholder="Confirmar palavra-passe"
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
        class="input mb-4"
        placeholder="Data de nascimento"
      />

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>
