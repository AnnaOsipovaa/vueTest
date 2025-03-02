import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AlbumService } from '@/services/album-services';

export const useAlbumStore = defineStore('useAlbumStore', () => {
    const openAlbumId = ref(0);
    const allAlbums = ref({});
    const error = ref(false);
    const userAlbums = ref([]);

    async function getAlbums(userId) {
        if(!error.value){
            let list = searchAlbumInStore(userId);
            if(list) {
                userAlbums.value = list;
            } else {
                await getAlbumInStore(userId);
                await getAlbums(userId);
            }
        }
    }

    async function getAlbumInStore(userId) {
        let responseAlbums = await AlbumService.getAlbums(userId);
        if (responseAlbums.data && !responseAlbums.error) {
            allAlbums.value[userId] = responseAlbums.data;
        } else {
            error.value = true;
        }
    }

    function searchAlbumInStore(userId) {
        let userAlbums = null;
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