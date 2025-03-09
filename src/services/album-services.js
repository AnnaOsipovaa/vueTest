import { HttpUtils } from "@/utils/http-utils";

export class AlbumService {
    static async getAlbums(userId) {
        return await HttpUtils.request('/albums?userId=' + userId);
    }
}