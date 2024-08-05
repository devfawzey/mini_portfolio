<script setup>
const nuxtApp = useNuxtApp()
const { __pageTransitionEnter__, __showElementOnScroll__, _animateLandingContent_ } = useGsap()

nuxtApp.hook("page:finish", () => {
  // TODO
  __pageTransitionEnter__()
  // __showElementOnScroll__()
})
</script>

<template>
  <!-- <UButton @click="_animateLandingContent_">animate</UButton> -->
  <NuxtLayout>
    <BaseLoader />
    <NuxtPage />
  </NuxtLayout>
</template>
