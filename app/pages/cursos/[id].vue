<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const route = useRoute()

const { data: res } = await useAsyncData(
  `curso-${route.params.id}`,
  () => $api(`/admin/cursos/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Detalhes do Curso</h1>

      <div class="flex gap-4">
        <NuxtLink to="/cursos" class="text-blue-600">Voltar</NuxtLink>

        <NuxtLink
          v-if="item"
          :to="`/cursos/edit/${item.id}`"
          class="text-blue-600"
        >
          Editar
        </NuxtLink>
      </div>
    </div>

    <div v-if="item" class="card space-y-3">
      <div>
        <p class="text-sm text-gray-500">Nome</p>
        <p class="font-medium">{{ item.nome }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Duração</p>
        <p class="font-medium">{{ item.duracao }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Descrição</p>
        <p class="font-medium">{{ item.descricao }}</p>
      </div>
    </div>

    <div v-else class="card">
      <p class="text-gray-500 py-4 text-center">Curso não encontrado.</p>
    </div>
  </div>
</template>
