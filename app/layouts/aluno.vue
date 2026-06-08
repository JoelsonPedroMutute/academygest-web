<template>
  <div class="aluno-layout">
    <!-- Topbar -->
    <header class="topbar">
      <div class="logo">
        <h2>Aluno</h2>
      </div>

      <nav class="nav">
        <NuxtLink to="/aluno" class="link">Dashboard</NuxtLink>
        <NuxtLink to="/aluno/notas" class="link">Notas</NuxtLink>
        <NuxtLink to="/aluno/cursos" class="link">Cursos</NuxtLink>
        <NuxtLink to="/aluno/perfil" class="link">Perfil</NuxtLink>
      </nav>

      <div class="actions">
        <button class="btn" @click="logout">Sair</button>
      </div>
    </header>

    <!-- Content -->
    <main class="content">
      <NuxtPage />
    </main>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ToastContainer from '~/components/ui/ToastContainer.vue';

const router = useRouter()
const { logout } = useAuth();
</script>

<style scoped lang="scss">
.aluno-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Topbar */
.topbar {
  height: 60px;
  background: #1f2937;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
}

.nav {
  display: flex;
  gap: 15px;
}

.link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;

  &.router-link-active {
    background: #3b82f6;
    color: white;
  }
}

.actions .btn {
  background: #ef4444;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

/* Content */
.content {
  flex: 1;
  padding: 20px;
  background: #f9fafb;
  overflow-y: auto;
}
</style>