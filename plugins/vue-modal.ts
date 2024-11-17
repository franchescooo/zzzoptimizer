import { createVfm } from "vue-final-modal";

export default defineNuxtPlugin(() => {
  const vfm = createVfm() as any;
  
  useNuxtApp().vueApp.use(vfm);
})