<template>
  <div class="auth-layout">
    <!-- Fundo opcional decorativo -->
    <div class="background"></div>

    <!-- Container central -->
    <div class="auth-container">
      <!-- Logo / Header -->
      <div class="header">
        <h1>AcademyGest</h1>
        <p>Gestão Académica</p>
      </div>

      <!-- Conteúdo das páginas (login, register, etc.) -->
      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout puro, sem lógica complexa
</script>

<style scoped lang="scss">
.auth-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  overflow: hidden;
}

/* Fundo decorativo */
.background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, #1e293b, #0f172a);
  z-index: 0;
}

/* Container central */
.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 25px;
  color: #fff;
}

.header h1 {
  font-size: 24px;
  margin: 0;
}

.header p {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 5px;
}

/* Conteúdo */
.content {
  display: flex;
  flex-direction: column;
}
</style>