import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const addProduct = async (product) => {
  const { data } = await axios.post(`${baseURL}/products`, product);
  return data;
}

export default addProduct;
