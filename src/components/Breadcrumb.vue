<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul class="m-0">
        <li 
          v-for="(section, index) in sections" 
          class="is-uppercase has-text-weight-bold mt-0"
          :class="{'is-active': (index === sections.length - 1)}"
        >
          <router-link :to="section.to">{{ section.name }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';

  interface Breadcrumb {
    name: string,
    to: string
  }

  const { sections } = defineProps({
    sections: { type: Array as PropType<Breadcrumb[]>, default: () => [] },
  })
</script>

<style lang="scss" scoped>
.breadcrumb a {
  color: $color-brand;

  &:hover {
    color: #4a4a4a;
  }
}
</style>