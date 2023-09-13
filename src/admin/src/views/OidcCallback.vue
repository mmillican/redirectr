<template>
  <div>Authenticating...</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/authService';

const router = useRouter();
const authService = new AuthService();

onMounted(async() => {
  await authService.handleLoginCallback();
});

router.push('/');
</script>
