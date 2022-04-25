<script setup lang="ts">
// Temporarily loading all data into all pages.
// Will change to on-demand data fetching when SSG is fully implemented in Nuxt3.
const { data, error } = await useApi("works")
if (error.value) console.error(error.value)
provide(injectionKeys.works, data.value.docs)
</script>

<template>
  <div>
    <Head>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="true"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <Meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import "components/style";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

button {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding: 10px 20px;
}

a {
  color: inherit;
}
</style>
