<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->
    <box class="mt-5-5" title="Logo">
      <div class="is-flex">
        <figure class="image mx-0 mb-0">
          <img :src="imageUrl" class="logo">
        </figure>
        <div class="ml-4">
          <div class="file is-flex is-align-items-center">
            <label class="file-label">
              <input class="file-input" type="file" name="resume">
              <span class="file-cta">
                <span class="file-label">
                  Choose file
                </span>
              </span>
            </label>
            <p class="mb-0 ml-2">No file choosen</p>
          </div>
          <p class="has-text-grey-light mt-2 mb-3">JPG atau PNG. Ukuran maks 512kb</p>
          <button class="button bg-brand">
            <span>Upload logo baru</span>
          </button>
        </div>
      </div>
    </box>

    <box class="mt-5-5" title="Menu Header">
      <template #action>
        <button class="button bg-brand">
          <span>Simpan & Update</span>
        </button>
      </template>
      <swapable-expandable-table 
        :fields="fields" 
        :child-fields="childrenFields"
        :initial-items="headers"
        :has-child="true"
      >
        <template #cell(delete)="{ value, item }">
          <button class="button is-danger is-outlined" @click="deleteData(item.id)">
            <span class="icon is-small">
              <i class="mdi mdi-24px mdi-close"></i>
            </span>
          </button>
        </template>

        <template #cell(label)="{ value, item }">
          <input v-model="item.label" class="input" type="text" placeholder="Masukkan label">
        </template>

        <template #cell(permalink)="{ value, item }">
          <input v-if="item.children!.length === 0" v-model="item.permalink" class="input" type="text" placeholder="Masukkan permalink">
          <p v-else class="text-brand">{{ `Punya ${item.children!.length} menu turunan` }}</p>
        </template>

        <template #cell(openNewTab)="{ value, item }">
          <label v-if="item.children!.length === 0" class="checkbox">
            <input type="checkbox" v-model="item.openNewTab">
            <span class="ml-2">Buka tab baru</span>
          </label>
          <span v-else></span>
        </template>

        <template #childCell(icon)>
          <div class="my-1">
            <span class="icon">
              <i class="mdi mdi-24px mdi-arrow-right-bottom"></i>
            </span>
          </div>
        </template>

        <template #childCell(delete)="{ value, parent, item }">
          <button class="button is-danger is-outlined" @click="deleteChild(item.id, parent.id)">
            <span class="icon is-small">
              <i class="mdi mdi-24px mdi-close"></i>
            </span>
          </button>
        </template>

        <template #childCell(label)="{ value, item }">
          <input v-model="item.label" class="input" type="text" placeholder="Masukkan label">
        </template>

        <template #childCell(permalink)="{ value, item }">
          <input v-model="item.permalink" class="input" type="text" placeholder="Masukkan permalink">
        </template>

        <template #childCell(openNewTab)="{ value, item }">
          <label class="checkbox">
            <input type="checkbox" v-model="item.openNewTab">
            <span class="ml-2">Buka tab baru</span>
          </label>
        </template>

        <template #childAction="{ item }">
          <button class="button mb-4 ml-4" @click="appendChild(item.id)">
            <span class="icon">
              <i class="mdi mdi-plus"></i>
            </span>
            <span>Tambah menu turunan</span>
          </button>
        </template>
      </swapable-expandable-table>

      <button class="button mt-4" @click="appendData">
        <span class="icon">
          <i class="mdi mdi-plus"></i>
        </span>
        <span>Tambah menu baru</span>
      </button>

      <ul class="text-black-subtle has-text-weight-semibold is-size-7 mt-4">
        <li>Default link www.almanshur.com/<span class="is-underlined">the-url</span></li>
        <li>Gunakan <span class="is-underlined">http://the-url</span> jika akan di link kan ke website lain.</li>
      </ul>
    </box>

    <!-- END OF CONTENT -->
  </div>
</template>

<script setup lang="ts">
  import Box from '@/components/Box.vue'
	import SwapableExpandableTable from '@/components/SwapableExpandableTable.vue'
	import Breadcrumb from '@/components/Breadcrumb.vue'
  import { ref } from 'vue';
  import { useHeaderStore } from '@/stores/header';

  const imageUrl = ref("https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png")

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "konten website", to: '/pages' },
		{ name: "bagian header", to: '/header' },
	]

  const { headers, fields, childrenFields, appendData, deleteData, appendChild, deleteChild } = useHeaderStore()
</script>

<style scoped>
.logo {
  width: 200px !important;
  height: 125px !important;
}
</style>