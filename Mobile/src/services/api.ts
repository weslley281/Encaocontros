import axios from 'axios';

export const ip = 'http://192.168.0.17:5500';
// export const ip = "http://192.168.1.100:5500";

export const api = axios.create({
  baseURL: ip,
});
