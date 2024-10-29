<template>
  <Carousel>
    <Slide
      v-for="id in images.length"
      :key="id"
    >
      <img :src="images[id - 1]" class="carousel-image-item">
    </Slide>
  </Carousel>
</template>
<style>
.carousel-image-item {
  height: 400px;
}
</style>
<script lang="js" setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const images = [
  "https://preview.redd.it/what-rarity-will-miyabi-v0-d6678sypamad1.jpeg?auto=webp&s=6d4cb4c1a042f1582f689c966cd1434c63369662",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhJ4DqkApCfioz7FX3WI0eGdxiGxyySQJ2VA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR97NGYNbzxJa6JrdH9xtyx-CjEvi_qT2arYw&s",
]

</script>