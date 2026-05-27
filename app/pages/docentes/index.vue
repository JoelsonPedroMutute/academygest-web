<script setup lang="ts">
type Aluno = {
  id: number
  nome: string
  email: string
}

const route = useRoute()
const { $api } = useNuxtApp()
const router = useRouter()

const { data: aluno } = await useAsyncData<Aluno>(
  "aluno",
  () => $api(`/alunos/${route.params.id}`)
)

async function update() {
  if (!aluno.value) return

  await $api(`/alunos/${route.params.id}`, {
    method: "PATCH",
    body: aluno.value
  })

  router.push("/alunos")
}
</script>