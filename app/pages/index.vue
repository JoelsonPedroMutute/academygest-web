<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-3xl mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Perfil</h1>
        <p class="text-gray-500 text-sm mt-1">Gerir as suas informações pessoais</p>
      </div>

      <!-- Card principal -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div class="flex items-center gap-5 mb-6">
          <!-- Avatar -->
          <div class="relative">
            <div class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold select-none">
              {{ initials }}
            </div>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ form.name || 'Sem nome' }}</h2>
            <p class="text-sm text-gray-500">{{ form.email }}</p>
          </div>
        </div>

        <!-- Formulário -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="O seu nome"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="+244 900 000 000"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Função</label>
            <input
              v-model="form.role"
              type="text"
              disabled
              class="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="saveProfile"
            :disabled="saving"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-60"
          >
            {{ saving ? 'A guardar...' : 'Guardar alterações' }}
          </button>
        </div>

        <!-- Feedback -->
        <p v-if="successMsg" class="mt-3 text-sm text-green-600 text-right">{{ successMsg }}</p>
        <p v-if="errorMsg" class="mt-3 text-sm text-red-500 text-right">{{ errorMsg }}</p>
      </div>

      <!-- Alterar password -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-base font-semibold text-gray-900 mb-4">Alterar palavra-passe</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nova palavra-passe</label>
            <input
              v-model="passwords.new"
              type="password"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar palavra-passe</label>
            <input
              v-model="passwords.confirm"
              type="password"
              class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="changePassword"
            :disabled="savingPw"
            class="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-60"
          >
            {{ savingPw ? 'A actualizar...' : 'Actualizar palavra-passe' }}
          </button>
        </div>
        <p v-if="pwMsg" class="mt-3 text-sm text-right" :class="pwError ? 'text-red-500' : 'text-green-600'">{{ pwMsg }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Estado do formulário ---
const form = ref({
  name: 'João Silva',       // substitui pelos dados do teu store/auth
  email: 'joao@exemplo.com',
  phone: '+244 912 345 678',
  role: 'Administrador',
})

const saving = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const initials = computed(() => {
  return form.value.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
})

async function saveProfile() {
  saving.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    // await $fetch('/api/profile', { method: 'PUT', body: form.value })
    await new Promise(r => setTimeout(r, 800)) // simula chamada API
    successMsg.value = 'Perfil actualizado com sucesso.'
  } catch (e) {
    errorMsg.value = 'Erro ao guardar. Tente novamente.'
  } finally {
    saving.value = false
  }
}

// --- Passwords ---
const passwords = ref({ new: '', confirm: '' })
const savingPw = ref(false)
const pwMsg = ref('')
const pwError = ref(false)

async function changePassword() {
  pwMsg.value = ''
  pwError.value = false

  if (!passwords.value.new || passwords.value.new.length < 6) {
    pwMsg.value = 'A palavra-passe deve ter pelo menos 6 caracteres.'
    pwError.value = true
    return
  }
  if (passwords.value.new !== passwords.value.confirm) {
    pwMsg.value = 'As palavras-passe não coincidem.'
    pwError.value = true
    return
  }

  savingPw.value = true
  try {
    // await $fetch('/api/profile/password', { method: 'PUT', body: { password: passwords.value.new } })
    await new Promise(r => setTimeout(r, 800))
    pwMsg.value = 'Palavra-passe actualizada com sucesso.'
    passwords.value = { new: '', confirm: '' }
  } catch (e) {
    pwMsg.value = 'Erro ao actualizar. Tente novamente.'
    pwError.value = true
  } finally {
    savingPw.value = false
  }
}

// Metadata da página
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Perfil — AcademyGest' })
</script>