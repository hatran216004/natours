/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios.post('/api/v1/users/login', {
      email,
      password,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Login successfully!');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get('/api/v1/users/logout');

    if (res.data.status === 'success') {
      showAlert('success', 'Logout successfully!');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
