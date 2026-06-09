<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("disciplinas", () =>
  $api("/admin/disciplinas")
)

const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Disciplinas</h1>

      <NuxtLink to="/disciplinas/create" class="btn-primary">
        Nova Disciplina
      </NuxtLink>
    </div>

    <div class="card">
      <div v-if="items.length === 0" class="py-8 text-center text-gray-500">
        Nenhuma disciplina encontrada.
      </div>

      <div
        v-for="row in items"
        :key="row.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ row.nome }}</p>
          <p class="text-sm text-gray-500">Curso: {{ row.curso?.nome }}</p>
        </div>

        <div class="flex gap-3">
          <NuxtLink :to="`/disciplinas/${row.id}`" class="text-blue-600">
            Ver
          </NuxtLink>

          <NuxtLink
            :to="`/disciplinas/edit/${row.id}`"
            class="text-blue-600"
          >
            Editar
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
