<script setup lang="ts">
const { $api } = useNuxtApp()
const router = useRouter()

type Aluno = {
  id: number
  nome: string
}

type Turma = {
  id: number
  nome: string
}

type MatriculaForm = {
  aluno_id: number | null
  turma_id: number | null
  ano_letivo: string
  estado: string
}

const form = reactive<MatriculaForm>({
  aluno_id: null,
  turma_id: null,
  ano_letivo: "",
  estado: "ativa",
})

const { data: alunos } = await useAsyncData<Aluno[]>(
  "alunos-select",
  () => $api("/alunos")
)

const { data: turmas } = await useAsyncData<Turma[]>(
  "turmas-select",
  () => $api("/turmas")
)

async function submit() {
  await $api("/matriculas", {
    method: "POST",
    body: form,
  })

  router.push("/matriculas")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Matrícula</h1>

    <div class="card">
      <select v-model="form.aluno_id" class="input mb-2">
        <option value="">Selecionar Aluno</option>
        <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
          {{ aluno.nome }}
        </option>
      </select>

      <select v-model="form.turma_id" class="input mb-2">
        <option value="">Selecionar Turma</option>
        <option v-for="turma in turmas" :key="turma.id" :value="turma.id">
          {{ turma.nome }}
        </option>
      </select>

      <input
        v-model="form.ano_letivo"
        class="input mb-2"
        placeholder="Ano letivo (ex: 2025/2026)"
      />

      <select v-model="form.estado" class="input mb-4">
        <option value="ativa">Ativa</option>
        <option value="inativa">Inativa</option>
      </select>

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>