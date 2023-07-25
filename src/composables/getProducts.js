import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const getProducts = async (options = {}) => {
  const { productName, minPrice, maxPrice } = options;
  let queryString = productName ? `q=${productName}` : '';
  queryString += minPrice ? `&minPrice=${minPrice}` : '';
  queryString += maxPrice ? `&maxPrice=${maxPrice}` : '';
  const { data: { _embedded } } = await axios.get(`${baseURL}/products?${queryString}`);
  return _embedded;
}

export default getProducts;
