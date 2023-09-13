<template>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import AuthService from '@/services/authService';

onMounted(async() => {
  const authService = new AuthService();
  if (!await authService.isAuthenticated()) {
    console.log('user not authenticated');
    await authService.signIn();
  }
});

</script>
