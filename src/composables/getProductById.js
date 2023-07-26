import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const getProductById = async (productId) => {
  const { data } = await axios.get(`${baseURL}/products/${productId}`);
  return data;
}

export default getProductById;
