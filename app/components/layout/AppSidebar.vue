<script setup lang="ts">
import { 
  Home, 
  BookOpen, 
  Book, 
  Users, 
  UserGroup, 
  Building2, 
  Clipboard, 
  DocumentText, 
  UserCircle, 
  LogOut, 
  Star, 
  ChevronDown,
  X
} from '@lucide/vue';

const { user, logout } = useAuth();

const menuItems = [
  { label: 'Dashboard', icon: Home, to: '/dashboard/admin' },
  { label: 'Cursos', icon: BookOpen, to: '/cursos' },
  { label: 'Disciplinas', icon: Book, to: '/admin/disciplinas' },
  { label: 'Professores', icon: Users, to: '/docentes' },
  { label: 'Alunos', icon: UserGroup, to: '/alunos' },
  { label: 'Turmas', icon: Building2, to: '/admin/turmas' },
  { label: 'Matrículas', icon: Clipboard, to: '/matriculas' },
  { label: 'Notas', icon: DocumentText, to: '/notas' },
  { label: 'Perfil', icon: UserCircle, to: '/profile' },
];

const props = defineProps<{
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <!-- Mobile Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/50 z-30 lg:hidden" 
    @click="emit('close')"
  ></div>

  <aside class="
    w-72 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-40
    lg:translate-x-0 transition-transform duration-300
    " 
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo & School Selector -->
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4 lg:justify-start">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-[#C0120C]">
            <Star class="w-6 h-6 fill-current" />
          </div>
          <h1 class="text-xl font-bold text-gray-900">AcademyGest</h1>
        </div>

        <button @click="emit('close')" class="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <X class="w-5 h-5" />
        </button>
      </div>

      <button class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
        <span class="text-sm font-medium text-gray-700">Escola Principal</span>
        <ChevronDown class="w-4 h-4 text-gray-500" />
      </button>
    </div>

    <!-- Menu -->
    <nav class="flex-1 p-4 overflow-y-auto">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
        Painel de Administração
      </h3>

      <div class="space-y-1">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.to" 
          :to="item.to" 
          @click="emit('close')"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            $route.path.startsWith(item.to) 
              ? 'bg-[#C0120C] text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium text-sm">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-100">
      <button 
        @click="logout"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#C0120C] hover:bg-[#960E09] text-white rounded-lg transition-colors duration-200 font-medium"
      >
        <LogOut class="w-5 h-5" />
        Terminar Sessão
      </button>
    </div>
  </aside>
</template>
