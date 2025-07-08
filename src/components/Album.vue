<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import PhotoType from '../types/photo.type';
import { useAlbumStore } from '../stores/album-store';
import { usePhotoStore } from '../stores/photo-store';
import { useFavouritesStore } from '../stores/favourites-store';
import Loader from '../components/Loader.vue';
import Photo from '../components/Photo.vue';
import Error from './Error.vue';

const props = defineProps<{
    id: number,
    title: string
}>();

const albumStore = useAlbumStore();
const photoStore = usePhotoStore();
const favouritesStore = useFavouritesStore();
const loaderOn: Ref<boolean> = ref(false);

const isOpenAlbum = computed<boolean>(() => {
    return albumStore.openAlbumId === props.id;
})

async function getPhotos(): Promise<void>{
    if(!isOpenAlbum.value){
        albumStore.openAlbumId = props.id;
        loaderOn.value = true;

        await photoStore.getPhotos(props.id);

        loaderOn.value = false;
    }else{
        albumStore.openAlbumId = null;
    }
}

function isFavourites(photo: PhotoType): boolean{
    return favouritesStore.searchPhotosInFavorites(photo.albumId, photo.id) > -1 ? true : false;
}
</script>

<template>
    <div class="list__item" @click="getPhotos">
        <div>
            <div v-if="!isOpenAlbum" class="list__actions">
                <img src="/img/open.png" alt="open">
            </div>
            <div v-else class="list__actions">
                <img src="/img/close.png" alt="close">
            </div>
        </div>
        <div class="list__item-info list__item-info-album">{{ title }}</div>
    </div>
    <Loader v-if="loaderOn"></Loader>
    <div v-else-if="isOpenAlbum">
        <Error v-if="photoStore.error" 
            title="Сервер не отвечает" 
            text="Уже работаем над этим"
            image="error.png"
        ></Error>
        <div v-else class="photo-list">
            <Photo v-for="photo in photoStore.userPhotos"
            :photo="photo"
            :isFavourite = isFavourites(photo)
            :showTitle="false"
            ></Photo>
        </div>
    </div>
</template>

<style scoped>
.list__item-info-album{
    font-size: 18px;
    font-family: 'Roboto-Regular', sans-serif;
}
@media (max-width: 560px) {
    .list__item-info-album{
        font-size: 16px;
    }
}
</style>