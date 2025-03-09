import { HttpUtils } from "@/utils/http-utils";

export class PhotoService {
    static async getPhotos(albumId) {
        return await HttpUtils.request('/photos?albumId=' + albumId);
    }
}