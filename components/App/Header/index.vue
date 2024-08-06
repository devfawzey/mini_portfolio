<script setup lang='ts'>
import { HEADERLINKS } from "~/constants"
const { animateHeaderInicator } = useGsap()
</script>

<template>
  <header id='header'
    class='fixed z-10 lg:rotate-90 lg:left-0 lg:top-1/2 lg:-translate-x-1/3 lg:rotat-90 bottom-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-gradient-to-r from-main to-main-foreground min-w-64 lg:h-max rounded-full px-4 overflow-hidden'>
    <!-- indicator -->
    <div class="header__wrapper  relative w-full h-full py-6 flex items-center justify-center">
      <div id="indicator"
        class="absolute w-12 h-12 bg-gradient-to-r from-indigo-600 to-pink-600 -translate-x-36 left-0 top-1/2 rounded-full -translate-y-1/2" />
      <!-- icons -->
      <template v-for="(link, index) in HEADERLINKS">
        <!-- <UTooltip text="hello wolrd" :popper="{ placement: 'right' }"> -->
        <UIcon :data-section="link.title" :data-index="index" @click="animateHeaderInicator($event)" :name="link.icon"
          :class="[link.title]" class="head-icon cursor-pointer inline-block text-2xl w-12 h-8 lg:-rotate-90" />
        <!-- </UTooltip> -->
      </template>
    </div>
  </header>
</template>

<style scoped>
.u-gradient {
  background: rgb(63, 94, 251);
  background: radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
}
</style>