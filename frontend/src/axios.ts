import axios, {AxiosRequestConfig} from 'axios';

const instanse = axios.create({
    baseURL: 'http://localhost:5000'
})

type AxiosRequestConfigWithHeaders = {
    AxiosRequestConfig: any,
    headers: any;
}

type UpdatedAxiosRequestConfig = AxiosRequestConfig | AxiosRequestConfigWithHeaders;

instanse.interceptors.request.use((config: UpdatedAxiosRequestConfig): UpdatedAxiosRequestConfig => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});

export default instanse;