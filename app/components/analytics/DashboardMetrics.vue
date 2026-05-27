<template>
  <div class="metrics-grid">
    <div class="card" v-for="item in metrics" :key="item.label">
      <h3>{{ item.label }}</h3>
      <p class="value">{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  { label: 'Alunos', value: 1240 },
  { label: 'Docentes', value: 86 },
  { label: 'Cursos', value: 32 },
  { label: 'Taxa de aprovação', value: '78%' },
]
</script>

<style scoped lang="scss">
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.value {
  font-size: 22px;
  font-weight: bold;
}
</style>