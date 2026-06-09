<script setup lang="ts">
import { Eye, EyeOff, Loader2, Lock } from '@lucide/vue';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const api = useApi();
const { success, error } = useToast();
const route = useRoute();
const router = useRouter();

const token = ref((route.query.token as string) ?? '');
const email = ref((route.query.email as string) ?? '');
const password = ref('');
const passwordConfirmation = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errors = ref<Record<string, string[]>>({});

const handleSubmit = async () => {
  errors.value = {};

  if (!password.value || password.value.length < 6) {
    errors.value.password = ['A senha deve ter pelo menos 6 caracteres'];
    return;
  }
  if (password.value !== passwordConfirmation.value) {
    errors.value.password_confirmation = ['As senhas não coincidem'];
    return;
  }

  isLoading.value = true;
  try {
    await api.post('/auth/change-password', {
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
    success('Senha alterada com sucesso!');
    await router.push('/login?reset=1');
  } catch (err: any) {
    if (err?.statusCode === 422 && err?.data?.errors) {
      errors.value = err.data.errors;
    } else {
      error('Não foi possível alterar a senha. Verifique o link.');
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
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Alterar Senha</h1>
          <p class="text-gray-500 mt-2">Defina uma nova palavra-passe</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="!email" class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Email</label>
            <input v-model="email" type="email" class="input" placeholder="seu@email.com" />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Nova senha</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#C0120C] focus:border-[#C0120C] outline-none"
                placeholder="••••••••"
              >
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock class="size-5" />
              </div>
              <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <Eye v-if="!showPassword" class="size-5" />
                <EyeOff v-else class="size-5" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-600 text-xs mt-1">{{ errors.password[0] }}</p>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Confirmar nova senha</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="passwordConfirmation"
              class="input"
              placeholder="••••••••"
            >
            <p v-if="errors.password_confirmation" class="text-red-600 text-xs mt-1">{{ errors.password_confirmation[0] }}</p>
          </div>

          <button
            :disabled="isLoading"
            class="w-full bg-[#C0120C] hover:bg-[#960E09] text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="size-5 animate-spin" />
            {{ isLoading ? 'A guardar...' : 'Alterar Senha' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/login" class="text-[#C0120C] hover:text-[#960E09] text-sm font-medium">← Voltar ao login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
