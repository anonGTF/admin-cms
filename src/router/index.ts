import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/dashboard/DashboardView.vue'
import PagesView from '@/views/pages/PagesView.vue'
import NewPageView from '@/views/pages/NewPageView.vue'
import DetailPageView from '@/views/pages/DetailPageVIew.vue'
import DesignPageView from '@/views/pages/DesignPageView.vue'
import HeaderView from '@/views/header/HeaderView.vue'
import FooterView from '@/views/footer/FooterView.vue'
import DetailFooterView from '@/views/footer/DetailFooterView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import EditProfileView from '@/views/profile/EditProfileView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: DashboardLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: '/pages',
          name: 'all pages',
          component: PagesView
        },
        {
          path: '/pages/new',
          name: 'new page',
          component: NewPageView
        },
        {
          path: '/pages/:id',
          name: 'detail page',
          component: DetailPageView
        },
        {
          path: '/header',
          name: 'header',
          component: HeaderView
        },
        {
          path: '/footer',
          name: 'footer',
          component: FooterView
        },
        {
          path: '/footer/:section',
          name: 'detail footer',
          component: DetailFooterView
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: '/profile/edit',
          name: 'edit profile',
          component: EditProfileView
        },
      ]
    },
    {
      path: '/pages/design/:id',
      name: 'design page',
      component: DesignPageView
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/404/404.vue"),
    },
  ]
})

export default router
