import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const addProduct = async (product) => {
  const { data } = await axios.post(`${baseURL}/products`, product);
  return data;
}

export default addProduct;
