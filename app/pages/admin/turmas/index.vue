<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

import { ref, watch, onMounted } from 'vue'

const turmasStore = useTurmasStore()
const turmasComposable = useTurmas()
const cursosComposable = useCursos()
const { success, error } = useToast()
const formErrors = useFormErrors()

const isDrawerOpen = ref(false)
const isEditing = ref(false)
const currentTurma = ref<any>(null)
const isConfirmDialogOpen = ref(false)
const turmaToDelete = ref<number | null>(null)
const searchInput = ref("")
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const formData = ref({
  nome: "",
  curso_id: "",
  turno: "",
  ano_lectivo: new Date().getFullYear().toString(),
  semestre: "",
  capacidade_maxima: ""
})

const turnoOptions = [
  { label: "Manhã", value: "Manhã" },
  { label: "Tarde", value: "Tarde" },
  { label: "Nocturno", value: "Nocturno" }
]

const semestreOptions = [
  { label: "1º Semestre", value: "1" },
  { label: "2º Semestre", value: "2" }
]

const cursoOptions = computed(() => {
  const options = [{ label: "Todos os Cursos", value: "" }]
  const cursosList = cursosComposable.allCursos.length > 0 ? cursosComposable.allCursos : cursosComposable.cursos
  cursosList.forEach(curso => {
    options.push({ label: curso.nome, value: curso.id.toString() })
  })
  return options
})

const cursoOptionsForForm = computed(() => {
  const cursosList = cursosComposable.allCursos.length > 0 ? cursosComposable.allCursos : cursosComposable.cursos
  return cursosList.map(curso => ({
    label: curso.nome,
    value: curso.id.toString()
  }))
})

watch(searchInput, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    turmasComposable.searchQuery.value = newValue
  }, 400)
})

const openCreateDrawer = () => {
  isEditing.value = false
  currentTurma.value = null
  formData.value = {
    nome: "",
    curso_id: "",
    turno: "",
    ano_lectivo: new Date().getFullYear().toString(),
    semestre: "",
    capacidade_maxima: ""
  }
  formErrors.clearErrors()
  isDrawerOpen.value = true
}

const openEditDrawer = (turma: any) => {
  isEditing.value = true
  currentTurma.value = turma
  formData.value = {
    nome: turma.nome || "",
    curso_id: turma.curso_id?.toString() || "",
    turno: turma.turno || "",
    ano_lectivo: turma.ano_lectivo?.toString() || new Date().getFullYear().toString(),
    semestre: turma.semestre?.toString() || "",
    capacidade_maxima: turma.capacidade_maxima?.toString() || ""
  }
  formErrors.clearErrors()
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  currentTurma.value = null
}

const handleSubmit = async () => {
  try {
    if (isEditing.value && currentTurma.value) {
      await turmasComposable.update(currentTurma.value.id, formData.value)
    } else {
      await turmasComposable.create(formData.value)
    }
    closeDrawer()
    success(isEditing.value ? "Turma atualizada com sucesso" : "Turma criada com sucesso")
  } catch (e: any) {
    formErrors.handleApiError(e)
    error(e?.data?.message || "Erro ao salvar turma")
  }
}

const openDeleteConfirm = (id: number) => {
  turmaToDelete.value = id
  isConfirmDialogOpen.value = true
}

const cancelDelete = () => {
  isConfirmDialogOpen.value = false
  turmaToDelete.value = null
}

const confirmDelete = async () => {
  if (turmaToDelete.value) {
    try {
      await turmasComposable.remove(turmaToDelete.value)
      isConfirmDialogOpen.value = false
      turmaToDelete.value = null
    } catch (e) {
      // Error handled in composable
    }
  }
}

const viewTurma = (id: number) => {
  navigateTo(`/admin/turmas/${id}`)
}

