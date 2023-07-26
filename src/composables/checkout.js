import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const checkout = async (cartItems = []) => {
  await axios.post(`${baseURL}/checkout`, { cartItems });
  return;
}

export default checkout;
