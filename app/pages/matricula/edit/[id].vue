<script setup lang="ts">
type Matricula = {
  id: number
  aluno_id: number
  curso_id: number
  estado: string
}

const route = useRoute()
const { $api } = useNuxtApp()
const router = useRouter()

const { data: matricula } = await useAsyncData<Matricula>(
  "matricula",
  () => $api(`/matriculas/${route.params.id}`)
)

async function update() {
  if (!matricula.value) return

  await $api(`/matriculas/${route.params.id}`, {
    method: "PATCH",
    body: matricula.value
  })

  router.push("/matriculas")
}
</script>