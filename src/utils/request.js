import axios from 'axios'
// import qs from 'qs'
//import { getAuthToken, clearAuthToken } from './auth';

axios.defaults.baseURL = localStorage.getItem('hostAddress') || 'http://127.0.0.1:8088/';
axios.interceptors.request.use(function (config) { // 这里的config包含每次请求的内容
    config.headers['authorization'] = '123'; // getAuthToken();
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // application/json;charset=utf-8
    // config.data = qs.stringify(config.data)
    return config
}, function (err) {
    return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
    if (response.data.errorCode === 'token_invalidate') {
        // clearAuthToken()
    }
    return response.data
});

export default axios
