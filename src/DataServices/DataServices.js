// region Platform Libraries
import axios from 'axios';
import Cookies from 'js-cookie';
// endregion

const isDev = Cookies.get('isDev');
const baseURL = isDev ? 'http://localhost:5000/v1' : 'https://tcback.onrender.com/v1'

let dataServices;

class DataServices {
  async addProduct(product) {
    try {
      const { data } = await axios.post(`${baseURL}/products`, product);
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }

  async checkout(cartItems = []) {
    try {
      const { data } = await axios.post(`${baseURL}/checkout`, { cartItems });
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }

  async editProduct(product) {
    try {
      const { data } = await axios.put(`${baseURL}/products/${product.id}`, product);
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }

  async getProductById(productId) {
    try {
      const { data } = await axios.get(`${baseURL}/products/${productId}`);
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }

  async getProducts(options = {}) {
    try {
      const { productName, minPrice, maxPrice, sellerId } = options;
      let queryString = productName ? `q=${productName}` : '';
      queryString += minPrice ? `&minPrice=${minPrice}` : '';
      queryString += maxPrice ? `&maxPrice=${maxPrice}` : '';
      queryString += sellerId ? `&sellerId=${sellerId}` : '';
      const { data: { _embedded } } = await axios.get(`${baseURL}/products?${queryString}`);
      return _embedded;
    } catch (e) {
      throw e.response.data;
    }
  }

  async login(username, password, role) {
    try {
      const { data } = await axios.post(`${baseURL}/login`, { username, password, role });
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }
}

const getDataServices = () => {
  if (!dataServices) {
    dataServices = new DataServices();
  }
  return dataServices
}

export default getDataServices;
