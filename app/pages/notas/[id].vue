<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData(
  `nota-${route.params.id}`,
  () => $api(`/admin/notas/${route.params.id}`)
)
const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">Detalhes da Nota</h1>

    <div v-if="item" class="card mt-4 space-y-2">
      <p><strong>Aluno:</strong> {{ item.aluno?.user?.name ?? item.aluno?.nome ?? "—" }}</p>
      <p><strong>Disciplina:</strong> {{ item.disciplina?.nome ?? "—" }}</p>
      <p><strong>Prova Trimestral:</strong> {{ item.prova_trimestral ?? "—" }}</p>
      <p><strong>Prova Semestral:</strong> {{ item.prova_semestral ?? "—" }}</p>
      <p><strong>Exame Final:</strong> {{ item.exame_final ?? "—" }}</p>
      <p><strong>Média Final:</strong> {{ item.media_final ?? "—" }}</p>
      <p><strong>Situação:</strong> {{ item.situacao ?? "—" }}</p>

      <div class="pt-2">
        <NuxtLink :to="`/notas/edit/${item.id}`" class="btn-primary">Editar</NuxtLink>
        <NuxtLink to="/notas" class="text-gray-600 px-4 py-2">Voltar</NuxtLink>
      </div>
    </div>

    <div v-else class="card mt-4 text-gray-500">
      Nota não encontrada.
    </div>
  </div>
</template>
