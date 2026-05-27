<script setup lang="ts">
const user = process.client
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null

const menu = computed(() => {
  if (user?.role === "admin") return [
    { name: "Dashboard", to: "/dashboard/admin" },
    { name: "Alunos", to: "/alunos" },
    { name: "Docentes", to: "/docentes" },
    { name: "Cursos", to: "/cursos" },
    { name: "Turmas", to: "/turmas" },
  ]

  if (user?.role === "docente") return [
    { name: "Dashboard", to: "/dashboard/docente" },
    { name: "Turmas", to: "/turmas" },
    { name: "Notas", to: "/notas" },
    { name: "Frequências", to: "/frequencias" },
  ]

  return [
    { name: "Dashboard", to: "/dashboard/aluno" },
    { name: "Minhas Notas", to: "/notas" },
    { name: "Frequência", to: "/frequencias" },
  ]
})
</script>

<template>
  <aside class="w-64 h-screen bg-gray-900 text-white p-4">
    <h1 class="text-xl font-bold mb-6">AcademyGest</h1>

    <nav class="space-y-2">
      <NuxtLink
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="block p-2 rounded hover:bg-gray-700"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </aside>
</template>