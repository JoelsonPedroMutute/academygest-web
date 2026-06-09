<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("matriculas", () => $api("/admin/matriculas"))

const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Matrículas</h1>

      <NuxtLink to="/matriculas/create" class="btn-primary">
        Nova Matrícula
      </NuxtLink>
    </div>

    <div class="card">
      <table v-if="items.length" class="w-full text-left">
        <thead>
          <tr class="border-b text-sm text-gray-500">
            <th class="py-2">Aluno</th>
            <th class="py-2">Turma</th>
            <th class="py-2">Ano letivo</th>
            <th class="py-2">Status</th>
            <th class="py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in items"
            :key="row.id"
            class="border-b"
          >
            <td class="py-2">{{ row.aluno?.user?.name ?? row.aluno?.nome ?? "—" }}</td>
            <td class="py-2">{{ row.turma?.nome ?? "—" }}</td>
            <td class="py-2">{{ row.ano_letivo ?? "—" }}</td>
            <td class="py-2">{{ row.status ?? "—" }}</td>
            <td class="py-2 text-right">
              <NuxtLink :to="`/matriculas/${row.id}`" class="text-blue-600 mr-3">
                Ver
              </NuxtLink>
              <NuxtLink :to="`/matriculas/edit/${row.id}`" class="text-blue-600">
                Editar
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-gray-500 py-4 text-center">
        Nenhuma matrícula encontrada.
      </p>
    </div>
  </div>
</template>
