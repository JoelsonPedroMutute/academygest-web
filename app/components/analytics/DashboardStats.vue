<template>
  <div class="stats">
    <h2>Estatísticas Gerais</h2>

    <ul>
      <li v-for="stat in stats" :key="stat.label">
        <strong>{{ stat.label }}:</strong> {{ stat.value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: 'Novos alunos (mês)', value: 120 },
  { label: 'Notas lançadas', value: 540 },
  { label: 'Cursos ativos', value: 18 },
]
</script>

<style scoped lang="scss">
.stats {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}
</style>