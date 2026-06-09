<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("disciplina", () =>
  $api(`/admin/disciplinas/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes da Disciplina</h1>

    <div class="card mt-4">
      <p><strong>Nome:</strong> {{ item?.nome }}</p>
      <p><strong>Curso:</strong> {{ item?.curso?.nome }}</p>
      <p><strong>Descrição:</strong> {{ item?.descricao }}</p>
    </div>
  </div>
</template>
