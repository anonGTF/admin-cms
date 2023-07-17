<template>
  <nav class="navbar has-shadow is-fixed-top" role="navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <span class="is-size-3 has-text-weight-bold">Admin CMS</span>
      </router-link>

      <a 
        role="button" 
        class="navbar-burger" 
        :class="{ 'is-active': showMobileMenu }"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div 
      class="navbar-menu"
      :class="{ 'is-active': showMobileMenu }"
    >
      <div class="navbar-start is-hidden-desktop">
        <router-link
          v-for="(menuItem, i) in menuItems"
          :key="i"
          :to="menuItem.link"
          class="navbar-item"
          :class="{ 'has-dropdown is-hoverable': menuItem.hasChild }"
        >
          <span class="icon-text" :class="{ 'navbar-link': menuItem.hasChild }">
            <span class="icon">
              <i class="mdi" :class="menuItem.icon"></i>
            </span>
            <span @click="showMobileMenu = false">{{ menuItem.name }}</span>
          </span>

          <div v-if="menuItem.hasChild">
            <div class="navbar-dropdown" v-for="(childItem, i) in menuItem.childrenItems" :key="i">
              <router-link 
                :to="childItem.link"
                class="navbar-item"
              >
                <span>{{ childItem.name }}</span>
              </router-link>
            </div>
          </div>
        </router-link>
      </div>

      <div class="navbar-end is-hidden-touch">
        <div class="navbar-item">
          <figure class="image is-32x32">
            <img :src="avatarPlaceholder" class="is-rounded">
          </figure>
          <p class="ml-3 is-size-6 has-text-weight-bold">Jane Doe</p>
        </div>
      </div>
    </div>
  </nav>

  <div class="is-hidden-touch box mb-0 pb-0 sidebar">
      <aside class="menu">
        <ul class="menu-list">
          <li v-for="(menuItem, i) in menuItems" :key="i">
            <router-link :to="menuItem.link">
              <span class="icon-text is-align-items-center my-1">
                <span class="icon is-medium">
                  <i class="mdi mdi-24px" :class="menuItem.icon"></i>
                </span>
                <span @click="showMobileMenu = false">{{ menuItem.name }}</span>
              </span>
            </router-link>
            <ul v-if="menuItem.hasChild">
              <li v-for="(childItem, i) in menuItem.childrenItems">
                <router-link :to="childItem.link">
                  {{ childItem.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showMobileMenu = ref<boolean>(false);
  const avatarPlaceholder = "https://i.pravatar.cc/300"

  const menuItems = [
    {
      name: 'Dashboard',
      link: '/',
      icon: 'mdi-view-dashboard',
      hasChild: false,
      childrenItems: []
    },
    {
      name: 'Website Contents',
      link: '/pages',
      icon: 'mdi-laptop',
      hasChild: true,
      childrenItems: [
        {
          name: 'All Pages',
          link: '/pages'
        },
        {
          name: 'Header',
          link: '/header'
        },
        {
          name: 'Footer',
          link: '/footer'
        },
      ]
    },
    {
      name: 'My Profile',
      link: '/profile',
      icon: 'mdi-account',
      hasChild: false,
      childrenItems: []
    },
  ]
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 240px;
  margin-top: 3.25rem;
  overflow-y: auto;
}

.navbar-item img {
  max-height: 100% !important;
}
</style>