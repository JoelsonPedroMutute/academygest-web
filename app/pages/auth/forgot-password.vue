<script setup lang="ts">
import { Loader2, Mail } from '@lucide/vue';

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
});

const api = useApi();
const { success, error } = useToast();

const email = ref('');
const isLoading = ref(false);
const showSuccess = ref(false);
const errors = ref<Record<string, string[]>>({});

const handleSubmit = async () => {
  errors.value = {};
  isLoading.value = true;
  showSuccess.value = false;

  try {
    await api.post('/api/auth/forgot-password', { email: email.value });
    showSuccess.value = true;
    success('Verifique o seu email');
  } catch (err: any) {
    if (err.statusCode === 404) {
      error('Email não encontrado no sistema');
    } else if (err.statusCode === 422 && err.data?.errors) {
      errors.value = err.data.errors;
    } else {
      error('Ocorreu um erro. Tente novamente.');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#F3F4F6] overflow-hidden">
    <div class="relative z-10 w-full max-w-md px-4">
      <div class="bg-white rounded-2xl shadow-lg shadow-gray-200 p-8">
        <!-- Title -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">
            Recuperar Senha
          </h1>
          <p class="text-gray-500 mt-2">
            Insira o seu email para receber o link de recuperação
          </p>
        </div>

        <!-- Success message -->
        <div v-if="showSuccess" class="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-start gap-3">
          <div class="mt-1">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-green-800">Verifique o seu email</h3>
            <p class="text-sm mt-1">Enviamos um link de recuperação para o seu email. Por favor, verifique a sua caixa de entrada (e spam).</p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" v-else class="space-y-5">
          <!-- Email field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] transition-all outline-none"
                placeholder="seu@email.com"
              >
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail class="size-5" />
              </div>
            </div>
            <div v-if="errors.email" class="text-red-600 text-xs mt-1">
              {{ errors.email[0] }}
            </div>
          </div>

          <!-- Submit button -->
          <button
            :disabled="isLoading"
            class="w-full bg-[#C0120C] hover:bg-[#960E09] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="size-5 animate-spin" />
            {{ isLoading ? 'Enviando...' : 'Enviar Link' }}
          </button>
        </form>

        <!-- Back to login link -->
        <div class="mt-6 text-center">
          <NuxtLink to="/login" class="text-[#C0120C] hover:text-[#960E09] text-sm font-medium">
            ← Voltar ao login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
