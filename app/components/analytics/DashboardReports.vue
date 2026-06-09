<template>
  <div class="reports">
    <h2>Relatórios</h2>

    <table>
      <thead>
        <tr>
          <th>Relatório</th>
          <th>Data</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in reports" :key="r.name">
          <td>{{ r.name }}</td>
          <td>{{ r.date }}</td>
          <td>{{ r.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const reports = [
  { name: 'Notas Gerais', date: '2026-05-20', status: 'Gerado' },
  { name: 'Presenças', date: '2026-05-22', status: 'Pendente' },
]
</script>

<style scoped lang="scss">
.reports {
  margin-top: 20px;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
</style>