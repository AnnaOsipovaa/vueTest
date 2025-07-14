<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { PhotoType } from '../types/photo.type';
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
const x: Ref<string> = ref('0px');
const y: Ref<string> = ref('0px');
const titlePhoto: Ref<string> = ref('');
const showTitlePhotoFlag: Ref<boolean> = ref(false);
    
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

function showPhotoTitle(event: MouseEvent, photoTitle: string){
    const userCursore: MouseEvent = event;
    x.value = userCursore.clientX - 40 + 'px';
    y.value = userCursore.clientY + 30 + 'px';
    titlePhoto.value = photoTitle;
    showTitlePhotoFlag.value = true;
}

function hidePhotoTitle(){
    showTitlePhotoFlag.value = false;
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
            @showPhotoTitle="showPhotoTitle"
            @hidePhotoTitle="hidePhotoTitle"
            :photo="photo"
            :isFavourite = isFavourites(photo)
            :showTitle="false"
            ></Photo>
            <div class='image__pop-up-title' :class="{ 'activ' : !showTitlePhotoFlag }">{{ titlePhoto }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;
.list__item-info-album{
    font-size: 18px;
    font-family: 'Roboto-Regular', sans-serif;
}
.image__pop-up-title{
    position: fixed;
    background: $background-modal-color;
    color: $main-color;
    padding: 4px 8px;
    font-size: 12px;
    font-family: 'Roboto-Regular', sans-serif;
    border-radius: 4px;
    z-index: 1;
    max-width: 180px;
    top: v-bind(y);
    left: v-bind(x);
    opacity: 1;
    transition: opacity 0.3s;

    &.activ{
        opacity: 0;
    }
}
@media (max-width: 560px) {
    .list__item-info-album{
        font-size: 16px;
    }
}
</style>