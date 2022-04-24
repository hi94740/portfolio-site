<script setup lang="ts">
import { useWindowSize } from "@vueuse/core"
import { Ref } from "vue"
import { WorkCard } from "components"
const viewport = useWindowSize()
const computeDotAmount = (size: Ref<number>) =>
  computed(() => {
    const amount = Math.floor(size.value / 45)
    return amount % 2 === 0 ? amount - 1 : amount
  })
const hDotAmount = computeDotAmount(viewport.width)
const vDotAmount = computeDotAmount(viewport.height)
const computeDotCenter = (dotAmount: Ref<number>) =>
  computed(() => Math.ceil(dotAmount.value / 2))
const hDotCenter = computeDotCenter(hDotAmount)
const vDotCenter = computeDotCenter(vDotAmount)
const purpleDots: Array<[number, number]> = [
  [0, -2],
  [0, -1],
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 1],
  [2, 0],
  [-1, 1],
  [-2, 0]
]
const purpleDotsYoffset = ref(0)
const animatedPurpleDots = computed(() =>
  purpleDots.map(([x, y]) => [x, y + purpleDotsYoffset.value])
)
setInterval(
  () =>
    purpleDotsYoffset.value === 0
      ? (purpleDotsYoffset.value = 1)
      : (purpleDotsYoffset.value = 0),
  500
)
const testDot = (x: number, y: number) =>
  animatedPurpleDots.value.some(
    (dot: [number, number]) =>
      dot[0] + hDotCenter.value === x && dot[1] + vDotCenter.value === y
  )

const { data, error } = await useApi("works")
watchEffect(() => console.log(error.value))
watchEffect(() => console.log(data.value))
</script>

<template>
  <div>
    <div class="dot-screen-container">
      <ClientOnly>
        <div class="dot-screen">
          <div class="dot-screen-row" v-for="r in vDotAmount">
            <div
              class="dot"
              v-for="d in hDotAmount"
              :style="testDot(d, r) ? { background: '#9357F7' } : {}"
            ></div>
          </div>
        </div>
      </ClientOnly>
    </div>
    <div class="row-container" v-for="r in Math.ceil(data.docs.length / 2)">
      <div class="row">
        <NuxtLink
          v-for="c in 2 - (data.docs.length % 2)"
          :to="'/works/' + data.docs[(r - 1) * 2 + c - 1].slug"
        >
          <WorkCard :work="data.docs[(r - 1) * 2 + c - 1]" />
        </NuxtLink>
      </div>
    </div>
    <div class="row-container">
      <div class="row">
        <div
          class="card"
          style="
            background-image: url('https://ik.imagekit.io/shenjiaweb/portfolio/works/streaming_recommendation/cover.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1650258900773');
          "
        >
          <div class="card-info">
            <h3>Streaming Service Recommendation</h3>
            <div class="tags">
              <div class="tag">Work In Progress</div>
              <div class="tag">Figma</div>
            </div>
          </div>
        </div>
        <div
          class="card"
          style="
            background-image: url('https://ik.imagekit.io/shenjiaweb/portfolio/works/study_reminder_app/cover?ik-sdk-version=javascript-1.4.3&updatedAt=1650258008225');
          "
        >
          <div class="card-info">
            <h3>Study Reminder App{{ data.docs[0].title }}</h3>
            <div class="tags">
              <div class="tag">UX Case Study</div>
              <div class="tag">Research</div>
              <div class="tag">Prototyping</div>
              <div class="tag">Adobe XD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row-container">
      <div class="row">
        <div class="card">
          <div class="card-info"></div>
        </div>
        <div class="card">
          <div class="card-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dot-screen-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot-screen-row {
  width: 100vw;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.dot {
  border-radius: 50vw;
  background-color: rgba(128, 128, 128, 0.04);
  width: 35px;
  height: 35px;
}
.row-container {
  width: 100vw;
  background: linear-gradient(180deg, #e4f8ff 0%, #f9fdff 100%);
  display: flex;
  justify-content: center;
}
.row {
  width: 100%;
  max-width: 1400px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.card {
  grid-column: 1 span;
  height: 400px;
  background-color: #0d1c29;
  background-size: cover;
  background-position: center;
  border-radius: 21px;
  box-shadow: 0px 0px 38px #a4ffe4;
  overflow: hidden;
  position: relative;
}
.card-info {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  backdrop-filter: saturate(180%) blur(18px);
  height: 90px;
  width: 100%;
  border-radius: 0 0 20px 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.card-info > * {
  margin: 0;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.tag {
  background: #00244480;
  color: white;
  padding: 2px 4px;
  border-radius: 5px;
}
</style>
