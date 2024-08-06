<template>
  <main id='home-page' class='min-h-screen pt-28 relative'>
    <!-- <div class="bg-dots bg-[url('/dots.jpg')] absolute top-0 left-0 w-full h-full -z-10 opacity-25" /> -->
    <!-- <BaseWrapper > -->
    <HomeLanding />
    <HomeTimeline v-if="true" />
    <HomeProjects v-if="true" />
    <HomeTech />
    <HomeTools />
    <!-- </BaseWrapper> -->
  </main>
</template>

