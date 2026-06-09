<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { success, error } = useToast()

const { data: alunosRes } = await useAsyncData("alunos-select-edit", () => $api("/admin/alunos"))
const { data: turmasRes } = await useAsyncData("turmas-select-edit", () => $api("/admin/turmas"))
const { data: res } = await useAsyncData(
  `matricula-edit-${route.params.id}`,
  () => $api(`/admin/matriculas/${route.params.id}`)
)

const alunos = computed<any[]>(() => (alunosRes.value as any)?.data ?? alunosRes.value ?? [])
const turmas = computed<any[]>(() => (turmasRes.value as any)?.data ?? turmasRes.value ?? [])
const source = computed<any>(() => (res.value as any)?.data ?? res.value)

const form = reactive<any>({
  aluno_id: "",
  turma_id: "",
  ano_letivo: "",
  semestre: "",
  data_matricula: "",
  status: "ativa",
})

watchEffect(() => {
  const m = source.value
  if (!m) return
  form.aluno_id = m.aluno_id ?? ""
  form.turma_id = m.turma_id ?? ""
  form.ano_letivo = m.ano_letivo ?? ""
  form.semestre = m.semestre ?? ""
  form.data_matricula = m.data_matricula ?? ""
  form.status = m.status ?? "ativa"
})

const saving = ref(false)

async function update() {
  saving.value = true
  try {
    await $api(`/admin/matriculas/${route.params.id}`, {
      method: "PUT",
      body: form,
    })
    success("Matrícula atualizada com sucesso")
    router.push("/matriculas")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao atualizar matrícula")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Matrícula</h1>

    <div v-if="source" class="card space-y-3 max-w-lg">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Aluno</label>
        <select v-model="form.aluno_id" class="input">
          <option value="">Selecionar Aluno</option>
          <option v-for="a in alunos" :key="a.id" :value="a.id">
            {{ a.user?.name ?? a.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Turma</label>
        <select v-model="form.turma_id" class="input">
          <option value="">Selecionar Turma</option>
          <option v-for="t in turmas" :key="t.id" :value="t.id">
            {{ t.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ano letivo</label>
        <input v-model="form.ano_letivo" class="input" placeholder="2025/2026" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Semestre</label>
        <input v-model="form.semestre" class="input" placeholder="1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Data de matrícula</label>
        <input v-model="form.data_matricula" type="date" class="input" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select v-model="form.status" class="input">
          <option value="ativa">Ativa</option>
          <option value="suspensa">Suspensa</option>
          <option value="cancelada">Cancelada</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div class="flex gap-2 pt-2">
        <button class="btn-primary disabled:opacity-60" :disabled="saving" @click="update">
          {{ saving ? "A guardar..." : "Atualizar" }}
        </button>
        <NuxtLink to="/matriculas" class="text-gray-600 px-4 py-2">Cancelar</NuxtLink>
      </div>
    </div>

    <div v-else class="card text-gray-500">
      Matrícula não encontrada.
    </div>
  </div>
</template>
