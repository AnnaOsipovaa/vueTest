<script setup>
import { ref } from 'vue';
import { useFavouritesStore } from '@/stores/favourites-store';

const props = defineProps({
    photo: Object,
    isFavourite: Boolean,
    showTitle: Boolean
});

const favouritesStore = useFavouritesStore();
const modalOpen = ref(false);
const title = ref(props.photo.title);
const thumbnailUrl = ref(props.photo.thumbnailUrl);
const url = ref(props.photo.url);

function addFavourites(){
    if(!props.isFavourite){
        favouritesStore.addToFavourites(props.photo.albumId, props.photo.id);
    }else{
        favouritesStore.deleteToFavourites(props.photo.albumId, props.photo.id);
    }
}

function openPhoto(){
    modalOpen.value = true;
};

function closeModal(){
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

<style scoped>
.image{
    cursor: pointer;
    position: relative;
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
    background: rgba(0, 0, 0, 0.69);
    color: var(--main-color);
    padding: 4px 8px;
    font-size: 12px;
    font-family: 'Roboto-Regular', sans-serif;
    border-radius: 4px;
    box-sizing: border-box;
    z-index: 1;
    width: fit-content;
}
.image:hover .image__pop-up-title{
    display: block;
}
.image__title{
    color: var(--title-photo-color);
    font-size: 14px;
    font-family: 'Roboto-Regular', sans-serif;
}
.image__img{
    max-width: 100%;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal__content {
  position: relative;
  text-align: center;
}
.modal__image {
  max-width: 90%;
  max-height: 90%;
}
.modal__close {
  position: absolute;
  top: 32px;
  right: 40px;
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>