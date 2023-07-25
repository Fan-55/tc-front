import axios from 'axios';

const baseURL = 'http://localhost:5000/v1'

const login = async (username, password, role) => {
  const { data } = await axios.post(`${baseURL}/login`, { username, password, role });
  return data;
}

export default login;
