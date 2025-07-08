<script setup lang="ts">
import { onMounted, ref, watch, Ref } from 'vue';
import { useFavouritesStore } from '../stores/favourites-store';
import Loader from '../components/Loader.vue';
import Photo from '../components/Photo.vue';
import Error from '../components/Error.vue';

const favouritesStore = useFavouritesStore();
const loaderOn: Ref<boolean> = ref(false);

onMounted(()=>{
    watch(
        favouritesStore.favouritesPhotos, 
        async () => {
            loaderOn.value = true;

            await favouritesStore.getFavouritesPhotos();

            loaderOn.value = false;
        },
        { immediate: true }
    )
})

</script>

<template>
    <div class="favourites">
        <Loader v-if="loaderOn" class="full-screen"></Loader>
        <div v-else>
            <Error v-if="favouritesStore.favouritesPhotos.length === 0" class="full-screen flex-direction-column" 
            title="Список избранного пуст" 
            text="Добавляйте изображения, нажимая на звездочки"
            image="empty.png"
            ></Error>
            <div v-else class="photo-list">
                <Photo v-for="photo in favouritesStore.allInfoOfFavouritesPhotos"
                :key="photo.id"
                :photo="photo"
                :isFavourite = true
                :showTitle="true"
                ></Photo>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.favourites{
   padding: 56px 0px; 
   max-width: 534px;
   margin: 0 auto;
}
</style>