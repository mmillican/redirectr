<template>
  <div class="min-h-full">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AuthService from '@/services/authService';

const currentUser = ref({
  name: '',
  email: '',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
})

onMounted(async () => {
  const authService = new AuthService();
  const user = await authService.getUser();

  if (user) {
    currentUser.value.name = `${user?.profile.given_name} ${user?.profile.family_name}`;
    currentUser.value.email = user?.profile.email || '';
  }
})
</script>
