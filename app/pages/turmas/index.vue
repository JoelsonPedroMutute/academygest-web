<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("turmas", () => $api("/admin/turmas"))

const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">
        Turmas
      </h1>

      <NuxtLink
        to="/turmas/create"
        class="btn-primary"
      >
        Nova Turma
      </NuxtLink>
    </div>

    <div class="card">
      <table
        v-if="items.length"
        class="w-full text-left"
      >
        <thead>
          <tr class="border-b">
            <th class="py-2">
              Nome
            </th>
            <th class="py-2">
              Curso
            </th>
            <th class="py-2">
              Ano Letivo
            </th>
            <th class="py-2">
              Semestre
            </th>
            <th class="py-2">
              Turno
            </th>
            <th class="py-2">
              Capacidade
            </th>
            <th class="py-2 text-right">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in items"
            :key="row.id"
            class="border-b"
          >
            <td class="py-2">
              {{ row.nome }}
            </td>
            <td class="py-2">
              {{ row.curso?.nome }}
            </td>
            <td class="py-2">
              {{ row.ano_letivo }}
            </td>
            <td class="py-2">
              {{ row.semestre }}
            </td>
            <td class="py-2">
              {{ row.turno }}
            </td>
            <td class="py-2">
              {{ row.capacidade }}
            </td>
            <td class="py-2 text-right space-x-3">
              <NuxtLink
                :to="`/turmas/${row.id}`"
                class="text-blue-600"
              >
                Ver
              </NuxtLink>
              <NuxtLink
                :to="`/turmas/edit/${row.id}`"
                class="text-blue-600"
              >
                Editar
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        v-else
        class="text-gray-500 py-4 text-center"
      >
        Nenhuma turma encontrada.
      </p>
    </div>
  </div>
</template>
