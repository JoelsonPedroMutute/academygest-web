<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const { $api } = useNuxtApp()

const { data: res } = await useAsyncData("aluno", () =>
  $api(`/admin/alunos/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)

const nome = computed(() => item.value?.user?.name ?? item.value?.name)
const email = computed(() => item.value?.user?.email ?? item.value?.email)
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-bold">Detalhes do Aluno</h1>

      <NuxtLink
        v-if="item"
        :to="`/alunos/edit/${item.id}`"
        class="btn-primary"
      >
        Editar
      </NuxtLink>
    </div>

    <div class="card">
      <p><strong>Nome:</strong> {{ nome }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Nº Estudante:</strong> {{ item?.numero_estudante }}</p>
      <p><strong>Data de Nascimento:</strong> {{ item?.data_nascimento }}</p>
    </div>
  </div>
</template>
