<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->
    <box class="mt-5-5" :title="getTitledString(section)">
      <swapable-expandable-table 
        :fields="fields" 
        :initial-items="items"
      >
        <template #cell(delete)="{ value, item }">
          <button class="button is-danger is-outlined" @click="deleteData(item.id, section)">
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

      <button class="button" @click="appendData(section)">
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
  import { useFooterStore } from '@/stores/footer';

  const path = useRoute().path
  const section = ref(path.split('/').slice(-1)[0])

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "konten website", to: '/pages' },
		{ name: "bagian footer", to: '/footer' },
		{ name: getTitledString(section.value), to: path },
	]

  const { detailFields: fields, getCorrectItems, appendData, deleteData } = useFooterStore()
  const items = getCorrectItems(section.value)
</script>

<style scoped>

</style>