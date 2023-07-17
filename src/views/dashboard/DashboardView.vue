<template>
	<div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- TITLE -->

		<h1 class="is-size-3">Dashboard</h1>
		<hr class="divider bg-color-muted my-5-5">

		<!-- END OF TITLE -->

		<!-- CONTENT -->

		<div class="columns is-desktop">
			<div class="column pr-4">

				<box title="Pengunjung">
					<simple-table :fields="visitor.fields" :items="visitor.items" />
				</box>
				
				<box title="Kondisi Sekolah">
					<simple-table :fields="schools.fields" :items="schools.items">
						<template #cell(registration)="{ value, item }">
							<span v-if="value !== ''" class="text-brand"><a :href="value">Sedang dibuka</a></span>
							<span v-else class="has-text-grey-light">Ditutup</span>
						</template>
					</simple-table>
				</box>
				
				<box title="Murid Baru">
					<simple-table :fields="newStudents.fields" :items="newStudents.items">
						<template #cell(time)="{ value, item }">
							<span>{{ formatDate(new Date(value), defaultFormatDate, todayFormatDate, yesterdayFormatDate) }}</span>
						</template>
					</simple-table>
				</box>
				
				<box title="Pendaftar Akun Wali Murid Terakhir">
					<simple-table :fields="newStudentParents.fields" :items="newStudentParents.items">
						<template #cell(time)="{ value, item }">
							<span>{{ formatDate(new Date(value), defaultFormatDate, todayFormatDate, yesterdayFormatDate) }}</span>
						</template>
					</simple-table>
				</box>
			</div>
			
			<div class="column pl-4">
			
				<box title="Laporan Lazis">
					<div class="box is-shadowless bordered p-4 is-flex">
						<div class="box is-shadowless bordered is-rounded p-0 mb-0 bg-brand">
							<span class="icon is-large has-text-white">
								<i class="mdi mdi-24px mdi-wallet-bifold"></i>
							</span>
						</div>
						<div class="ml-4">
							<p class="p-0 m-0">Total Kas</p>
							<p class="p-0 m-0 has-text-weight-bold">{{ formatRupiah(4250000) }}</p>
						</div>
					</div>
					<simple-table :fields="lazisReports.fields" :items="lazisReports.items">
						<template #cell(debit)="{ value, item }">
							<span>{{ formatRupiah(value) }}</span>
						</template>
						<template #cell(credit)="{ value, item }">
							<span>{{ formatRupiah(value) }}</span>
						</template>
						<template #cell(time)="{ value, item }">
							<span>{{ formatDate(parseDate(value, "MM/yyyy"), "MMMM yyyy") }}</span>
						</template>
					</simple-table>
				</box>
			
				<box title="Aktivitas Admin Terakhir ">
					<simple-table :fields="adminActivities.fields" :items="adminActivities.items">
						<template #cell(time)="{ value, item }">
							<span>{{ formatDate(new Date(value), defaultFormatDate, todayFormatDate, yesterdayFormatDate) }}</span>
						</template>
					</simple-table>
				</box>
			
				<box title="Artikel Post Terbaru">
					<simple-table :fields="articles.fields" :items="articles.items">
						<template #cell(title)="{ value, item }">
							<span>{{ truncateString(value, 30) }}</span>
						</template>
						<template #cell(time)="{ value, item }">
							<span>{{ formatDate(new Date(value), defaultFormatDate, todayFormatDate, yesterdayFormatDate) }}</span>
						</template>
					</simple-table>
				</box>
			</div>
		</div>

		<!-- END OF CONTENT -->
	</div>
</template>

