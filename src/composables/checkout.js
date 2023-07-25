import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const checkout = async (cartItems = []) => {
  await axios.post(`${baseURL}/checkout`, { cartItems });
  return;
}

export default checkout;
