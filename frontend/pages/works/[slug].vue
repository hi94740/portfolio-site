<script setup lang="ts">
const route = useRoute()
const { data } = await useApi("works", {
  params: { "where[slug][equals]=": route.params.slug }
})
if (data.value.docs.length === 0) navigateTo("/")
const work = computed(() => data.value.docs[0])
</script>

<template>
  <div>
    <NuxtLink to="/"><button class="home">Home</button></NuxtLink>
    <template v-if="work">
      <iframe
        v-if="work.contentType === 'webflow'"
        :src="work.webflow.html"
        frameborder="0"
        class="full-page"
    /></template>
  </div>
</template>

<style scoped>
button.home {
  position: absolute;
  top: 50px;
  left: 50px;
  border-radius: 50vw;
  background: radial-gradient(50% 50% at 50% 50%, #768df5 27.08%, #9357f7 100%);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
iframe.full-page {
  width: 100vw;
  height: 100vh;
}
</style>
