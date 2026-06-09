<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("docente", () =>
  $api(`/admin/docentes/${route.params.id}`)
)
const item = computed<any>(() => (res.value as any)?.data ?? res.value)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Detalhes do Docente</h1>
      <NuxtLink :to="`/docentes/edit/${route.params.id}`" class="btn-primary">
        Editar
      </NuxtLink>
    </div>

    <div class="card">
      <p class="mb-2">
        <strong>Nome:</strong> {{ item?.user?.name ?? item?.name ?? "—" }}
      </p>
      <p class="mb-2">
        <strong>Email:</strong> {{ item?.user?.email ?? item?.email ?? "—" }}
      </p>
      <p class="mb-2">
        <strong>Especialidade:</strong> {{ item?.especialidade ?? "—" }}
      </p>
      <p class="mb-2">
        <strong>Telefone:</strong> {{ item?.telefone ?? "—" }}
      </p>
      <p class="mb-2">
        <strong>Data de Nascimento:</strong> {{ item?.data_nascimento ?? "—" }}
      </p>
    </div>
  </div>
</template>
