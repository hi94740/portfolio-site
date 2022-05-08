<script setup lang="ts">
import { useIntervalFn, useTransition, useWindowSize } from "@vueuse/core"
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

type Dot = [number, number]
const purpleDots: Array<Dot> = [
  // [0, -2],
  // [0, -1],
  // [0, 0],
  // [0, 1],
  // [0, 2],
  // [1, 1],
  // [2, 0],
  // [-1, 1],
  // [-2, 0]
  [0, 0],
  [1, 1],
  [2, 2],
  [-1, 1],
  [-2, 2]
]
const purpleDotsYoffset = ref(0)
const animatedPurpleDots = computed(() =>
  purpleDots.map(([x, y]) => [
    x,
    y + purpleDotsYoffset.value + Math.floor(vDotAmount.value / 2) - 4
  ])
)
useIntervalFn(
  () =>
    purpleDotsYoffset.value === 0
      ? (purpleDotsYoffset.value = 1)
      : (purpleDotsYoffset.value = 0),
  500
)

type DotWithColor = [number, number, string]
const logoDots: Array<Array<DotWithColor>> = [
  [[0, -2, "#9357F7"]],
  [[-1, -3, "#9357F7"]],
  [[-2, -3, "#9357F7"]],
  [[-3, -2, "#9357F7"]],
  [[-3, -1, "#9357F7"]],
  [[-2, 0, "#9357F7"]],
  [[-1, 0, "#9357F7"]],
  [[0, 1, "linear-gradient(90deg, #9357F7 0%, #61C8ED 100%)"]],
  [[0, 2, "linear-gradient(90deg, #768DF5 0%, #72F2CC 100%)"]],
  [
    [-1, 3, "#9357F7"],
    [1, 3, "#72F2CC"]
  ],
  [
    [-2, 3, "#9357F7"],
    [2, 3, "#72F2CC"]
  ],
  [
    [-3, 2, "#9357F7"],
    [3, 2, "#72F2CC"]
  ],
  [[3, 1, "#72F2CC"]],
  [[3, 0, "#72F2CC"]],
  [[3, -1, "#72F2CC"]],
  [[3, -2, "#72F2CC"]],
  [[3, -3, "#72F2CC"]]
]
const disableLogoTransition = ref(false)
const logoSliceStart = ref(0)
const logoSliceEnd = ref(0)
const animatedLogoSliceStart = useTransition(logoSliceStart, {
  disabled: disableLogoTransition,
  duration: 1000,
  onFinished() {
    disableLogoTransition.value = true
    logoSliceStart.value = 0
    logoSliceEnd.value = 0
    setTimeout(() => {
      disableLogoTransition.value = false
      logoSliceEnd.value = logoDots.length
    }, 500)
  }
})
const animatedLogoSliceEnd = useTransition(logoSliceEnd, {
  disabled: disableLogoTransition,
  duration: 1500,
  onFinished() {
    setTimeout(() => (logoSliceStart.value = 9), 3000)
  }
})
const animatedLogoDots = computed(() =>
  logoDots
    .map(d => d.map(([x, y, c]) => [x, y - 1, c]))
    .slice(
      animatedLogoSliceStart.value,
      animatedLogoSliceEnd.value - animatedLogoSliceStart.value
    )
    .flat()
)
logoSliceEnd.value = logoDots.length

const testDot = (x: number, y: number) => {
  if (
    animatedPurpleDots.value.some(
      (dot: Dot) =>
        dot[0] + hDotCenter.value === x && dot[1] + vDotCenter.value === y
    )
  )
    return { background: "#9357F7" }
  const logoDot = animatedLogoDots.value.find(
    (dot: DotWithColor) =>
      dot[0] + hDotCenter.value === x && dot[1] + vDotCenter.value === y
  )
  if (logoDot) return { background: logoDot[2] }
  return {}
}

const works = inject(injectionKeys.works)
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
              :style="testDot(d, r)"
            ></div>
          </div>
        </div>
      </ClientOnly>
    </div>
    <div class="row-container" v-for="r in Math.ceil(works.length / 2)">
      <div class="row">
        <NuxtLink
          v-for="c in r === Math.ceil(works.length / 2)
            ? 2 - (works.length % 2)
            : 2"
          :to="'/works/' + works[(r - 1) * 2 + c - 1].slug"
        >
          <WorkCard :work="works[(r - 1) * 2 + c - 1]" />
        </NuxtLink>
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
  transition: 200ms;
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
