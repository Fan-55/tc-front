import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const editProduct = async (product) => {
  const { data } = await axios.put(`${baseURL}/products/${product.id}`, product);
  return data;
}

export default editProduct;
