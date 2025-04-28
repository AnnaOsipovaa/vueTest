import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { PhotoService } from '../services/photo-services';
import { FavouritesPhotosType } from '../types/favourites-photos.type';
import { PhotoType } from '../types/photo.type';
import { ResponseType } from '../types/response.type';

export const useFavouritesStore = defineStore('useFavouritesStore', () => {
    const favouritesListKey: string = 'favouritesList';
    const favouritesPhotos: Ref<FavouritesPhotosType[]> = ref([]);
    const allInfoOfFavouritesPhotos: Ref<PhotoType[]> = ref([]);
    let photoReceiptError: boolean = false;
    let requestedAlbum: object = {};

    function addToFavourites(albumId: number, photoId: number): void {
        addToFavouritesPhotoInLocalStorage(albumId, photoId)
        favouritesPhotos.value.push({
            albumId: albumId,
            photoId: photoId
        });
    }

    function deleteToFavourites(albumId: number, photoId: number): void {
        const index: number = searchPhotosInFavorites(albumId, photoId);
        if (index > -1) {
            deleteToFavouritesPhotoInLocalStorage(albumId, photoId)
            favouritesPhotos.value.splice(index, 1);
        }
    }

    function searchPhotosInFavorites(albumId: number, photoId: number): number {
        let index: number = -1;
        if (favouritesPhotos.value.length > 0) {
            favouritesPhotos.value.forEach((item: FavouritesPhotosType, i) => {
                if (albumId === item.albumId && photoId === item.photoId) {
                    index = i;
                }
            })
        }
        return index;
    }

    function addToFavouritesPhotoInLocalStorage(albumId: number, photoId: number): void {
        const favourites: string | null = window.localStorage.getItem(favouritesListKey);
        let favouritesList: FavouritesPhotosType[] = [];

        if (favourites) {
            favouritesList = JSON.parse(favourites);
        }

        favouritesList.push({
            albumId: albumId,
            photoId: photoId
        })

        window.localStorage.setItem(favouritesListKey, JSON.stringify(favouritesList));
    }

    function deleteToFavouritesPhotoInLocalStorage(albumId: number, photoId: number): void {
        const favourites: string | null = window.localStorage.getItem(favouritesListKey);
        if (favourites) {
            const favouritesList: FavouritesPhotosType[] = JSON.parse(favourites);

            const index: number = favouritesList.findIndex((photo: FavouritesPhotosType) => photo.albumId === albumId && photo.photoId === photoId);
            favouritesList.splice(index, 1);

            window.localStorage.setItem(favouritesListKey, JSON.stringify(favouritesList));
        }
    }

    function getFavouritesPhotosTheLocalStorage(): void {
        const favourites: string | null = window.localStorage.getItem(favouritesListKey);
        if (favourites) {
            favouritesPhotos.value = JSON.parse(favourites);
        }
    }

    async function getFavouritesPhotos(): Promise<void> {
        allInfoOfFavouritesPhotos.value = [];
        if (favouritesPhotos.value && favouritesPhotos.value.length > 0) {
            for (let i = 0; i < favouritesPhotos.value.length; i++) {
                photoReceiptError = false;
                await getFavouritesPhoto(favouritesPhotos.value[i]);
            }
        }
    }

    async function getFavouritesPhoto(favouritesPhohto: FavouritesPhotosType): Promise<void> {
        const resultSearchPhotosInRequestedAlbums: PhotoType | null = searchPhotosInRequestedAlbums(favouritesPhohto);

        if (!photoReceiptError) {
            if (resultSearchPhotosInRequestedAlbums) {
                allInfoOfFavouritesPhotos.value.unshift({
                    albumId: resultSearchPhotosInRequestedAlbums.albumId,
                    id: resultSearchPhotosInRequestedAlbums.id,
                    title: resultSearchPhotosInRequestedAlbums.title,
                    thumbnailUrl: resultSearchPhotosInRequestedAlbums.thumbnailUrl,
                    url: resultSearchPhotosInRequestedAlbums.url
                });
            } else {
                const responsePhotos: ResponseType = await PhotoService.getPhotos(favouritesPhohto.albumId);
                if (responsePhotos.data && !responsePhotos.error) {
                    requestedAlbum[favouritesPhohto.albumId] = responsePhotos.data;
                    return getFavouritesPhoto(favouritesPhohto);
                }
            }
        }
    }

    function searchPhotosInRequestedAlbums(favouritesPhohto: FavouritesPhotosType): PhotoType | null {
        let result: PhotoType | null = null;
        if (requestedAlbum && requestedAlbum[favouritesPhohto.albumId]) {
            const photo: PhotoType | null = requestedAlbum[favouritesPhohto.albumId].find((item: PhotoType) => item.albumId == favouritesPhohto.albumId && item.id == favouritesPhohto.photoId);
            if (photo) {
                result = photo;
            } else {
                photoReceiptError = true;
            }
        }
        return result;
    }

    return {
        favouritesPhotos,
        addToFavourites,
        searchPhotosInFavorites,
        deleteToFavourites,
        getFavouritesPhotosTheLocalStorage,
        getFavouritesPhotos,
        allInfoOfFavouritesPhotos
    }
})