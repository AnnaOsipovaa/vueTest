<script setup lang="ts">
import { onMounted } from 'vue';
import { useFavouritesStore } from './stores/favourites-store';

const favouritesStore = useFavouritesStore();
onMounted(async () => {
  favouritesStore.getFavouritesPhotosTheLocalStorage();
})

</script>

<template>
  <nav class="navbar">
    <RouterLink :to="{ name: 'catalog' }" class="navbar__item">Каталог</RouterLink>
    <RouterLink :to="{ name: 'favourites' }" class="navbar__item">Избранное</RouterLink>
  </nav>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@use './assets/styles/variables' as *;

.navbar{
  display: flex;
  padding-top: 64px;

  .navbar__item{
    width: 100%;
    text-align: center;
    background: $main-color;
    padding: 16px;
    border-radius: 16px;
    font-size: 18px;
    cursor: pointer;
    font-family: 'Roboto-Regular', sans-serif;
    font-weight: 400;
    text-decoration: none;
    color: $text-color;

    &.router-link-active{
      background: $hover-background-color;
      color: $hover-text-color;
    }
  }
}
.content{
  padding-bottom: 126px;
  flex-grow: 1;
}
@media (max-width: 780px) {
  .navbar{
    padding-top: 30px;
  }
}
</style>
