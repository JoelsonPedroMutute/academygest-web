<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

import { ref, watch, onMounted } from 'vue'

const disciplinasStore = useDisciplinasStore()
const disciplinasComposable = useDisciplinas()
const cursosComposable = useCursos()
const { success, error } = useToast()
const formErrors = useFormErrors()

// Drawer state
const isDrawerOpen = ref(false)
const isEditing = ref(false)
const currentDisciplina = ref<any>(null)

// Confirm dialog state
const isConfirmDialogOpen = ref(false)
const disciplinaToDelete = ref<number | null>(null)

// Search debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const searchInput = ref("")

// Form data
const formData = ref({
  nome: "",
  curso_id: "",
  carga_horaria: "",
  semestre: "",
  descricao: ""
})

// Semestre options
const semestreOptions = [
  { label: "Todos os Semestres", value: "" },
  { label: "1º Semestre", value: "1" },
  { label: "2º Semestre", value: "2" },
  { label: "3º Semestre", value: "3" }
]

// Curso options for select
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

// Handle search with debounce
watch(searchInput, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    disciplinasComposable.searchQuery.value = newValue
  }, 400)
})

// Open drawer for create
const openCreateDrawer = () => {
  isEditing.value = false
  currentDisciplina.value = null
  formData.value = {
    nome: "",
    curso_id: "",
    carga_horaria: "",
    semestre: "",
    descricao: ""
  }
  formErrors.clearErrors()
  isDrawerOpen.value = true
}

// Open drawer for edit
const openEditDrawer = (disciplina: any) => {
  isEditing.value = true
  currentDisciplina.value = disciplina
  formData.value = {
    nome: disciplina.nome || "",
    curso_id: disciplina.curso_id?.toString() || "",
    carga_horaria: disciplina.carga_horaria?.toString() || "",
    semestre: disciplina.semestre?.toString() || "",
    descricao: disciplina.descricao || ""
  }
  formErrors.clearErrors()
  isDrawerOpen.value = true
}

// Close drawer
const closeDrawer = () => {
  isDrawerOpen.value = false
  currentDisciplina.value = null
}

// Handle form submit
const handleSubmit = async () => {
  try {
    if (isEditing.value && currentDisciplina.value) {
      await disciplinasComposable.update(currentDisciplina.value.id, formData.value)
    } else {
      await disciplinasComposable.create(formData.value)
    }
    closeDrawer()
    success(isEditing.value ? "Disciplina atualizada com sucesso" : "Disciplina criada com sucesso")
  } catch (e: any) {
    formErrors.handleApiError(e)
    error(e?.data?.message || "Erro ao salvar disciplina")
  }
}

// Delete confirmation
const openDeleteConfirm = (id: number) => {
  disciplinaToDelete.value = id
  isConfirmDialogOpen.value = true
}

const cancelDelete = () => {
  isConfirmDialogOpen.value = false
  disciplinaToDelete.value = null
}

const confirmDelete = async () => {
  if (disciplinaToDelete.value) {
    try {
      await disciplinasComposable.remove(disciplinaToDelete.value)
      isConfirmDialogOpen.value = false
      disciplinaToDelete.value = null
    } catch (e) {
      // Error handled in composable
    }
  }
}

// Navigate to view
const viewDisciplina = (id: number) => {
  navigateTo(`/admin/disciplinas/${id}`)
}

// Fetch data on mount
onMounted(() => {
  disciplinasComposable.fetchAll()
  cursosComposable.fetchAll()
  cursosComposable.fetchAllCursos()
})
</script>

