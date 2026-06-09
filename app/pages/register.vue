<script setup lang="ts">
import { Loader2 } from '@lucide/vue';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const api = useApi();
const router = useRouter();
const { success, error } = useToast();

const tipo = ref<'aluno' | 'docente'>('aluno');
const isLoading = ref(false);
const errors = ref<Record<string, string[]>>({});

// Campos partilhados
const common = reactive({
  name: '',
  email: '',
  data_nascimento: '',
});

// Específicos de aluno
const aluno = reactive({
  password: '',
  password_confirmation: '',
  turma_id: '' as string | number,
});

// Específicos de docente
const docente = reactive({
  telefone: '',
  especialidade: '',
});

const handleSubmit = async () => {
  errors.value = {};
  isLoading.value = true;
  try {
    if (tipo.value === 'aluno') {
      await api.post('/auth/register/aluno', {
        name: common.name,
        email: common.email,
        data_nascimento: common.data_nascimento,
        password: aluno.password,
        password_confirmation: aluno.password_confirmation,
        turma_id: aluno.turma_id,
      });
      success('Conta criada! Já pode iniciar sessão.');
    } else {
      await api.post('/auth/register/docente', {
        name: common.name,
        email: common.email,
        data_nascimento: common.data_nascimento,
        telefone: docente.telefone,
        especialidade: docente.especialidade,
      });
      success('Registo enviado! Aguarde a aprovação do administrador.');
    }
    await router.push('/login');
  } catch (err: any) {
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors;
    } else {
      error(err?.data?.message ?? 'Não foi possível concluir o registo.');
    }
  } finally {
    isLoading.value = false;
  }
};

const fieldError = (f: string) => errors.value[f]?.[0];
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#F3F4F6] overflow-hidden py-10">
    <div class="relative z-10 w-full max-w-md px-4">
      <div class="bg-white rounded-2xl shadow-lg shadow-gray-200 p-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Criar Conta</h1>
          <p class="text-gray-500 mt-2">Registe-se no portal académico</p>
        </div>

        <!-- Toggle tipo -->
        <div class="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
          <button
            type="button"
            class="py-2 rounded-lg text-sm font-semibold transition-all"
            :class="tipo === 'aluno' ? 'bg-white shadow text-[#C0120C]' : 'text-gray-500'"
            @click="tipo = 'aluno'"
          >
            Aluno
          </button>
          <button
            type="button"
            class="py-2 rounded-lg text-sm font-semibold transition-all"
            :class="tipo === 'docente' ? 'bg-white shadow text-[#C0120C]' : 'text-gray-500'"
            @click="tipo = 'docente'"
          >
            Docente
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nome completo</label>
            <input v-model="common.name" class="input" placeholder="Nome" />
            <p v-if="fieldError('name')" class="text-red-600 text-xs mt-1">{{ fieldError('name') }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input v-model="common.email" type="email" class="input" placeholder="seu@email.com" />
            <p v-if="fieldError('email')" class="text-red-600 text-xs mt-1">{{ fieldError('email') }}</p>
          </div>

          <!-- Aluno -->
          <template v-if="tipo === 'aluno'">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Palavra-passe</label>
              <input v-model="aluno.password" type="password" class="input" placeholder="Mínimo 6 caracteres" />
              <p v-if="fieldError('password')" class="text-red-600 text-xs mt-1">{{ fieldError('password') }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmar palavra-passe</label>
              <input v-model="aluno.password_confirmation" type="password" class="input" placeholder="Repita a palavra-passe" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">ID da Turma</label>
              <input v-model="aluno.turma_id" type="number" class="input" placeholder="Ex: 1" />
              <p v-if="fieldError('turma_id')" class="text-red-600 text-xs mt-1">{{ fieldError('turma_id') }}</p>
            </div>
          </template>

          <!-- Docente -->
          <template v-else>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
              <input v-model="docente.telefone" class="input" placeholder="(opcional)" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Especialidade</label>
              <input v-model="docente.especialidade" class="input" placeholder="(opcional)" />
            </div>
          </template>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Data de nascimento</label>
            <input v-model="common.data_nascimento" type="date" class="input" />
            <p v-if="fieldError('data_nascimento')" class="text-red-600 text-xs mt-1">{{ fieldError('data_nascimento') }}</p>
          </div>

          <p v-if="tipo === 'docente'" class="text-xs text-gray-500">
            O acesso de docente fica pendente até aprovação do administrador.
          </p>

          <button
            :disabled="isLoading"
            class="w-full bg-[#C0120C] hover:bg-[#960E09] text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="size-5 animate-spin" />
            {{ isLoading ? 'A registar...' : 'Criar conta' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-500">
          Já tem conta?
          <NuxtLink to="/login" class="text-[#C0120C] hover:text-[#960E09] font-medium">Entrar</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
