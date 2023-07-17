<template>
  <div class="p-5-5">
		<!-- BREADCRUMB -->

		<breadcrumb :sections="breadcrumbSections" />

		<!-- END OF BREADCRUMB -->

		<!-- CONTENT -->

    <box class="mt-5-5" title="Akun Saya">
      <div class="is-flex">
        <div>
          <figure class="image mx-0 mb-0">
            <img :src="user.avatar" class="avatar">
          </figure>
          <router-link to="/profile/edit">
            <button class="button bg-brand is-fullwidth mt-4">
              <span>Edit Profile</span>
            </button>
          </router-link>
        </div>
        <div class="ml-5">
          <p class="has-text-grey-light mb-0">Nama</p>
          <p class="is-size-5 has-text-weight-bold">{{ user.name }}</p>

          <p class="has-text-grey-light mb-0">Email</p>
          <p class="is-size-5 has-text-weight-bold">{{ user.email }}</p>

          <p class="has-text-grey-light mb-0">Role</p>
          <p class="is-size-5 has-text-weight-bold">{{ user.role }}</p>
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

  const breadcrumbSections = [
		{ name: "dashboard", to: '/' },
		{ name: "akun saya", to: '/profile' },
	]

  const { user } = useUserStore()
</script>

<style scoped>
.avatar {
  width: 200px !important;
  height: 200px !important;
  object-fit: cover;
}
</style>