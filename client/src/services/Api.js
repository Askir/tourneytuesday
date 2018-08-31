import axios from 'axios';
import store from '@/store';

export default () => axios.create({
  baseURL: 'https://api.askir.me/',
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});
