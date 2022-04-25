<script setup lang="ts">
import imagekit from "common/imagekit"
import { Work } from "backend/src/types/payload-generated-types"
export interface WorkCardProps {
  work: Partial<Work>
}

const props = defineProps<WorkCardProps>()
</script>

<template>
  <div class="work-card">
    <img
      class="bg"
      :src="imagekit(props.work.coverImageBackground)"
      :alt="props.work.title"
      sizes="700px"
    />
    <div class="work-card-info">
      <h3>{{ props.work.title }}</h3>
    </div>
  </div>
</template>

<style scoped>
.work-card {
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
img.bg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.work-card-info {
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
.work-card-info > * {
  margin: 0;
}
.work-card-info > h3 {
  text-align: left;
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
