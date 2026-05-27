<script setup lang="ts">
type Curso = {
  id: number
  nome: string
}

type TurmaForm = {
  nome: string
  ano: string
  curso_id: number | null
}

const router = useRouter()
const { $api } = useNuxtApp()

const form = ref<TurmaForm>({
  nome: "",
  ano: "",
  curso_id: null,
})

const { data: cursos } = await useAsyncData<Curso[]>(
  "cursos-create",
  () => $api("/cursos")
)

async function create() {
  await $api("/turmas", {
    method: "POST",
    body: form.value,
  })

  router.push("/turmas")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">
      Nova Turma
    </h1>

    <div class="card">
      <input
        v-model="form.nome"
        type="text"
        placeholder="Nome da turma"
        class="input mb-2"
      />

      <input
        v-model="form.ano"
        type="text"
        placeholder="Ano"
        class="input mb-2"
      />

      <select
        v-model="form.curso_id"
        class="input mb-4"
      >
        <option :value="null">
          Selecionar curso
        </option>

        <option
          v-for="curso in cursos || []"
          :key="curso.id"
          :value="curso.id"
        >
          {{ curso.nome }}
        </option>
      </select>

      <button
        class="btn-primary"
        @click="create"
      >
        Criar
      </button>
    </div>
  </div>
</template>