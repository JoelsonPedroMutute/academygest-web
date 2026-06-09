<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("alunos", () => $api("/admin/alunos"))

const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])

function nome(row: any) {
  return row.user?.name ?? row.name
}
function email(row: any) {
  return row.user?.email ?? row.email
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Alunos</h1>

      <NuxtLink to="/alunos/create" class="btn-primary">
        Novo
      </NuxtLink>
    </div>

    <div class="card">
      <div v-if="items.length === 0" class="py-4 text-gray-500">
        Nenhum aluno encontrado.
      </div>

      <div
        v-for="row in items"
        :key="row.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <div class="font-medium">{{ nome(row) }}</div>
          <div class="text-sm text-gray-500">
            {{ email(row) }}
            <span v-if="row.numero_estudante"> · Nº {{ row.numero_estudante }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <NuxtLink :to="`/alunos/${row.id}`" class="text-blue-600">
            Ver
          </NuxtLink>
          <NuxtLink :to="`/alunos/edit/${row.id}`" class="text-blue-600">
            Editar
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
