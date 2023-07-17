<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->
    <box class="mt-5-5" title="Menu Footer">
      <simple-table :fields="fields" :items="footerItems">
				<template #cell(actions)="{ value, item }">
					<router-link :to="`/footer/${toHypenString(item.section as string)}`">
						<button class="button">
							<span class="icon">
								<i class="mdi mdi-pencil"></i>
							</span>
							<span>Edit</span>
						</button>
					</router-link>
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
	import { toHypenString } from '@/utils';
import { useFooterStore } from '@/stores/footer';

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "konten website", to: '/pages' },
		{ name: "bagian footer", to: '/footer' },
	]

  const pages = {
		fields: [
			{ label: "Bagian", key: "section" },
			{ label: "Menu Item", key: "item"},
			{ label: "", key: "actions" }
		],
		items: [
			{ id: 1, section: "Social Media" },
			{ id: 2, section: "Shortcut Menu 1" },
			{ id: 3, section: "Shortcut Menu 2" },
			{ id: 4, section: "Shortcut Menu 3" },
		]
	}

	const { fields, footerItems } = useFooterStore()
</script>

<style scoped>

</style>