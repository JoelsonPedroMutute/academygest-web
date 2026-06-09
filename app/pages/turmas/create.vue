<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive<{
  nome: string
  curso_id: number | null
  ano_letivo: string
  semestre: number | null
  capacidade: number | null
  turno: string
}>({
  nome: "",
  curso_id: null,
  ano_letivo: "",
  semestre: null,
  capacidade: null,
  turno: "",
})

const { data: cursosRes } = await useAsyncData("cursos-create", () =>
  $api("/admin/cursos")
)

const cursos = computed<any[]>(
  () => (cursosRes.value as any)?.data ?? cursosRes.value ?? []
)

const saving = ref(false)

async function submit() {
  saving.value = true
  try {
    await $api("/admin/turmas", { method: "POST", body: form })
    success("Turma criada com sucesso")
    router.push("/turmas")
  } catch (e: any) {
    error(e?.data?.message ?? "Erro ao criar turma")
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">
      Nova Turma
    </h1>

    <div class="card space-y-3 max-w-lg">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          v-model="form.nome"
          type="text"
          class="input"
          placeholder="Nome da turma"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Curso</label>
        <select
          v-model="form.curso_id"
          class="input"
        >
          <option :value="null">
            Selecionar curso
          </option>
          <option
            v-for="c in cursos"
            :key="c.id"
            :value="c.id"
          >
            {{ c.nome }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ano Letivo</label>
        <input
          v-model="form.ano_letivo"
          type="text"
          class="input"
          placeholder="Ex: 2025/2026"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Semestre</label>
        <select
          v-model.number="form.semestre"
          class="input"
        >
          <option :value="null">
            Selecionar semestre
          </option>
          <option :value="1">
            1
          </option>
          <option :value="2">
            2
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
        <input
          v-model.number="form.capacidade"
          type="number"
          min="0"
          class="input"
          placeholder="Ex: 30"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Turno</label>
        <select
          v-model="form.turno"
          class="input"
        >
          <option value="">
            Selecionar turno
          </option>
          <option value="Manha">
            Manhã
          </option>
          <option value="Tarde">
            Tarde
          </option>
          <option value="Noite">
            Noite
          </option>
        </select>
      </div>

      <div class="flex gap-2 pt-2">
        <button
          class="btn-primary disabled:opacity-60"
          :disabled="saving"
          @click="submit"
        >
          {{ saving ? "A guardar..." : "Criar" }}
        </button>
        <NuxtLink
          to="/turmas"
          class="text-gray-600 px-4 py-2"
        >
          Cancelar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
