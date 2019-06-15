import axios from 'axios';
import { API_ROOT, HEADERS } from './constants.js';

export const HTTP = axios.create({
  baseURL: API_ROOT,
  headers: HEADERS
});
