<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { success, error } = useToast()

const { data: res } = await useAsyncData("disciplina-edit", () =>
  $api(`/admin/disciplinas/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)

const form = reactive<any>({
  nome: "",
  descricao: "",
  curso_id: null,
})

watchEffect(() => {
  if (item.value) {
    form.nome = item.value.nome ?? ""
    form.descricao = item.value.descricao ?? ""
    form.curso_id = item.value.curso_id ?? item.value.curso?.id ?? null
  }
})

const { data: cursosRes } = await useAsyncData("cursos-edit-disciplinas", () =>
  $api("/admin/cursos")
)

const cursos = computed<any[]>(
  () => (cursosRes.value as any)?.data ?? cursosRes.value ?? []
)

async function update() {
  try {
    await $api(`/admin/disciplinas/${route.params.id}`, {
      method: "PUT",
      body: form,
    })

    success("Disciplina atualizada com sucesso.")
    router.push("/disciplinas")
  } catch (e: any) {
    error("Erro ao atualizar disciplina.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Disciplina</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />

      <textarea
        v-model="form.descricao"
        class="input mb-2"
        placeholder="Descrição"
      />

      <select v-model="form.curso_id" class="input mb-4">
        <option :value="null">Selecionar Curso</option>

        <option v-for="c in cursos" :key="c.id" :value="c.id">
          {{ c.nome }}
        </option>
      </select>

      <button class="btn-primary" @click="update">
        Atualizar
      </button>
    </div>
  </div>
</template>
