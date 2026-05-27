<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <h2>Admin Panel</h2>
      </div>

      <nav class="menu">
        <NuxtLink to="/admin" class="link">Dashboard</NuxtLink>
        <NuxtLink to="/admin/alunos" class="link">Alunos</NuxtLink>
        <NuxtLink to="/admin/docentes" class="link">Docentes</NuxtLink>
        <NuxtLink to="/admin/cursos" class="link">Cursos</NuxtLink>
        <NuxtLink to="/admin/salas" class="link">Salas</NuxtLink>
      </nav>
    </aside>

    <!-- Main area -->
    <div class="main">
      <!-- Topbar -->
      <header class="topbar">
        <div class="left">
          <h1>{{ pageTitle }}</h1>
        </div>

        <div class="right">
          <button class="btn-logout" @click="logout">
            Sair
          </button>
        </div>
      </header>

      <!-- Page content -->
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
    '/admin': 'Dashboard',
    '/admin/alunos': 'Alunos',
    '/admin/docentes': 'Docentes',
    '/admin/cursos': 'Cursos',
  }

  return map[route.path] || 'Admin'
})

const logout = () => {
  // limpar token (ex: localStorage/pinia)
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #111827;
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
  gap: 12px;
}

.link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;

  &.router-link-active {
    background: #2563eb;
    color: #fff;
  }
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 60px;
  background: #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.btn-logout {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>