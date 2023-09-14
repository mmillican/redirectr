<template>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/authService';

const router = useRouter();

onMounted(async() => {
  const authService = new AuthService();
  if (!await authService.isAuthenticated()) {
    await authService.signIn();
  } else {
    router.push('/');
  }
});

</script>
