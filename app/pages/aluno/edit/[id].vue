<script setup lang="ts">
type Aluno = {
  id: number
  nome: string
  email: string
}

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { data: aluno } = await useAsyncData<Aluno>("aluno", () =>
  $api<Aluno>(`/alunos/${route.params.id}`, {
    method: "GET",
  })
)

async function update() {
  await $api(`/alunos/${route.params.id}`, {
    method: "PATCH",
    body: aluno.value,
  })

  router.push("/alunos")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Aluno</h1>

    <div class="card">
      <input v-model="aluno!.nome" class="input mb-2" />
      <input v-model="aluno!.email" class="input mb-4" />

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>