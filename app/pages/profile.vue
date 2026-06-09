<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { user, logout } = useAuth();
const { $api } = useNuxtApp();
const { success, error } = useToast();

const isAluno = computed(() => user.value?.role === 'aluno');
const isDocente = computed(() => user.value?.role === 'docente');
const editable = computed(() => isAluno.value || isDocente.value);

const form = reactive<any>({
  name: '',
  email: '',
  telefone: '',
  especialidade: '',
  data_nascimento: '',
  numero_estudante: '',
  turma_id: '',
});

const saving = ref(false);

onMounted(async () => {
  // Pré-preenche com o que já temos
  form.name = user.value?.name ?? '';
  form.email = user.value?.email ?? '';

  try {
    const data: any = await $api('/auth/perfil');
    const u = data?.user ?? data ?? {};
    const profile = data?.aluno ?? data?.docente ?? data ?? {};
    form.name = u.name ?? form.name;
    form.email = u.email ?? form.email;
    form.telefone = profile.telefone ?? u.telefone ?? '';
    form.especialidade = profile.especialidade ?? '';
    form.data_nascimento = profile.data_nascimento ?? '';
    form.numero_estudante = profile.numero_estudante ?? '';
    form.turma_id = profile.turma_id ?? '';
  } catch (e) {
    // mantém os valores do store
  }
});

async function save() {
  saving.value = true;
  try {
    if (isAluno.value) {
      await $api('/aluno/perfil', {
        method: 'PATCH',
        body: {
          name: form.name,
          email: form.email,
          data_nascimento: form.data_nascimento || null,
          numero_estudante: form.numero_estudante || null,
          turma_id: form.turma_id || null,
        },
      });
    } else if (isDocente.value) {
      await $api('/docente/perfil', {
        method: 'PATCH',
        body: {
          name: form.name,
          email: form.email,
          telefone: form.telefone || null,
          especialidade: form.especialidade || null,
          data_nascimento: form.data_nascimento || null,
        },
      });
    }
    success('Perfil atualizado com sucesso');
  } catch (e: any) {
    error(e?.data?.message ?? 'Erro ao atualizar perfil');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="p-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

      <!-- Cabeçalho -->
      <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
        <div class="w-16 h-16 rounded-full bg-[#C0120C] flex items-center justify-center text-white text-xl font-bold">
          {{ (form.name || user?.name)?.charAt(0)?.toUpperCase() || 'U' }}
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-800">{{ form.name || user?.name }}</h2>
          <p class="text-gray-500">{{ form.email || user?.email }}</p>
          <span class="inline-block mt-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {{ user?.role }}
          </span>
        </div>
      </div>

      <!-- Formulário editável (aluno/docente) -->
      <form v-if="editable" @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input v-model="form.name" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" class="input" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
          <input v-model="form.data_nascimento" type="date" class="input" />
        </div>

        <template v-if="isAluno">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nº de estudante</label>
            <input v-model="form.numero_estudante" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ID da Turma</label>
            <input v-model="form.turma_id" type="number" class="input" />
          </div>
        </template>

        <template v-if="isDocente">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input v-model="form.telefone" class="input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
            <input v-model="form.especialidade" class="input" />
          </div>
        </template>

        <div class="flex items-center gap-3 pt-2">
          <button type="submit" class="btn-primary disabled:opacity-60" :disabled="saving">
            {{ saving ? 'A guardar...' : 'Guardar alterações' }}
          </button>
          <button type="button" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" @click="logout">
            Sair da Conta
          </button>
        </div>
      </form>

      <!-- Admin: sem edição de perfil disponível no backend -->
      <div v-else>
        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" @click="logout">
          Sair da Conta
        </button>
      </div>
    </div>
  </div>
</template>
