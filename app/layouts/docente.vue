<template>
  <div class="docente-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <h2>Docente</h2>
      </div>

      <nav class="menu">
        <NuxtLink to="/docente" class="link">Dashboard</NuxtLink>
        <NuxtLink to="/docente/turmas" class="link">Turmas</NuxtLink>
        <NuxtLink to="/docente/alunos" class="link">Alunos</NuxtLink>
        <NuxtLink to="/docente/notas" class="link">Notas</NuxtLink>
        <NuxtLink to="/docente/avaliacoes" class="link">Avaliações</NuxtLink>
      </nav>
    </aside>

    <!-- Main -->
    <div class="main">
      <!-- Topbar -->
      <header class="topbar">
        <div class="title">
          <h1>{{ pageTitle }}</h1>
        </div>

        <div class="actions">
          <button class="btn" @click="logout">Sair</button>
        </div>
      </header>

      <!-- Content -->
      <main class="content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    '/docente': 'Dashboard',
    '/docente/turmas': 'Turmas',
    '/docente/alunos': 'Alunos',
    '/docente/notas': 'Notas',
    '/docente/avaliacoes': 'Avaliações',
  }

  return map[route.path] || 'Docente'
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<style scoped lang="scss">
.docente-layout {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.logo {
  margin-bottom: 30px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;

  &.router-link-active {
    background: #3b82f6;
    color: #fff;
  }
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Topbar */
.topbar {
  height: 60px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
}

.content {
  flex: 1;
  padding: 20px;
  background: #f9fafb;
  overflow-y: auto;
}

.btn {
  background: #ef4444;
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>