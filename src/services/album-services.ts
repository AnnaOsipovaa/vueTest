import { ResponseType } from '../types/response.type';
import { HttpUtils } from '../utils/http-utils';

export class AlbumService {
    static async getAlbums(userId: number): Promise<ResponseType> {
        return await HttpUtils.request('/albums?userId=' + userId);
    }
}