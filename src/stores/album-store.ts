import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { AlbumService } from '../services/album-services';
import { ResponseType } from '../types/response.type';
import { AlbumType } from '../types/album.type';

export const useAlbumStore = defineStore('useAlbumStore', () => {
    const openAlbumId: Ref<number> = ref(0);
    const allAlbums: Ref<object> = ref({});
    const error: Ref<boolean> = ref(false);
    const userAlbums: Ref<AlbumType[]> = ref([]);

    async function getAlbums(userId: number): Promise<void> {
        if (error.value) {
            return;
        }

        const list: AlbumType[] | null = searchAlbumInStore(userId);
        if (list) {
            userAlbums.value = list;
        } else {
            await getAlbumInStore(userId);
            await getAlbums(userId);
        }
    }

    async function getAlbumInStore(userId: number): Promise<void> {
        const responseAlbums: ResponseType = await AlbumService.getAlbums(userId);
        if (responseAlbums.data && !responseAlbums.error) {
            allAlbums.value[userId] = responseAlbums.data;
        } else {
            error.value = true;
        }
    }

    function searchAlbumInStore(userId: number): AlbumType[] | null {
        let userAlbums: AlbumType[] | null = null;
        if (allAlbums.value && allAlbums.value[userId]) {
            userAlbums = allAlbums.value[userId];
        }
        return userAlbums;
    }

    return {
        openAlbumId,
        userAlbums,
        getAlbums
    }
})