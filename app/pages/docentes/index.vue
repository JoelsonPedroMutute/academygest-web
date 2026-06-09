<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("docentes", () => $api("/admin/docentes"))
const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Docentes</h1>

      <div class="flex gap-2 items-center">
        <NuxtLink to="/admin/docentes/pending" class="text-[#C0120C] font-medium px-3 py-2">
          Pendentes
        </NuxtLink>
        <NuxtLink to="/docentes/create" class="btn-primary">
          Novo Docente
        </NuxtLink>
      </div>
    </div>

    <div class="card">
      <div
        v-for="row in items"
        :key="row.id"
        class="border-b py-2 flex justify-between items-center"
      >
        <div>
          <p class="font-medium text-gray-900">
            {{ row.user?.name ?? row.name ?? "Sem nome" }}
          </p>
          <p class="text-sm text-gray-500">
            {{ row.user?.email ?? row.email ?? "—" }}
          </p>
          <p class="text-sm text-gray-500">
            {{ row.especialidade ?? "—" }} · {{ row.telefone ?? "—" }}
          </p>
        </div>

        <div class="flex gap-3 text-sm">
          <NuxtLink :to="`/docentes/${row.id}`" class="text-gray-600">
            Ver
          </NuxtLink>
          <NuxtLink :to="`/docentes/edit/${row.id}`" class="text-blue-600">
            Editar
          </NuxtLink>
        </div>
      </div>

      <div v-if="items.length === 0" class="py-6 text-center text-gray-500">
        Nenhum docente encontrado.
      </div>
    </div>
  </div>
</template>
