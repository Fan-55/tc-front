import axios from 'axios';

const baseURL = 'https://tcback.onrender.com/v1'

const login = async (username, password, role) => {
  const { data } = await axios.post(`${baseURL}/login`, { username, password, role });
  return data;
}

export default login;
