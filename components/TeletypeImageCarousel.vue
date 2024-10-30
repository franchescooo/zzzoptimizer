<template>
  <Carousel
    :items-to-show="1"                                           
    :wrap-around="true"
    class="unselectable"
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
      <UICarouselNav :currentSlide :slidesCount />
    </template>
  </Carousel>
</template>
<style>
.carousel-image-item {
  height: inherit;
  max-height: 500px;
  width:inherit;
  object-fit: contain;
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

const { images } = defineProps(["images"])

</script>