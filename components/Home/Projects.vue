<script setup lang='ts'>
import { PROJECTS } from "~/constants"


</script>

<template>
  <section id='projects' class='min-h-screen'>
    <hr class="my-6 border-white/20" fade-scroll />
    <div class="text-2xl mb-4" fade-scroll>Projects</div>
    <!--  -->
    <div class="grid_container">
      <template v-for="prjct in PROJECTS">
        <div v-if="prjct.show !== false" :class="[prjct.grid ?? 'medium']" class="card" fade-scroll>
          <div
            class="img__wrapper group rounded-xl relative w-[90%] h-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <!-- content -->
            <a :href="prjct.link" target="__blank"
              class="content cursor-pointer md:group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black/30 md:bg-black/50 z-[1] md:opacity-0 flex flex-col items-center justify-center transition-opacity opacity-100">
              <div class="flex items-center justify-between">
                <span v-text="prjct.title" />
                <UIcon name="radix-icons:arrow-top-right" class="text-2xl" />
              </div>
              <div class="techs_used mt-2 space-x-2">
                <UIcon v-for="tag in prjct.techs" :name="tag" class="text-2xl" />
              </div>
            </a>
            <NuxtImg v-if="true" quality="60" :alt="prjct.title"
              placeholder-class="animate-pulse !w-full !h-full max-w-full" format="webp" loading="lazy" placeholder
              sizes="550px, sm:700px" :src="`/compressed/${prjct.src}.png`"
              class="w-full !bg-slate-700 max-w-none h-full absolute top-0 scale-110 -translate-x-1/2 -translate-y-0 left-1/2 rounded-xl object-top origin-top object-cover" />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="postcss">
.grid_container {
  grid-auto-rows: 10px;
  /* justify-content: center; */
  grid-template-columns: repeat(auto-fill, minmax(269px, 1fr));
  @apply grid gap-3
}

.card {
  @apply bg-main rounded-xl
}

.small {
  grid-row-end: span 14;
}

.medium {
  grid-row-end: span 16;
}

.large {
  grid-row-end: span 18;
}

.x-large {
  grid-row-end: span 20;
}

.xx-large {
  grid-row-end: span 24;
}

.u-skeleton {
  @apply animate-pulse !w-full !h-full bg-slate-700 !max-w-full
}
</style>