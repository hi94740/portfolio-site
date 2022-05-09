<script setup lang="ts">
import { encode } from "js-base64"
import imagekit from "common/imagekit"
const route = useRoute()
const works = inject(injectionKeys.works)
const work = computed(() => works.find(w => w.slug === route.params.slug))
const webflowPages = inject(injectionKeys.webflowPages)
</script>

<template>
  <div>
    <NuxtLink to="/"><button class="home">Home</button></NuxtLink>
    <template v-if="work" v-for="content in work.contents">
      <iframe
        v-if="content.blockType === 'webflow'"
        :src="
          'data:text/html;base64,' +
          encode(
            webflowPages
              .get(content.url)
              .replace(
                `</head>`,
                `<script>document.querySelectorAll('link').forEach(l=>{const u=new URL(l.href);if(u.protocol==='http:'){u.protocol='https:';l.href=u.toString()}})</script><style>a.w-webflow-badge{display: none !important;}</style></head>`
              )
          )
        "
        frameborder="0"
        class="full-page"
      />
      <iframe
        v-if="content.blockType === 'fullPageEmbed'"
        :src="content.url"
        frameborder="0"
        class="full-page"
        allowfullscreen
      />
      <div
        v-if="content.blockType === 'mobileWebsite'"
        class="center-container"
      >
        <div class="mobile-site">
          <img :src="imagekit(content.cover)" alt="" />
          <div>
            <h1 :style="{ color: '#ff4f95' }">{{ work.title }}</h1>
            <div>
              <p v-for="p in content.description">
                <template v-for="c in p.children">
                  <b v-if="(c as any).bold">{{(c as any).text}}</b>
                  <template v-else>{{(c as any).text}}</template>
                </template>
              </p>
            </div>
            <div class="button-row">
              <a
                class="button"
                :href="content.websiteUrl"
                :style="{ background: '#ff4f95' }"
                target="_blank"
                >See it live</a
              >
              <a
                class="button"
                :href="content.sourceCodeUrl"
                :style="{ background: '#333' }"
                target="_blank"
                >Source</a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="content.blockType === 'youtube'"
        class="center-container"
        :style="{ background: '#333' }"
      >
        <h1 :style="{ color: 'white' }">{{ work.title }}</h1>
        <div class="video-container">
          <iframe
            width="100%"
            height="100%"
            :src="content.url"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
button.home {
  position: absolute;
  top: 50px;
  left: 50px;
  background: radial-gradient(50% 50% at 50% 50%, #768df5 27.08%, #9357f7 100%);
  font-size: 1.2rem;
  cursor: pointer;
}
iframe.full-page {
  width: 100vw;
  height: 100vh;
}
.center-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mobile-site {
  display: flex;
  align-items: center;
  max-width: 940px;
  gap: 50px;
}
.mobile-site > img {
  max-height: 720px;
  background-color: #ff4f95;
}
.button-row {
  display: flex;
  gap: 10px;
}
.button-row > button {
  margin: 0;
}
.video-container {
  width: 100vw;
  max-width: 940px;
  height: calc(100vw / 16 * 9);
  max-height: 528.75px;
}
</style>
