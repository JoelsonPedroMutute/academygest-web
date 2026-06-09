<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("turma", () =>
  $api(`/admin/turmas/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">
        Detalhes da Turma
      </h1>

      <NuxtLink
        to="/turmas"
        class="text-gray-600"
      >
        Voltar
      </NuxtLink>
    </div>

    <div
      v-if="item"
      class="card space-y-2"
    >
      <p><strong>Nome:</strong> {{ item.nome }}</p>
      <p><strong>Curso:</strong> {{ item.curso?.nome }}</p>
      <p><strong>Ano Letivo:</strong> {{ item.ano_letivo }}</p>
      <p><strong>Semestre:</strong> {{ item.semestre }}</p>
      <p><strong>Turno:</strong> {{ item.turno }}</p>
      <p><strong>Capacidade:</strong> {{ item.capacidade }}</p>

      <div class="pt-3">
        <NuxtLink
          :to="`/turmas/edit/${item.id}`"
          class="btn-primary"
        >
          Editar
        </NuxtLink>
      </div>
    </div>

    <div
      v-else
      class="card text-gray-500"
    >
      Turma não encontrada.
    </div>
  </div>
</template>
