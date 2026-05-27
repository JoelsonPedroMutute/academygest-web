<script setup lang="ts">
type Disciplina = {
  id: number
  nome: string
  codigo: string
  carga_horaria: number
  curso_id: number
}

type Curso = {
  id: number
  nome: string
}

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { data: disciplina } = await useAsyncData<Disciplina>(
  "disciplina",
  () =>
    $api<Disciplina>(`/disciplinas/${route.params.id}`, {
      method: "GET",
    })
)

const { data: cursos } = await useAsyncData<Curso[]>(
  "cursos-edit-disciplinas",
  () =>
    $api<Curso[]>("/cursos", {
      method: "GET",
    })
)

async function update() {
  await $api(`/disciplinas/${route.params.id}`, {
    method: "PATCH",
    body: disciplina.value,
  })

  router.push("/disciplinas")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Disciplina</h1>

    <div class="card">
      <input v-model="disciplina!.nome" class="input mb-2" />
      <input v-model="disciplina!.codigo" class="input mb-2" />
      <input v-model="disciplina!.carga_horaria" type="number" class="input mb-2" />

      <select v-model="disciplina!.curso_id" class="input mb-4">
        <option v-for="curso in cursos ?? []" :key="curso.id" :value="curso.id">
          {{ curso.nome }}
        </option>
      </select>

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>