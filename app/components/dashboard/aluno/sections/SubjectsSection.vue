<script setup lang="ts">
interface Note {
  id: number | string
  disciplina: string
  nota: number
}

defineProps<{
  notes: Note[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Notas"
    description="Desempenho nas disciplinas"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="notes.length"
        class="space-y-4"
      >
        <DashboardAlunoItemsNoteItem
          v-for="note in notes"
          :key="note.id"
          :disciplina="note.disciplina"
          :nota="note.nota"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem notas"
        message="Ainda não existem notas disponíveis."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>