onMounted(() => {
  turmasComposable.fetchAll()
  cursosComposable.fetchAll()
  cursosComposable.fetchAllCursos()
})
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestão de Turmas</h1>
        <p class="text-gray-600 mt-1">Gerencie todas as turmas da instituição</p>
      </div>
      <button @click="openCreateDrawer" class="mt-4 md:mt-0 px-4 py-2 rounded-lg text-white font-semibold transition" style="background-color: #C0120C;">
        + Nova Turma
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Buscar turma por nome..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="w-full md:w-64">
          <Select
            :modelValue="turmasComposable.cursoId"
            :options="cursoOptions"
            @update:modelValue="turmasComposable.cursoId = $event"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div v-for="turma in turmasComposable.turmas" :key="turma.id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-4 text-white" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);">
          <div class="flex justify-between items-start mb-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
              {{ turma.curso?.nome || 'Curso' }}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white text-purple-700">
              {{ turma.turno || 'Turno' }}
            </span>
          </div>
          <h3 class="text-xl font-bold">{{ turma.nome }}</h3>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm">{{ turma.ano_lectivo }} - {{ turma.semestre }}º Semestre</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="text-sm">{{ turma.disciplinas_count || 0 }} Disciplinas</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm">Capacidade: {{ turma.capacidade_maxima || 0 }} alunos</span>
          </div>

          <div class="flex gap-2 pt-3 border-t border-gray-100">
            <button @click="viewTurma(turma.id)" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              Detalhes
            </button>
            <button @click="openEditDrawer(turma)" class="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-white transition" style="background-color: #1f2937;">
              Editar
            </button>
            <button @click="openDeleteConfirm(turma.id)" class="px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition">
              🗑
            </button>
          </div>
        </div>
      </div>

      <div v-if="turmasComposable.turmas.length === 0 && !turmasComposable.loading" class="col-span-full text-center py-12 text-gray-500">
        Nenhuma turma encontrada
      </div>
    </div>

    <div v-if="turmasComposable.total > 0" class="flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Mostrando {{ (turmasComposable.page - 1) * turmasComposable.perPage + 1 }} - {{ Math.min(turmasComposable.page * turmasComposable.perPage, turmasComposable.total) }} de {{ turmasComposable.total }} turmas
      </div>
      <div class="flex gap-2">
        <Button variant="secondary" @click="turmasComposable.prev" :disabled="!turmasComposable.hasPrev">
          Anterior
        </Button>
        <Button variant="secondary" @click="turmasComposable.next" :disabled="!turmasComposable.hasNext">
          Próximo
        </Button>
      </div>
    </div>

    <Drawer :open="isDrawerOpen" position="right" @close="closeDrawer">
      <template #header>
        <h2 class="font-semibold text-lg text-gray-800">
          {{ isEditing ? 'Editar Turma' : 'Nova Turma' }}
        </h2>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Turma*</label>
          <Input
            v-model="formData.nome"
            placeholder="Turma A"
          />
          <p v-if="formErrors.hasError('nome')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('nome') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Curso*</label>
          <Select
            :modelValue="formData.curso_id"
            :options="cursoOptionsForForm"
            @update:modelValue="formData.curso_id = $event"
          />
          <p v-if="formErrors.hasError('curso_id')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('curso_id') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Turno*</label>
          <Select
            :modelValue="formData.turno"
            :options="turnoOptions"
            @update:modelValue="formData.turno = $event"
          />
          <p v-if="formErrors.hasError('turno')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('turno') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ano Lectivo*</label>
          <Input
            v-model="formData.ano_lectivo"
            type="number"
            :placeholder="new Date().getFullYear().toString()"
          />
          <p v-if="formErrors.hasError('ano_lectivo')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('ano_lectivo') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Semestre*</label>
          <Select
            :modelValue="formData.semestre"
            :options="semestreOptions"
            @update:modelValue="formData.semestre = $event"
          />
          <p v-if="formErrors.hasError('semestre')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('semestre') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Capacidade Máxima*</label>
          <Input
            v-model="formData.capacidade_maxima"
            type="number"
            placeholder="30"
          />
          <p v-if="formErrors.hasError('capacidade_maxima')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('capacidade_maxima') }}</p>
        </div>

        <div class="flex gap-2 pt-3">
          <Button type="button" variant="secondary" @click="closeDrawer" class="flex-1">
            Cancelar
          </Button>
          <Button type="submit" class="flex-1" style="background-color: #C0120C;">
            {{ isEditing ? 'Atualizar' : 'Criar' }}
          </Button>
        </div>
      </form>
    </Drawer>

    <ConfirmDialog :open="isConfirmDialogOpen" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>
