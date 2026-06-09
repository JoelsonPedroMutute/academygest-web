<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive<any>({
  aluno_id: "",
  turma_id: "",
  ano_letivo: "",
  semestre: "",
  data_matricula: "",
  status: "ativa",
})

const { data: alunosRes } = await useAsyncData("alunos-select", () => $api("/admin/alunos"))
const { data: turmasRes } = await useAsyncData("turmas-select", () => $api("/admin/turmas"))

const alunos = computed<any[]>(() => (alunosRes.value as any)?.data ?? alunosRes.value ?? [])
const turmas = computed<any[]>(() => (turmasRes.value as any)?.data ?? turmasRes.value ?? [])

const saving = ref(false)

async function submit() {
  saving.value = true
  try {
    await $api("/admin/matriculas", {
      method: "POST",
      body: form,
    })
    success("Matrícula criada com sucesso")
    router.push("/matriculas")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao criar matrícula")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Matrícula</h1>

    <div class="card space-y-3 max-w-lg">
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
        <button class="btn-primary disabled:opacity-60" :disabled="saving" @click="submit">
          {{ saving ? "A guardar..." : "Guardar" }}
        </button>
        <NuxtLink to="/matriculas" class="text-gray-600 px-4 py-2">Cancelar</NuxtLink>
      </div>
    </div>
  </div>
</template>
