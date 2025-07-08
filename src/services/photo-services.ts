import { ResponseType } from '../types/response.type';
import { HttpUtils } from '../utils/http-utils';

export class PhotoService {
    static async getPhotos(albumId: number): Promise<ResponseType> {
        return await HttpUtils.request('/photos?albumId=' + albumId);
    }
}