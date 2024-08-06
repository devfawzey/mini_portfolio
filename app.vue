<script setup>
const nuxtApp = useNuxtApp()
const { __pageTransitionEnter__ } = useGsap()

nuxtApp.hook("page:finish", () => {
  // TODO
  __pageTransitionEnter__()
  // __showElementOnScroll__()
})
</script>

<template>
  <NuxtLayout>
    <BaseLoader />
    <NuxtPage />
  </NuxtLayout>
</template>
