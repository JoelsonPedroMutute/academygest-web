<script setup lang="ts">
type Curso = {
  id: number
  nome: string
  descricao: string
  duracao: number | string
}

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { data: curso } = await useAsyncData<Curso>("curso", () =>
  $api<Curso>(`/cursos/${route.params.id}`, {
    method: "GET",
  })
)

async function update() {
  await $api(`/cursos/${route.params.id}`, {
    method: "PATCH",
    body: curso.value,
  })

  router.push("/cursos")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Curso</h1>

    <div class="card">
      <input v-model="curso!.nome" class="input mb-2" />
      <input v-model="curso!.descricao" class="input mb-2" />
      <input v-model="curso!.duracao" class="input mb-4" />

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>