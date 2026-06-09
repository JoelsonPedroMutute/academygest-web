<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive({
  nome: "",
  duracao: null as number | null,
  descricao: "",
})

const saving = ref(false)

async function submit() {
  if (!form.nome) {
    error("O nome é obrigatório.")
    return
  }

  saving.value = true

  try {
    await $api("/admin/cursos", {
      method: "POST",
      body: form,
    })

    success("Curso criado com sucesso.")
    router.push("/cursos")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao criar o curso.")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Curso</h1>

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
