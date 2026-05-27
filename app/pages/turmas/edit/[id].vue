<script setup lang="ts">
type Turma = {
  id: number
  nome: string
  ano: string
  curso_id: number
}

type Curso = {
  id: number
  nome: string
}

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { data: turma } = await useAsyncData<Turma>("turma", () =>
  $api(`/turmas/${route.params.id}`)
)

const { data: cursos } = await useAsyncData<Curso[]>("cursos-edit", () =>
  $api("/cursos")
)

async function update() {
  if (!turma.value) return

  await $api(`/turmas/${route.params.id}`, {
    method: "PATCH",
    body: turma.value,
  })

  router.push("/turmas")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Turma</h1>

    <div v-if="turma" class="card">
      <input v-model="turma.nome" class="input mb-2" />
      <input v-model="turma.ano" class="input mb-2" />

      <select v-model="turma.curso_id" class="input mb-4">
        <option v-for="curso in cursos || []" :key="curso.id" :value="curso.id">
          {{ curso.nome }}
        </option>
      </select>

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>

    <div v-else>
      Carregando...
    </div>
  </div>
</template>