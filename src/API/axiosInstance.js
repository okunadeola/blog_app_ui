import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies()
 



// https://node-mysql-blog-api.herokuapp.com/api
 
const API = axios.create({ baseURL: `https://https://node-mysql-blog-api.herokuapp.com/api` });
API.interceptors.request.use((req) => {
  req.headers.Authorization = 'Bearer ' + cookies.get('access-token');
  req.headers['Content-type'] = 'application/json';
  req.headers["Accept"] = 'application/json';
  return req;
});
export default API;