<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestão de Disciplinas</h1>
        <p class="text-gray-600 mt-1">Gerencie todas as disciplinas da instituição</p>
      </div>
      <Button @click="openCreateDrawer" class="mt-4 md:mt-0" style="background-color: #C0120C;">
        + Nova Disciplina
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Buscar disciplina por nome..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="w-full md:w-48">
          <Select
            :modelValue="disciplinasComposable.cursoId"
            :options="cursoOptions"
            @update:modelValue="disciplinasComposable.cursoId = $event"
          />
        </div>
        <div class="w-full md:w-48">
          <Select
            :modelValue="disciplinasComposable.semestre"
            :options="semestreOptions"
            @update:modelValue="disciplinasComposable.semestre = $event"
          />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <template #header>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplina</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horária</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </template>

        <tr v-for="disciplina in disciplinasComposable.disciplinas" :key="disciplina.id" class="border-b border-gray-200 hover:bg-gray-50">
          <td class="px-4 py-4 whitespace-nowrap">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-900">{{ disciplina.nome }}</div>
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-600">{{ disciplina.curso?.nome || '-' }}</div>
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-600">{{ disciplina.carga_horaria }}h</div>
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
              {{ disciplina.semestre }}º Semestre
            </span>
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm">
            <button @click="viewDisciplina(disciplina.id)" class="text-blue-600 hover:text-blue-800 mr-3 font-medium">
              Ver
            </button>
            <button @click="openEditDrawer(disciplina)" class="text-gray-600 hover:text-gray-800 mr-3 font-medium">
              Editar
            </button>
            <button @click="openDeleteConfirm(disciplina.id)" class="text-red-600 hover:text-red-800 font-medium">
              Excluir
            </button>
          </td>
        </tr>

        <tr v-if="disciplinasComposable.disciplinas.length === 0 && !disciplinasComposable.loading">
          <td colspan="6" class="px-4 py-8 text-center text-gray-500">
            Nenhuma disciplina encontrada
          </td>
        </tr>
      </Table>
    </div>

    <!-- Pagination -->
    <div v-if="disciplinasComposable.total > 0" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-500">
        Mostrando {{ (disciplinasComposable.page - 1) * disciplinasComposable.perPage + 1 }} - {{ Math.min(disciplinasComposable.page * disciplinasComposable.perPage, disciplinasComposable.total) }} de {{ disciplinasComposable.total }} disciplinas
      </div>
      <div class="flex gap-2">
        <Button variant="secondary" @click="disciplinasComposable.prev" :disabled="!disciplinasComposable.hasPrev">
          Anterior
        </Button>
        <Button variant="secondary" @click="disciplinasComposable.next" :disabled="!disciplinasComposable.hasNext">
          Próximo
        </Button>
      </div>
    </div>

    <!-- Drawer for Create/Edit -->
    <Drawer :open="isDrawerOpen" position="right" @close="closeDrawer">
      <template #header>
        <h2 class="font-semibold text-lg text-gray-800">
          {{ isEditing ? 'Editar Disciplina' : 'Nova Disciplina' }}
        </h2>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <Input
            v-model="formData.nome"
            placeholder="Nome da disciplina"
          />
          <p v-if="formErrors.hasError('nome')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('nome') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Curso *</label>
          <Select
            :modelValue="formData.curso_id"
            :options="cursoOptionsForForm"
            @update:modelValue="formData.curso_id = $event"
          />
          <p v-if="formErrors.hasError('curso_id')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('curso_id') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Carga Horária *</label>
          <Input
            v-model="formData.carga_horaria"
            type="number"
            placeholder="45"
          />
          <p v-if="formErrors.hasError('carga_horaria')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('carga_horaria') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Semestre *</label>
          <Select
            :modelValue="formData.semestre"
            :options="semestreOptions.slice(1)"
            @update:modelValue="formData.semestre = $event"
          />
          <p v-if="formErrors.hasError('semestre')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('semestre') }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <Textarea
            v-model="formData.descricao"
            placeholder="Descrição da disciplina"
          />
          <p v-if="formErrors.hasError('descricao')" class="mt-1 text-sm text-red-600">{{ formErrors.getError('descricao') }}</p>
        </div>

        <div class="flex gap-3 pt-4">
          <Button type="button" variant="secondary" @click="closeDrawer" class="flex-1">
            Cancelar
          </Button>
          <Button type="submit" class="flex-1" style="background-color: #C0120C;">
            {{ isEditing ? 'Atualizar' : 'Criar' }}
          </Button>
        </div>
      </form>
    </Drawer>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog :open="isConfirmDialogOpen" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>
