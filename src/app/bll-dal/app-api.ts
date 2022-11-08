import axios from 'axios';
import { DEV_SERVER, LOCAL_HOST } from './env';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || DEV_SERVER || LOCAL_HOST,
  withCredentials: true,
});
