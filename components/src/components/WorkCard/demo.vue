<script setup lang="ts">
import WorkCard from "./index.vue"
</script>

<template>
  <WorkCard
    :work="{
      title: 'Study Reminder App',
      coverImageBackground: '/default-image.jpg'
    }"
    :style="{ maxWidth: '700px' }"
  />
</template>
