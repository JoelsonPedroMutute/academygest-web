<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("notas", () => $api("/admin/notas"))
const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Notas</h1>

      <NuxtLink to="/notas/create" class="btn-primary">
        Nova Nota
      </NuxtLink>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplina</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Média</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in items"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gray-50"
          >
            <td class="px-4 py-3 text-sm text-gray-900">
              {{ row.aluno?.user?.name ?? row.aluno?.nome ?? "—" }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {{ row.disciplina?.nome ?? "—" }}
            </td>
            <td class="px-4 py-3 text-sm font-medium text-gray-900">
              {{ row.media_final ?? "—" }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {{ row.situacao ?? "—" }}
            </td>
            <td class="px-4 py-3 text-sm">
              <NuxtLink :to="`/notas/${row.id}`" class="text-blue-600 mr-3">Ver</NuxtLink>
              <NuxtLink :to="`/notas/edit/${row.id}`" class="text-gray-600">Editar</NuxtLink>
            </td>
          </tr>

          <tr v-if="items.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-gray-500">
              Nenhuma nota registada.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
