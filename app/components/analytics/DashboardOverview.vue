<template>
  <div class="overview">
    <h2>Visão Geral</h2>

    <div class="grid">
      <div class="box">
        <p>Performance geral</p>
        <span>Boa</span>
      </div>

      <div class="box">
        <p>Atividade recente</p>
        <span>Alta</span>
      </div>

      <div class="box">
        <p>Alertas</p>
        <span>2 pendentes</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview {
  margin-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.box {
  background: #f9fafb;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}
</style>