import { createRouter, createWebHistory, Router } from 'vue-router';
import Catalog from '../pages/Catalog.vue';
import Favourites from '../pages/Favourites.vue';

const router: Router = createRouter({
  history: createWebHistory(),
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
