<script setup lang="ts">
interface Notification {
  id: number | string
  title: string
  description: string
  date?: string
}

defineProps<{
  notifications: Notification[]
}>()
</script>

<template>
  <DashboardSharedDashboardSection
    title="Notificações"
    description="Avisos e mensagens importantes"
  >
    <DashboardSharedDashboardCard>
      <div
        v-if="notifications.length"
        class="space-y-4"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="space-y-2"
        >
          <DashboardAlunoItemsNotificationItem
            :title="notification.title"
            :description="notification.description"
          />

          <div
            v-if="notification.date"
            class="text-xs text-gray-400 ml-1"
          >
            {{ notification.date }}
          </div>
        </div>
      </div>

      <DashboardSharedEmptyDashboard
        v-else
        title="Sem notificações"
        message="Nenhuma notificação disponível."
      />
    </DashboardSharedDashboardCard>
  </DashboardSharedDashboardSection>
</template>