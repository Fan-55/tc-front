import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const getProductById = async (productId) => {
  const { data } = await axios.get(`${baseURL}/products/${productId}`);
  return data;
}

export default getProductById;
