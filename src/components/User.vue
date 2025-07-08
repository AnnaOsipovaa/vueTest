<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { useUserStore } from '../stores/user-store';
import { useAlbumStore } from '../stores/album-store';
import Loader from '../components/Loader.vue';
import Album from '../components/Album.vue';
import Error from './Error.vue';

const userStore = useUserStore();
const albumStore = useAlbumStore();
const loaderOn: Ref<boolean> = ref(false);

const props = defineProps<{
    id: number,
    name: string
}>();

const isOpenUser = computed<boolean>(() => {
    return userStore.openUserId === props.id;
})

async function getAlbums(): Promise<void>{
    if(!isOpenUser.value){
        userStore.openUserId = props.id;
        loaderOn.value = true;

        await albumStore.getAlbums(props.id);

        loaderOn.value = false;
    }else{
        userStore.openUserId = null;
    }
}
</script>

<template>
    <div>
        <div class="list__item" @click="getAlbums">
            <div>
                <div v-if="!isOpenUser" class="list__actions">
                    <img src="/img/open.png" alt="open">
                </div>
                <div v-else class="list__actions">
                    <img src="/img/close.png" alt="close">
                </div>
            </div>
            <div class="list__item-info list__item-info-user">{{ name }}</div>
        </div>

        <Loader v-if="loaderOn"></Loader>
        <div v-else-if="isOpenUser" class="albums">
            <Error v-if="albumStore.error" 
            title="Сервер не отвечает" 
            text="Уже работаем над этим"
            image="error.png"
            ></Error>

            <Album v-else v-for="album in albumStore.userAlbums"
            :key="album.id"
            :id="album.id"
            :title="album.title"
            ></Album> 
        </div>
    </div>
</template>

<style scoped lang="scss">
.list__item-info-user{
    font-size: 22px;
    font-family: 'Roboto-Medium', sans-serif;
}
.albums{
    padding: 0 56px;
}
@media (max-width: 560px) {
    .list__item-info-user{
        font-size: 20px;
    }
    .albums{
        padding: 0 25px;
    }
}
@media (max-width: 356px) {
    .albums{
        padding: 0 15px;
    }
}
</style>