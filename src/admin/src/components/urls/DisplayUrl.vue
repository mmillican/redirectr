<template>
  <div class="flex justify-between">
    <div class="py-1.5">
      <a :href="props.url.url" target="_blank" class="text-2xl font-light text-blue-500 hover:underline underline-offset-4">
        {{ props.url.url }}
      </a>
    </div>

    <button title="Copy to clipboard" @click.prevent="copyToClipboard(props.url)">
      <LinkIcon class="w-8 h-8 text-gray-400 hover:text-blue-500" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ShortUrl } from '@/models';

import { LinkIcon } from '@heroicons/vue/24/outline';

type Props = {
  url: ShortUrl;
}

const props = defineProps<Props>();

function copyToClipboard(url: ShortUrl) {
  navigator.clipboard.writeText(url.url);
}
</script>
