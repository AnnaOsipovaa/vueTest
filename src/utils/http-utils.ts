import { ResponseType } from "../types/response.type";

export class HttpUtils {
    static async request(url: string, method: string = 'GET', body: object | null = null): Promise<ResponseType> {
        const result: ResponseType = {
            error: false,
            data: null
        }

        const params: any = {
            method: method
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        try {
            const response: Response = await fetch('https://json.medrocket.ru' + url, params);

            if (!response.ok) {
                result.error = true;
                return result
            }

            result.data = await response.json();
        } catch (error) {
            result.error = true;
        }

        return result;
    }
}