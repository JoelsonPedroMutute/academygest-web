<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { success, error } = useToast()

const { data: res } = await useAsyncData(
  `curso-edit-${route.params.id}`,
  () => $api(`/admin/cursos/${route.params.id}`)
)

const item = computed<any>(() => (res.value as any)?.data ?? res.value)

const form = reactive({
  nome: "",
  duracao: null as number | null,
  descricao: "",
})

watchEffect(() => {
  if (item.value) {
    form.nome = item.value.nome ?? ""
    form.duracao = item.value.duracao ?? null
    form.descricao = item.value.descricao ?? ""
  }
})

const saving = ref(false)

async function submit() {
  if (!form.nome) {
    error("O nome é obrigatório.")
    return
  }

  saving.value = true

  try {
    await $api(`/admin/cursos/${route.params.id}`, {
      method: "PUT",
      body: form,
    })

    success("Curso atualizado com sucesso.")
    router.push("/cursos")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao atualizar o curso.")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Editar Curso</h1>

    <form class="card space-y-3" @submit.prevent="submit">
      <div>
        <label class="block text-sm text-gray-500 mb-1">Nome</label>
        <input v-model="form.nome" class="input" placeholder="Nome" required />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-1">Duração</label>
        <input
          v-model.number="form.duracao"
          type="number"
          step="1"
          class="input"
          placeholder="Duração"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-500 mb-1">Descrição</label>
        <textarea
          v-model="form.descricao"
          class="input"
          rows="4"
          placeholder="Descrição"
        ></textarea>
      </div>

      <button type="submit" class="btn-primary" :disabled="saving">
        Guardar
      </button>
    </form>
  </div>
</template>
