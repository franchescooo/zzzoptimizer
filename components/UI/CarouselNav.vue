<template>
  <div class="carousel-nav">
    <span 
      v-for="id in slidesCount"
      :key="id"
      :class="id == ((currentSlide + slidesCount) % slidesCount) + 1 ? 'classCur' : 'classOther'"
    >
      {{ id == ((currentSlide + slidesCount) % slidesCount) + 1 ? "●" : "○" }}
    </span>
  </div>
</template>
<style>
.carousel-nav {
  position: relative;
  margin-top: -40px;
  color: white;
  font-size: x-large;
}
.classCur {
  font-size: xx-large;
  vertical-align: -3px;
}
.classOth {
  font-size: medium;
}
</style>
<script setup>
const { currentSlide, slidesCount } = defineProps(["currentSlide", "slidesCount"]) 
console.log(currentSlide)
</script>