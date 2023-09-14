<template>
  <form @submit.prevent="handleSubmit" class="flex space-x-4">
    <div class="grow">
      <label for="destinationUrl" class="sr-only">Destination URL</label>
      <input
        type="url"
        v-model="shortUrl.destinationUrl"
        name="destinationUrl"
        id="destinationUrl"
        placeholder="https://mysite.com"
        class="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
      />
    </div>

    <button
      type="submit"
      class="rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed"
      :disabled="!canSubmit"
    >
      Create <span class="sr-only">Short URL</span>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ShortUrl, CreateShortUrlRequest } from '@/models';
import { createUrl } from '@/services/urlService';

const emit = defineEmits<{
  (e: 'urlCreated', val: ShortUrl): void,
}>();

const shortUrl = ref<CreateShortUrlRequest>({
  destinationUrl: '',
});

const canSubmit = computed(() => shortUrl.value.destinationUrl !== null && shortUrl.value.destinationUrl !== '');

async function handleSubmit(): Promise<void> {
  const createdUrl = await createUrl(shortUrl.value);
  emit('urlCreated', createdUrl);
}

</script>
