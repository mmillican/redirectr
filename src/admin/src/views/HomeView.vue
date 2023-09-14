<template>
  <AppNoNavLayout>
    <div class="mx-auto max-w-xl">
      <h1 class="text-center leading-6 text-4xl my-12 lowercase">
        Redirectr
      </h1>

      <div class="bg-white px-6 py-4 rounded-md shadow items-center">
        <Transition appear name="fade" mode="out-in">
          <CreateUrl v-if="!createdUrl" @urlCreated="handleUrlCreated" />

          <DisplayUrl v-else-if="createdUrl && createdUrl.url" :url="createdUrl" />
        </Transition>
      </div>
    </div>
  </AppNoNavLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ShortUrl } from '@/models';

import CreateUrl from '@/components/urls/CreateUrl.vue';
import DisplayUrl from '@/components/urls/DisplayUrl.vue';
import AppNoNavLayout from '@/layouts/AppNoNav.vue';

const createdUrl = ref<ShortUrl | null>(null);

function handleUrlCreated(url: ShortUrl) {
  createdUrl.value = url;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
