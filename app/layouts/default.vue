<template>
  <div class="default-layout">
    <!-- Header simples -->
    <header class="header">
      <div class="logo">
        <NuxtLink to="/">AcademyGest</NuxtLink>
      </div>

      <nav class="nav">
        <NuxtLink to="/" class="link">Home</NuxtLink>
        <NuxtLink to="/about" class="link">Sobre</NuxtLink>
        <NuxtLink to="/contact" class="link">Contacto</NuxtLink>
      </nav>

      <div class="auth">
        <NuxtLink to="/auth/login" class="login">Entrar</NuxtLink>
      </div>
    </header>

    <!-- Conteúdo da página -->
    <main class="content">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} AcademyGest. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// layout simples sem lógica obrigatória
</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  height: 60px;
  background: #111827;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 15px;
}

.link {
  color: #cbd5e1;
  text-decoration: none;

  &.router-link-active {
    color: #3b82f6;
  }
}

.auth .login {
  background: #3b82f6;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
}

/* Content */
.content {
  flex: 1;
  padding: 20px;
  background: #f9fafb;
}

/* Footer */
.footer {
  height: 50px;
  background: #111827;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
</style>