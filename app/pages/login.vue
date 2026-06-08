<script setup lang="ts">
import { Eye, EyeOff, Loader2 } from '@lucide/vue';

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
});

const { login, isLoading, loginError } = useAuth();
const route = useRoute();
const { success } = useToast();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errors = ref<Record<string, string[]>>({});

onMounted(() => {
  if (route.query.reset === '1') {
    success('Senha redefinida com sucesso! Faça login com a nova senha.');
  }
});

const handleLogin = async () => {
  errors.value = {};
  try {
    await login(email.value, password.value);
  } catch (err: any) {
    if (err.statusCode === 422 && err.data?.errors) {
      errors.value = err.data.errors;
    }
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
          Portal Universitário
          </h1>
          <p class="text-gray-500 mt-2">
          Acesse sua conta académica
          </p>
        </div>

        <!-- Error message -->
        <div v-if="loginError" class="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {{ loginError }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
            Email
            </label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] transition-all outline-none"
              placeholder="seu@email.com"
            >
            <div v-if="errors.email" class="text-red-600 text-xs mt-1">
              {{ errors.email[0] }}
            </div>
          </div>

          <!-- Password field -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
            Senha
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] transition-all outline-none"
                placeholder="••••••••••"
              >
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

          <!-- Forgot password link -->
          <div class="flex justify-end">
            <NuxtLink to="/auth/forgot-password" class="text-[#C0120C] hover:text-[#960E09] text-sm font-medium">
              Esqueceu a senha?
            </NuxtLink>
          </div>

          <!-- Login button -->
          <button
            :disabled="isLoading"
            class="w-full bg-[#C0120C] hover:bg-[#960E09] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="size-5 animate-spin" />
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
