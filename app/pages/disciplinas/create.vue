<script setup lang="ts">
type Curso = {
  id: number
  nome: string
}

type DisciplinaForm = {
  nome: string
  codigo: string
  curso_id: number | null
  carga_horaria: number
}

const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive<DisciplinaForm>({
  nome: "",
  codigo: "",
  curso_id: null,
  carga_horaria: 0,
})

const { data: cursos } = await useAsyncData<Curso[]>(
  "cursos-disciplinas",
  () =>
    $api<Curso[]>("/cursos", {
      method: "GET",
    })
)

async function submit() {
  await $api("/disciplinas", {
    method: "POST",
    body: form,
  })

  router.push("/disciplinas")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Disciplina</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />
      <input v-model="form.codigo" class="input mb-2" placeholder="Código" />
      <input
        v-model="form.carga_horaria"
        type="number"
        class="input mb-2"
        placeholder="Carga Horária"
      />

      <select v-model="form.curso_id" class="input mb-4">
        <option :value="null">Selecionar Curso</option>

        <option v-for="curso in cursos ?? []" :key="curso.id" :value="curso.id">
          {{ curso.nome }}
        </option>
      </select>

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>