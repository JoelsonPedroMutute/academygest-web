<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData(
  `matricula-${route.params.id}`,
  () => $api(`/admin/matriculas/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Detalhes da Matrícula</h1>

      <div class="flex gap-2">
        <NuxtLink :to="`/matriculas/edit/${route.params.id}`" class="btn-primary">
          Editar
        </NuxtLink>
        <NuxtLink to="/matriculas" class="text-gray-600 px-4 py-2">
          Voltar
        </NuxtLink>
      </div>
    </div>

    <div v-if="item" class="card space-y-2">
      <p><strong>Aluno:</strong> {{ item.aluno?.user?.name ?? item.aluno?.nome ?? "—" }}</p>
      <p><strong>Turma:</strong> {{ item.turma?.nome ?? "—" }}</p>
      <p><strong>Ano letivo:</strong> {{ item.ano_letivo ?? "—" }}</p>
      <p><strong>Semestre:</strong> {{ item.semestre ?? "—" }}</p>
      <p><strong>Data de matrícula:</strong> {{ item.data_matricula ?? "—" }}</p>
      <p><strong>Status:</strong> {{ item.status ?? "—" }}</p>
    </div>

    <div v-else class="card text-gray-500">
      Matrícula não encontrada.
    </div>
  </div>
</template>
