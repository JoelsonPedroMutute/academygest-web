<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("cursos", () => $api("/admin/cursos"))

const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Cursos</h1>

      <NuxtLink to="/cursos/create" class="btn-primary">
        Novo Curso
      </NuxtLink>
    </div>

    <div class="card">
      <p v-if="items.length === 0" class="text-gray-500 py-4 text-center">
        Nenhum curso encontrado.
      </p>

      <div
        v-for="row in items"
        :key="row.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ row.nome }}</p>
          <p class="text-sm text-gray-500">Duração: {{ row.duracao }}</p>
        </div>

        <div class="flex gap-4">
          <NuxtLink :to="`/cursos/${row.id}`" class="text-blue-600">
            Ver
          </NuxtLink>

          <NuxtLink :to="`/cursos/edit/${row.id}`" class="text-blue-600">
            Editar
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
