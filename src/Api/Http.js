import axios from 'axios';


export default axios.create({
    baseURL:"http://gowebtutorial.com/api/json/"

})

export const setClientToken = token => {
    axios.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  