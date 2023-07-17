<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->
    <box class="mt-5-5" :title="getTitledString(section)">
      <swapable-expandable-table 
        :fields="pages.fields" 
        :initial-items="pages.items"
      >
        <template #cell(delete)="{ value, item }">
          <button class="button is-danger is-outlined">
            <span class="icon is-small">
              <i class="mdi mdi-24px mdi-close"></i>
            </span>
          </button>
        </template>

        <template #cell(label)="{ value, item }">
          <input v-model="item.label" class="input" type="text" placeholder="Masukkan label">
        </template>

        <template #cell(permalink)="{ value, item }">
          <input v-model="item.permalink" class="input" type="text" placeholder="Masukkan permalink">
        </template>

        <template #cell(openNewTab)="{ value, item }">
          <label class="checkbox">
            <input type="checkbox" v-model="item.openNewTab">
            <span class="ml-2">Buka tab baru</span>
          </label>
        </template>
      </swapable-expandable-table>

      <button class="button">
        <span class="icon">
          <i class="mdi mdi-plus"></i>
        </span>
        <span>Tambah Link {{ getTitledString(section) }}</span>
      </button>
    </box>

    <!-- END OF CONTENT -->
  </div>
</template>

<script setup lang="ts">
  import Box from '@/components/Box.vue'
	import SwapableExpandableTable from '@/components/SwapableExpandableTable.vue'
	import Breadcrumb from '@/components/Breadcrumb.vue'
  import { getTitledString } from '@/utils'
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  const path = useRoute().path
  const section = ref(path.split('/').slice(-1)[0])

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "konten website", to: '/pages' },
		{ name: "bagian footer", to: '/footer' },
		{ name: getTitledString(section.value), to: path },
	]

  const pages = {
		fields: [
			{ label: "", key: "delete" },
			{ label: "Sosial Media", key: "socialMedia"},
			{ label: "Permalink", key: "permalink" },
      { label: "", key: "openNewTab" }
		],
		items: [
			{ id: 1, order: 1, socialMedia: "Instagram", permalink: "https://instagram.com", openNewTab: false },
			{ id: 2, order: 2, socialMedia: "Tiktok", permalink: "https://instagram.com", openNewTab: false },
		]
	}
</script>

<style scoped>

</style>