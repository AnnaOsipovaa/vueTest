import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { PhotoService } from '../services/photo-services';
import { ResponseType } from '../types/response.type';
import { PhotoType } from '../types/photo.type';

export const usePhotoStore = defineStore('usePhotoStore', () => {
    const allPhotos: Ref<PhotoType[]> = ref([]);
    const error: Ref<boolean> = ref(false);
    const userPhotos: Ref<PhotoType[]> = ref([]);

    async function getPhotos(albumId: number): Promise<void> {
        if (!error.value) {
            const list: boolean = searchPhotoInStore(albumId);
            if (!list) {
                await getPhotoInStore(albumId);
                await getPhotos(albumId);
            }
        }
    }

    async function getPhotoInStore(albumId: number): Promise<void> {
        const responsePhotos: ResponseType = await PhotoService.getPhotos(albumId);
        if (responsePhotos.data && !responsePhotos.error) {
            responsePhotos.data.forEach((photo: PhotoType) => {
                allPhotos.value.push(photo);
            });
        } else {
            error.value = true;
        }
    }

    function searchPhotoInStore(albumId: number): boolean {
        let isSearchPhotos: boolean = false;
        if (allPhotos.value.length > 0) {
            userPhotos.value = [];
            allPhotos.value.forEach((photo: PhotoType) => {
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