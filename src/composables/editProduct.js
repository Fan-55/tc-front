import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const editProduct = async (product) => {
  const { data } = await axios.put(`${baseURL}/products/${product.id}`, product);
  return data;
}

export default editProduct;
