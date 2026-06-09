<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "admin" })

const { $api } = useNuxtApp()
const { success, error } = useToast()

const { data: res, refresh } = await useAsyncData(
  "docentes-pending",
  () => $api("/admin/docentes/pending")
)
const items = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])

const processing = ref<number | null>(null)

async function approve(id: number) {
  processing.value = id
  try {
    await $api(`/admin/docentes/${id}/approve`, { method: "POST" })
    success("Docente aprovado com sucesso")
    await refresh()
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao aprovar docente")
  } finally {
    processing.value = null
  }
}

async function reject(id: number) {
  processing.value = id
  try {
    await $api(`/admin/docentes/${id}/reject`, { method: "POST" })
    success("Docente rejeitado")
    await refresh()
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao rejeitar docente")
  } finally {
    processing.value = null
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-xl font-bold">Docentes Pendentes</h1>
        <p class="text-gray-500 text-sm">Aprovação de novos registos de docentes</p>
      </div>
      <NuxtLink to="/docentes" class="text-gray-600 px-4 py-2">Todos os docentes</NuxtLink>
    </div>

    <div class="card">
      <div
        v-for="row in items"
        :key="row.id"
        class="border-b py-3 flex justify-between items-center"
      >
        <div>
          <p class="font-medium text-gray-900">
            {{ row.user?.name ?? row.name ?? "Sem nome" }}
          </p>
          <p class="text-sm text-gray-500">
            {{ row.user?.email ?? row.email ?? "—" }} · {{ row.especialidade ?? "—" }}
          </p>
        </div>

        <div class="flex gap-2">
          <button
            class="btn-primary disabled:opacity-60"
            :disabled="processing === row.id"
            @click="approve(row.id)"
          >
            Aprovar
          </button>
          <button
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-60"
            :disabled="processing === row.id"
            @click="reject(row.id)"
          >
            Rejeitar
          </button>
        </div>
      </div>

      <div v-if="items.length === 0" class="py-6 text-center text-gray-500">
        Nenhum docente pendente.
      </div>
    </div>
  </div>
</template>
