<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->

    <box class="mt-5-5" title="Halaman Website">
      <template #action>
        <button class="button bg-brand">
          <span class="icon">
            <i class="mdi mdi-plus"></i>
          </span>
          <span>Buat Halaman Baru</span>
        </button>
      </template>
      <simple-table :fields="pages.fields" :items="pages.items">
        <template #cell(status)="{ value, item }">
          <span v-if="value === 'always'" class="has-text-weight-bold">Selalu aktif</span>
          <span v-else-if="value === 'active'" class="has-text-weight-bold text-brand">Aktif</span>
          <span v-else class="has-text-weight-bold has-text-grey-light">Tidak aktif</span>
        </template>
        <template #cell(actions)="{ value, item }">
          <div class="field is-grouped">
            <div class="control">
              <button class="button">
                <span class="icon">
                  <i class="mdi mdi-view-quilt-outline"></i>
                </span>
                <span>Design</span>
              </button>
            </div>
            <div class="control">
              <button class="button">
                <span class="icon">
                  <i class="mdi mdi-eye"></i>
                </span>
                <span>Preview</span>
              </button>
            </div>
            <div class="control">
              <button class="button">
                <span class="icon">
                  <i class="mdi mdi-pencil"></i>
                </span>
                <span>Info</span>
              </button>
            </div>
            <div class="control" v-if="item.status !== 'always'">
              <button class="button is-danger is-outlined">
                <span class="icon is-small">
                  <i class="mdi mdi-delete"></i>
                </span>
              </button>
            </div>
          </div>
        </template>
      </simple-table>
    </box>

    <!-- END OF CONTENT -->
  </div>
</template>

<script setup lang="ts">
  import Box from '@/components/Box.vue'
	import SimpleTable from '@/components/SimpleTable.vue'
	import Breadcrumb from '@/components/Breadcrumb.vue'

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "konten website", to: '/pages' },
		{ name: "halaman", to: '/pages' },
	]

  const pages = {
		fields: [
			{ label: "Halaman", key: "page" },
			{ label: "Permalink", key: "permalink"},
			{ label: "Status", key: "status" },
			{ label: "", key: "actions" }
		],
		items: [
			{ id: 1, page: "Homepage", permalink: "almanshur.com", status: "always", actions: null },
			{ id: 2, page: "Tentang Yayasan", permalink: "almanshur.com/tentang-yayasan", status: "active", actions: null },
			{ id: 3, page: "Laziz", permalink: "almanshur.com/laziz", status: "inactive", actions: null },
		]
	}
</script>

<style scoped>

</style>