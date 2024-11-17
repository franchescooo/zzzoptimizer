<template>
  <template v-if="isOpen">
    <button 
      class="modal-close absolute inset-0 flex backdrop-brightness-50 z-20 w-full h-full items-center place-content-center" 
      @click="(e) => (e.target && e.target.classList.contains('modal-close')) ? $emit('closeModal') : 0"
    > 
      <div
        class="bg-neutral-600 rounded-xl"
      >  
        <slot />
      </div>
    </button>
  </template>  
</template>
<script lang="ts" setup>
const { isOpen } = defineProps(["isOpen"])
</script>
