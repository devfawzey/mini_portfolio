<script setup lang='ts'>
import { HEADERLINKS } from "~/constants"
const { animateHeaderInicator, changeIndicatorActiveTabOnScroll } = useGsap()
const activeTab = ref('home-page') // index??

onMounted(() => {
  setTimeout(() => {
    changeIndicatorActiveTabOnScroll((title) => { activeTab.value = title })
  }, 1500)

  window.addEventListener('resize', useDebounceFn(() => animateHeaderInicator(activeTab.value, true), 750))
})
watch(activeTab, (newValue) => {
  animateHeaderInicator(newValue)
})
</script>

<template>
  <header id='header' class='fixed z-10 bottom-0 left-1/2 -translate-x-1/2  sm:-translate-y-3 max-w-full'>
    <!-- lg:rotate-90 lg:-translate-y-1/2 lg:left-0 lg:top-1/2 lg:translate-x-[-30%] lg:h-max-->
    <!-- indicator -->
    <div class="header__container min-h-40 overflow-hidden w-full flex items-end">

      <div class="px-8 max-w-full rounded-t-xl  sm:rounded-full bg-main-foreground">
        <div class="header__wrapper py-6 relative h-max w-full flex items-center justify-center">
          <div id="indicator" v-if="true"
            class=" absolute w-20 h-20 bg-transparent -translate-x-36 left-0 top-0 rounded-full -translate-y-1/2">
            <span class="absolute top-0 left-0 w-full h-1/2 bg-white rounded-tl-full rounded-tr-full" />
            <!-- bg-gradient-to-r from-indigo-600 to-pink-600 -->
            <!-- <span
          class="absolute top-1/2 -left-[22px] w-5 aspect-square bg-transparent u-shadow rounded-tr-[20px]" />
        <span
          class="absolute top-1/2 -right-[22px] w-5 aspect-square bg-transparent u-shadow rounded-tl-[20px]" /> -->
          </div>
          <!-- icons -->
          <template v-for="(link, index) in HEADERLINKS">
            <!-- <UTooltip text="hello wolrd" :popper="{ placement: 'right' }"> -->
            <div class="head-link w-20 cursor-pointer flex flex-col relative items-center justify-center"
              :data-section="link.title" :data-index="index" @click="activeTab = link.title">
              <div class="head-icon w-full icon_wrapper flex flex-col relative items-center justify-center">
                <UIcon :name="link.icon" :class="[link.title]" class="relative w-full inline-block text-2xl " />
              </div>
              <span v-text="link.title"
                class="text-white  text-xs head-text opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 capitalize" />
            </div>
            <!-- </UTooltip> -->
          </template>
        </div>
      </div>
    </div>

  </header>
</template>

<style scoped>
.u-gradient {
  background: rgb(63, 94, 251);
  background: radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
}

.u-shadow {
  box-shadow: 0px -10px 0 0 #000;
}
</style>