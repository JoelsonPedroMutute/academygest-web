<script setup lang="ts">
type Aluno = { id: number; nome: string }
type Turma = { id: number; nome: string }

const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive({
  aluno_id: null as number | null,
  turma_id: null as number | null,
  ano_letivo: "",
  estado: "ativa",
})

const { data: alunos } = await useAsyncData<Aluno[]>(
  "alunos-select",
  () => $api("/alunos")
)

const { data: turmas } = await useAsyncData<Turma[]>(
  "turmas-select",
  () => $api("/turmas")
)

async function submit() {
  await $api("/matriculas", {
    method: "POST",
    body: form,
  })

  router.push("/matriculas")
}
</script>