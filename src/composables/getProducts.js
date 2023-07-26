import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const getProducts = async (options = {}) => {
  const { productName, minPrice, maxPrice, sellerId } = options;
  let queryString = productName ? `q=${productName}` : '';
  queryString += minPrice ? `&minPrice=${minPrice}` : '';
  queryString += maxPrice ? `&maxPrice=${maxPrice}` : '';
  queryString += sellerId ? `&sellerId=${sellerId}` : '';
  const { data: { _embedded } } = await axios.get(`${baseURL}/products?${queryString}`);
  return _embedded;
}

export default getProducts;
