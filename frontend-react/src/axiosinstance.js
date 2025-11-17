import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_API,  // <== FIXED
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    function(config){
        console.log('Request sent with ', config);
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken){
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    }, 
    function(error){
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    async function(error){
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try{
                const response = await axiosInstance.post('/token/refresh/', {
                    refresh: refreshToken
                });
                console.log('New access token obtained:', response.data.access);
                localStorage.setItem('accessToken', response.data.access);
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                return axiosInstance(originalRequest);
            }
            catch (refreshError){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        } 
        return Promise.reject(error);
    }
);

export default axiosInstance;
