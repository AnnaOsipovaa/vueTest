import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../pages/Catalog.vue'
import Favourites from '../pages/Favourites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    }
  ],
})

export default router
