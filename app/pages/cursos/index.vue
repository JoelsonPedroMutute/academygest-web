<script setup lang="ts">
const { $api } = useNuxtApp()

const { data: cursos } = await useAsyncData("cursos", () =>
  $api.get("/cursos")
)
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
      <div
        v-for="curso in cursos"
        :key="curso.id"
        class="border-b py-2 flex justify-between"
      >
        <NuxtLink :to="`/cursos/${curso.id}`">
          {{ curso.nome }}
        </NuxtLink>

        <NuxtLink
          :to="`/cursos/edit/${curso.id}`"
          class="text-blue-600"
        >
          Editar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>