<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const { user, isAuthenticated } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isAuthenticated.value && user.value) {
    if (user.value.role === 'admin') {
      router.replace('/dashboard/admin');
    } else if (user.value.role === 'docente') {
      router.replace('/dashboard/docente');
    } else {
      router.replace('/dashboard/aluno');
    }
  } else {
    router.replace('/login');
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-500">Redirecionando...</p>
    </div>
  </div>
</template>
