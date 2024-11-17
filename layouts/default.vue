<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <header>
      <UINavBar />
    </header>
    <main>
      <slot />
    </main>
  <ModalsContainer />
</template>