export class HttpUtils {
    static async request(url, method = 'GET', body = null) {
        const result = {
            error: false,
            data: null
        }

        const params = {
            method: method
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        try {
            const response = await fetch('https://json.medrocket.ru' + url, params);

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