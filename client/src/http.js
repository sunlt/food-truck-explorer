import axios from 'axios';
import { notification } from 'antd'

const instance = axios.create({
    baseURL: '/api/'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    notification.error({
        description: error.message
    });
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {

    notification.error({
        description: error.message
    });
    return Promise.reject(error);
  });

export default instance;