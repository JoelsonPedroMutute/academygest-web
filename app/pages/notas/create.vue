<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive<{
  aluno_id: number | null
  disciplina_id: number | null
  turma_id: number | null
  prova_trimestral: number | null
  prova_semestral: number | null
  exame_final: number | null
}>({
  aluno_id: null,
  disciplina_id: null,
  turma_id: null,
  prova_trimestral: null,
  prova_semestral: null,
  exame_final: null,
})

const { data: alunosRes } = await useAsyncData("notas-alunos", () => $api("/admin/alunos"))
const alunos = computed<any[]>(() => (alunosRes.value as any)?.data ?? alunosRes.value ?? [])

const { data: disciplinasRes } = await useAsyncData("notas-disciplinas", () => $api("/admin/disciplinas"))
const disciplinas = computed<any[]>(() => (disciplinasRes.value as any)?.data ?? disciplinasRes.value ?? [])

const { data: turmasRes } = await useAsyncData("notas-turmas", () => $api("/admin/turmas"))
const turmas = computed<any[]>(() => (turmasRes.value as any)?.data ?? turmasRes.value ?? [])

const saving = ref(false)

async function submit() {
  saving.value = true
  try {
    await $api("/admin/notas", { method: "POST", body: form })
    success("Nota criada com sucesso")
    router.push("/notas")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao criar nota")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Nota</h1>

    <div class="card space-y-3 max-w-lg">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Aluno</label>
        <select v-model="form.aluno_id" class="input">
          <option :value="null">Selecionar aluno</option>
          <option v-for="a in alunos" :key="a.id" :value="a.id">
            {{ a.user?.name ?? a.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Disciplina</label>
        <select v-model="form.disciplina_id" class="input">
          <option :value="null">Selecionar disciplina</option>
          <option v-for="d in disciplinas" :key="d.id" :value="d.id">
            {{ d.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Turma</label>
        <select v-model="form.turma_id" class="input">
          <option :value="null">Selecionar turma</option>
          <option v-for="t in turmas" :key="t.id" :value="t.id">
            {{ t.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Prova Trimestral</label>
        <input
          v-model.number="form.prova_trimestral"
          type="number"
          step="0.1"
          min="0"
          max="20"
          class="input"
          placeholder="0 a 20"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Prova Semestral</label>
        <input
          v-model.number="form.prova_semestral"
          type="number"
          step="0.1"
          min="0"
          max="20"
          class="input"
          placeholder="0 a 20"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Exame Final</label>
        <input
          v-model.number="form.exame_final"
          type="number"
          step="0.1"
          min="0"
          max="20"
          class="input"
          placeholder="0 a 20"
        />
      </div>

      <div class="flex gap-2 pt-2">
        <button class="btn-primary disabled:opacity-60" :disabled="saving" @click="submit">
          {{ saving ? "A guardar..." : "Guardar" }}
        </button>
        <NuxtLink to="/notas" class="text-gray-600 px-4 py-2">Cancelar</NuxtLink>
      </div>
    </div>
  </div>
</template>
