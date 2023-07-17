<template>
   <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->

    <box class="mt-5-5" title="Edit Profile">
      <div class="is-flex">
        <div>
          <figure class="image mx-0 mb-0">
            <img :src="user.avatar" class="avatar">
          </figure>
          <button class="button is-fullwidth mt-4">
            <span>Pilih Gambar</span>
          </button>
          <button class="button is-fullwidth bg-brand mt-2" @click="saveProfile">
            <span>Simpan</span>
          </button>
        </div>
        <div class="ml-5">
          <p class="mb-0">Nama</p>
          <input v-model="user.name" type="text" class="input" />

          <p class="mb-0 mt-4">Email</p>
          <input v-model="user.email" type="email" class="input" />

          <p class="mb-0 mt-4">Role</p>
          <div class="select">
            <select v-model="user.role">
              <option v-for="role in roles">{{ role }}</option>
            </select>
          </div>
        </div>
      </div>
    </box>

    <!-- END OF CONTENT -->
  </div>
</template>

<script setup lang="ts">
  import Box from '@/components/Box.vue'
	import Breadcrumb from '@/components/Breadcrumb.vue'
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "akun saya", to: '/profile' },
		{ name: "edit profile", to: '/edit' },
	]

  const { user, roles } = useUserStore()

  const saveProfile = () => {
    router.push("/profile")
  }
</script>

<style scoped>
.avatar {
  width: 200px !important;
  height: 200px !important;
  object-fit: cover;
}
</style>