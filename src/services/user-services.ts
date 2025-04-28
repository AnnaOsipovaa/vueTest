import { ResponseType } from '../types/response.type'
import { HttpUtils } from '../utils/http-utils'

export class UserService {
    static async getUsers(): Promise<ResponseType> {
        return await HttpUtils.request('/users');
    }
}