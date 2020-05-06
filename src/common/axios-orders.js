import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://burger-run-5.firebaseio.com/',
});

export default axiosOrders;
