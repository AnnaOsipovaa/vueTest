<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useFavouritesStore } from '../stores/favourites-store';

const props = defineProps<{
    photo: object,
    isFavourite: boolean,
    showTitle: boolean
}>();

const favouritesStore = useFavouritesStore();
const modalOpen: Ref<boolean> = ref(false);
const title: Ref<string> = ref(props.photo.title);
const thumbnailUrl: Ref<string> = ref(props.photo.thumbnailUrl);
const url: Ref<string> = ref(props.photo.url);

function addFavourites(): void{
    if(!props.isFavourite){
        favouritesStore.addToFavourites(props.photo.albumId, props.photo.id);
    }else{
        favouritesStore.deleteToFavourites(props.photo.albumId, props.photo.id);
    }
}

function openPhoto(): void{
    modalOpen.value = true;
};

function closeModal(): void{
  modalOpen.value = false;
};

</script>

<template>
    <div class="image" @click="openPhoto">
        <div class="image__action" @click.stop="addFavourites">  
            <div v-if="!isFavourite" class="image__action-item">  
                <img src="/img/star_empty.png" alt="добавить в избранное">
            </div>
            <div v-else class="image__action-item"  >
                <img src="/img/star_active.png" alt="удалить из избранного">
            </div>
        </div>
        <img class="image__img" :src="thumbnailUrl" :alt="title">
        <div :class="{ 'image__title' : showTitle , 'image__pop-up-title' : !showTitle }">{{ title }}</div>
    </div>

    <teleport to="body">
        <div v-if="modalOpen" class="modal" @click="closeModal">
            <button class="modal__close" @click="closeModal">
                <img src="/img/close_modal.svg" alt="">
            </button>
            <div class="modal__content" @click.stop>
                <img :src="url" class="modal__image" />
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.image{
    cursor: pointer;
    position: relative;

    &:hover{
        .image__pop-up-title{
            display: block;
        }
    }

    .image__action{
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 1;
    }

    .image__pop-up-title{
        display: none;
        position: absolute;
        bottom: -22px;
        left: 63px;
        background: $background-modal-color;
        color: $main-color;
        padding: 4px 8px;
        font-size: 12px;
        font-family: 'Roboto-Regular', sans-serif;
        border-radius: 4px;
        z-index: 1;
        width: fit-content;
    }

    .image__img{
        max-width: 100%;
    }

    .image__title{
        color: $title-photo-color;
        font-size: 14px;
        font-family: 'Roboto-Regular', sans-serif;
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $background-modal-color;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal__close {
        position: absolute;
        top: 32px;
        right: 40px;
        background-color: transparent;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }

    .modal__content {
        position: relative;
        text-align: center;

        .modal__image {
            max-width: 90%;
            max-height: 90%;
        }
    }
}
</style>