<script setup lang="ts">
const pages = [
  {
    title: 'Главная',
    link: '/zzzoptimizer'
  },
  {
    title: 'Диски',
    link: '/zzzoptimizer/discs'
  },
  {
    title: 'Агенты',
    link: '/zzzoptimizer/agents'
  },
  {
    title: 'Амплификаторы',
    link: '/zzzoptimizer/wegines'
  },
  {
    title: 'Команды',
    link: '/zzzoptimizer/teams'
  },
  {
    title: 'Настройки',
    link: '/zzzoptimizer/settings'
  }
]
</script>



<template>
  <div class="navbar flex justify-between w-full">
    <a
      v-for="page in pages"
      :key="page.link"
      :href="page.link"
      class="bg-slate-700 hover:bg-slate-900 text-orange-500 font-extrabold text-center w-full decoration-transparent"
    >{{ page.title }}</a>
  </div>
</template>
