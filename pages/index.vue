<template>
  <Carousel
    items-to-show="1.8"
    :wrap-around="true"
  >
    <template #slides>
      <Slide
        v-for="id in images.length"
        :key="id"
      >
        <img :src="images[id - 1]" class="carousel-image-item">
      </Slide>
    </template>
    <template #addons="{ currentSlide, slidesCount }">
      <span class="unselectable"> {{ str[(currentSlide + 4) % 4] }} </span>
    </template>
  </Carousel>
</template>
<style>
.carousel-image-item {
  height: 500px;
}

.unselectable {
  -moz-user-select: -moz-none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
<script lang="js" setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const str = ["●○○○", "○●○○", "○○●○", "○○○●"]

const images = [
  "https://img2.teletype.in/files/95/c9/95c93d56-b7c3-459c-8c22-4d60f3f21e1d.png",
  "https://img4.teletype.in/files/35/30/3530d0f1-0dc5-4e60-92e9-2033992e753b.png",
  "https://img3.teletype.in/files/e1/7f/e17f536c-c938-493c-9c30-0f3de001a3c1.png",
  "https://img1.teletype.in/files/c6/14/c6149487-3859-48f0-b9f0-cedf8841f98d.png",  
]

</script>