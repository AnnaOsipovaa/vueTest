import { HttpUtils } from "@/utils/http-utils";

export class UserService {
    static async getUsers(){
        return await HttpUtils.request('/users');
    }
}