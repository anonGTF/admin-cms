<template>
  <div>
    <Navbar />
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
</script>

<style lang="scss" scoped>
.content {
  margin-top: .9rem;
  background-color: #F7F8FA !important;
  min-height: calc(100vh - 4.5rem);
  @include desktop {
    margin-left: 240px;
  }
}
</style>