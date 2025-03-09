import { ref } from 'vue';
import { defineStore } from 'pinia';
import { PhotoService } from '@/services/photo-services';

export const usePhotoStore = defineStore('usePhotoStore', () => {
    const allPhotos = ref([]);
    const error = ref(false);
    const userPhotos = ref([]);

    async function getPhotos(albumId) {
        if (!error.value) {
            let list = searchPhotoInStore(albumId);
            if (!list) {
                await getPhotoInStore(albumId);
                await getPhotos(albumId);
            }
        }
    }

    async function getPhotoInStore(albumId) {
        let responsePhotos = await PhotoService.getPhotos(albumId);
        if (responsePhotos.data && !responsePhotos.error) {
            responsePhotos.data.forEach(photo => {
                allPhotos.value.push(photo);
            });
        } else {
            error.value = true;
        }
    }

    function searchPhotoInStore(albumId) {
        let isSearchPhotos = false;
        if (allPhotos.value.length > 0) {
            userPhotos.value = [];
            allPhotos.value.forEach((photo) => {
                if (photo.albumId === albumId) {
                    userPhotos.value.push(photo);
                    isSearchPhotos = true;
                }
            });
        }
        return isSearchPhotos;
    }

    return {
        userPhotos,
        getPhotos
    }
})