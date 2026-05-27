<script setup lang="ts">
type Aluno = { id: number; nome: string }
type Turma = { id: number; nome: string }
type NotaCreate = {
  aluno_id: number | null
  turma_id: number | null
  valor: number | null
  semestre: string
}

const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive<NotaCreate>({
  aluno_id: null,
  turma_id: null,
  valor: null,
  semestre: "",
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
  await $api("/notas", {
    method: "POST",
    body: form,
  })

  router.push("/notas")
}
</script>