<script setup lang="ts">
	import Box from '@/components/Box.vue'
	import SimpleTable from '@/components/SimpleTable.vue'
	import Breadcrumb from '@/components/Breadcrumb.vue'
	import { formatDate, parseDate, formatRupiah, truncateString } from '@/utils'

	const defaultFormatDate = "dd MMM, yyyy - HH:mm"
	const todayFormatDate = "'Hari Ini' - HH:mm"
	const yesterdayFormatDate = "'Kemarin' - HH:mm"

	const breadcrumbSections = [
		{ name: "dashboard", to: '/' }
	]

	const visitor = {
		fields: [
			{ label: "Kemarin", key: "yesterday" },
			{ label: "Hari Ini", key: "today"},
			{ label: "Bulan Kemarin", key: "lastMonth" },
			{ label: "Bulan Ini", key: "thisMonth" }
		],
		items: [
			{ id: 1, yesterday: 8, today: 5, lastMonth: 40, thisMonth: 23 },
		]
	}

	const schools = {
		fields: [
			{ label: "Sekolah", key: "school" },
			{ label: "Total Murid", key: "studentCount" },
			{ label: "Murid Aktif", key: "activeStudent" },
			{ label: "Pendaftaran", key: "registration" },	
		],
		items: [
			{ id:1, school: "Sekolah Dasar", studentCount: 40, activeStudent: 40, registration: "https://google.com" },
			{ id: 2, school: "Taman Kanak", studentCount: 32, activeStudent: 12, registration: "" }
		]
	}

	const newStudents = {
		fields: [
			{ label: "Nama", key: "name" },
			{ label: "Daftar ke", key: "registeredTo" },
			{ label: "Status", key: "status" },
			{ label: "Waktu", key: "time" },
		],
		items: [
			{ id: 1, name: "Hendra Prasetia", registeredTo: 'Sekolah Dasar', status: 'Terverifikasi', time:1689529933000  },
			{ id: 2, name: "Tutik Pujiwati", registeredTo: 'TPQ', status: 'Terverifikasi', time:1689528645000  },
			{ id: 3, name: "Andi Ronaldo", registeredTo: 'Taman Kanak', status: 'Terdaftar', time:1689251445000  },
			{ id: 4, name: "Aldi Mahendra", registeredTo: 'Taman Kanak', status: 'Terdaftar', time:1689251445000  },
		]
	}

	const newStudentParents = {
		fields: [
			{ label: "Nama", key: "name" },
			{ label: "Waktu Daftar", key: "time" }
		],
		items: [
			{ id: 1, name: "Pujiono", time: 1689529933000 },
			{ id: 2, name: "Kartolo", time: 1689529933000 },
			{ id: 3, name: "Intan Katulistiwa", time: 1689251445000 },
			{ id: 4, name: "Sukarti", time: 1689251445000 },
		]
	}

	const lazisReports = {
		fields: [
			{ label: "Pemasukan", key: "debit" },
			{ label: "Pengeluaran", key: "credit" },
			{ label: "Bulan", key: "time" },
		],
		items: [
			{ id: 1, debit: 300000, credit: 100000, time: "01/2021" },
			{ id: 2, debit: 540000, credit: 230000, time: "12/2020" },
			{ id: 3, debit: 200000, credit: 400000, time: "11/2020" },
			{ id: 4, debit: 200000, credit: 230000, time: "10/2020" },
		]
	}

	const adminActivities = {
		fields: [
			{ label: "Admin", key: 'name' },
			{ label: "Role", key: 'role' },
			{ label: "Login Terakhir", key: 'time' },
		],
		items: [
			{ id: 1, name: 'Master Admin', role: 'Master Admin', time: 1689529933000 },
			{ id: 2, name: 'Master Admin', role: 'Master Admin', time: 1689529933000 },
			{ id: 3, name: 'Sukardi', role: 'Admin Sekolah / SD', time: 1689251445000 },
			{ id: 4, name: 'Puji Kartika', role: 'Admin Sekolah / TK', time: 1689251445000 },
		]
	}

	const articles = {
		fields: [
			{ label: "Judul", key: "title" },
			{ label: "Kategori", key: "category" },
			{ label: "Oleh", key: "author" },
			{ label: "Waktu Post", key: "time" }
		],
		items: [
			{ id: 1, title: "Sunat masal dalam rangka merayakan HUT Yayasan", category: "Sosial", author: "Pujiono", time: 1689529933000 },
			{ id: 2, title: "8 Hal yang bisa dilakukan saat puasa", category: "Agama", author: "Pujiono", time: 1689251445000 },
			{ id: 3, title: "Anjuran berbuka puasa dengan yang manis-manis", category: "Agama", author: "Jamal", time: 1689251445000 },
			{ id: 4, title: "Tanggal penting di bulan Rajab", category: "Agama", author: "Suwanto", time: 1689251445000 },
		]
	}
</script>

<style scoped>

</style>