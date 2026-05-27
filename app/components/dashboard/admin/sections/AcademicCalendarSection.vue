<script setup lang="ts">
interface Event {
  id: number | string
  title: string
  date: string
}

defineProps<{
  events: Event[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Calendário Académico"
    description="Eventos académicos"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="events.length"
        class="space-y-4"
      >
        <div
          v-for="event in events"
          :key="event.id"
          class="border rounded-xl p-4"
        >
          <h4 class="font-semibold">
            {{ event.title }}
          </h4>

          <p class="text-sm text-gray-500 mt-1">
            {{ event.date }}
          </p>
        </div>
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem eventos"
        message="Nenhum evento disponível."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>