import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
    console.log('[Response]', response.config.url, response);
    return response;
};
