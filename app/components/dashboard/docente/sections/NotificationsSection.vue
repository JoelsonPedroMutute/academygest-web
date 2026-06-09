<script setup lang="ts">
interface Notification {
  id: number | string
  title: string
  description: string
}

defineProps<{
  notifications: Notification[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Notificações"
    description="Mensagens e avisos"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="notifications.length"
        class="space-y-4"
      >
        <DashboardDocenteItemsNotificationItem
          v-for="notification in notifications"
          :key="notification.id"
          :title="notification.title"
          :description="notification.description"
        />
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem notificações"
        message="Nenhuma notificação encontrada."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>