<script setup lang="ts">
type Matricula = {
  id: number
  aluno?: { nome: string }
  turma?: { nome: string }
  ano_letivo: string
  estado: string
}

const route = useRoute()
const { $api } = useNuxtApp()

const { data: matricula } = await useAsyncData<Matricula>(
  "matricula",
  () => $api(`/matriculas/${route.params.id}`)
)
</script>