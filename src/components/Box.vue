<template>
  <div class="box p-5 mb-5-5">
		<div class="is-flex mb-4">
			<p class="is-size-5 has-text-weight-bold is-flex-grow-1 mb-0">{{ title }}</p>
			<slot name="action"></slot>
		</div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
const { title } = defineProps({
  title: String
})
</script>

<style scoped>

</style>