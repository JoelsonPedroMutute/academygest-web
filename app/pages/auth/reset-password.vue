<script setup lang="ts">
import { Eye, EyeOff, Loader2, Lock } from '@lucide/vue';

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
});

const api = useApi();
const { success, error } = useToast();
const route = useRoute();
const router = useRouter();

const password = ref('');
const passwordConfirmation = ref('');
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const isLoading = ref(false);
const tokenError = ref(false);
const errors = ref<Record<string, string[]>>({});

const token = ref(route.query.token as string);
const email = ref(route.query.email as string);

const validatePasswords = () => {
  errors.value = {};
  let isValid = true;

  if (!password.value || password.value.length < 8) {
    errors.value.password = ['A senha deve ter pelo menos 8 caracteres'];
    isValid = false;
  }

  if (password.value !== passwordConfirmation.value) {
    errors.value.password_confirmation = ['As senhas não coincidem'];
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validatePasswords()) return;

  isLoading.value = true;
  tokenError.value = false;

  try {
    await api.post('/auth/reset-password', {
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    });
    success('Senha redefinida com sucesso!');
    await router.push('/login?reset=1');
  } catch (err: any) {
    if (err.statusCode === 422 && err.data?.errors) {
      errors.value = err.data.errors;
    } else {
      tokenError.value = true;
      error('Link de recuperação inválido ou expirado');
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
            Redefinir Senha
          </h1>
          <p class="text-gray-500 mt-2">
            Crie uma nova senha para a sua conta
          </p>
        </div>

        <!-- Token error state -->
        <div v-if="tokenError" class="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3">
          <div class="mt-1">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-red-800">Link inválido ou expirado</h3>
            <p class="text-sm mt-1">Solicite um novo link de recuperação de senha.</p>
            <NuxtLink to="/auth/forgot-password" class="text-sm font-semibold text-[#C0120C] mt-2 inline-block hover:text-[#960E09]">
              Solicitar novo link
            </NuxtLink>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" v-else class="space-y-5">
          <!-- New password field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Nova Senha
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] transition-all outline-none"
                placeholder="••••••••"
              >
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock class="size-5" />
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Eye v-if="!showPassword" class="size-5" />
                <EyeOff v-else class="size-5" />
              </button>
            </div>
            <div v-if="errors.password" class="text-red-600 text-xs mt-1">
              {{ errors.password[0] }}
            </div>
          </div>

          <!-- Confirm password field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Confirmar Nova Senha
            </label>
            <div class="relative">
              <input
                :type="showPasswordConfirmation ? 'text' : 'password'"
                v-model="passwordConfirmation"
                class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] transition-all outline-none"
                placeholder="••••••••"
              >
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock class="size-5" />
              </div>
              <button
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Eye v-if="!showPasswordConfirmation" class="size-5" />
                <EyeOff v-else class="size-5" />
              </button>
            </div>
            <div v-if="errors.password_confirmation" class="text-red-600 text-xs mt-1">
              {{ errors.password_confirmation[0] }}
            </div>
          </div>

          <!-- Submit button -->
          <button
            :disabled="isLoading"
            class="w-full bg-[#C0120C] hover:bg-[#960E09] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="size-5 animate-spin" />
            {{ isLoading ? 'Redefinindo...' : 'Redefinir Senha' }}
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
