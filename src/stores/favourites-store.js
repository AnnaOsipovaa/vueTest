import { ref } from 'vue';
import { defineStore } from 'pinia';
import { PhotoService } from '@/services/photo-services';

export const useFavouritesStore = defineStore('useFavouritesStore', () => {
    const favouritesListKey = 'favouritesList';
    const favouritesPhotos = ref([]);
    const allInfoOfFavouritesPhotos = ref([]);
    let photoReceiptError = false;
    let requestedAlbum = {};

    function addToFavourites(albumId, photoId) {
        addToFavouritesPhotoInLocalStorage(albumId, photoId)
        favouritesPhotos.value.push({
            albumId: albumId,
            photoId: photoId
        });
    }

    function deleteToFavourites(albumId, photoId) {
        let index = searchPhotosInFavorites(albumId, photoId);
        if (index > -1) {
            deleteToFavouritesPhotoInLocalStorage(albumId, photoId)
            favouritesPhotos.value.splice(index, 1);
        }
    }

    function searchPhotosInFavorites(albumId, photoId) {
        let index = -1;
        if (favouritesPhotos.value.length > 0) {
            favouritesPhotos.value.forEach((item, i) => {
                if (albumId === item.albumId && photoId === item.photoId) {
                    index = i;
                }
            })
        }
        return index;
    }

    function addToFavouritesPhotoInLocalStorage(albumId, photoId) {
        let favourites = window.localStorage.getItem(favouritesListKey);
        let favouritesList = [];

        if (favourites) {
            favouritesList = JSON.parse(favourites);
        }

        favouritesList.push({
            albumId: albumId,
            photoId: photoId
        })

        window.localStorage.setItem(favouritesListKey, JSON.stringify(favouritesList));
    }

    function deleteToFavouritesPhotoInLocalStorage(albumId, photoId) {
        let favourites = window.localStorage.getItem(favouritesListKey);
        if (favourites) {
            let favouritesList = JSON.parse(favourites);

            let index = favouritesList.findIndex((photo) => {
                return photo.albumId === albumId && photo.photoId === photoId
            });
            favouritesList.splice(index, 1);

            window.localStorage.setItem(favouritesListKey, JSON.stringify(favouritesList));
        }
    }

    function getFavouritesPhotosTheLocalStorage() {
        let favourites = window.localStorage.getItem(favouritesListKey);
        if (favourites) {
            favouritesPhotos.value = JSON.parse(favourites);
        }
    }



    async function getFavouritesPhotos() {
        allInfoOfFavouritesPhotos.value = [];
        if (favouritesPhotos.value && favouritesPhotos.value.length > 0) {
            for (let i = 0; i < favouritesPhotos.value.length; i++) {
                photoReceiptError = false;
                await getFavouritesPhoto(favouritesPhotos.value[i]);
            }
        }
    }

    async function getFavouritesPhoto(favouritesPhohto) {
        let resultSearchPhotosInRequestedAlbums = searchPhotosInRequestedAlbums(favouritesPhohto);

        if (!photoReceiptError) {
            if (resultSearchPhotosInRequestedAlbums) {
                allInfoOfFavouritesPhotos.value.unshift({
                    albumId: resultSearchPhotosInRequestedAlbums.albumId,
                    id: resultSearchPhotosInRequestedAlbums.id,
                    title: resultSearchPhotosInRequestedAlbums.title,
                    thumbnailUrl: resultSearchPhotosInRequestedAlbums.thumbnailUrl,
                    url: resultSearchPhotosInRequestedAlbums.url,
                    isFavourites: true
                });
            } else {
                let responsePhotos = await PhotoService.getPhotos(favouritesPhohto.albumId);
                if (responsePhotos.data && !responsePhotos.error) {
                    requestedAlbum[favouritesPhohto.albumId] = responsePhotos.data;
                    return getFavouritesPhoto(favouritesPhohto);
                }
            }
        }
    }

    function searchPhotosInRequestedAlbums(favouritesPhohto) {
        let result = null;
        if (requestedAlbum && requestedAlbum[favouritesPhohto.albumId]) {
            let photo = requestedAlbum[favouritesPhohto.albumId].find(item => item.albumId == favouritesPhohto.albumId && item.id == favouritesPhohto.photoId);
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
        getFavouritesPhotos,
        allInfoOfFavouritesPhotos
    }
})