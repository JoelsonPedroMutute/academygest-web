<script setup lang="ts">
type Docente = {
  id: number
  nome: string
  email: string
  especialidade: string
}

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

const { data: docente } = await useAsyncData<Docente>(
  "docente",
  () =>
    $api<Docente>(`/docentes/${route.params.id}`, {
      method: "GET",
    })
)

async function update() {
  await $api(`/docentes/${route.params.id}`, {
    method: "PATCH",
    body: docente.value,
  })

  router.push("/docentes")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Docente</h1>

    <div class="card">
      <input v-model="docente!.nome" class="input mb-2" />
      <input v-model="docente!.email" class="input mb-2" />
      <input v-model="docente!.especialidade" class="input mb-4" />

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>