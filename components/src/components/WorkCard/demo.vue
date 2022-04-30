<script setup lang="ts">
import WorkCard from "./index.vue"
</script>

<template>
  <WorkCard
    :work="{
      title: 'Study Reminder App',
      coverImageBackground: '/default-image.jpg',
      tags: ['UX Research', 'UI Design']
    }"
    :style="{ maxWidth: '700px' }"
  />
</template>
