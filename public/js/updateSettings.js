/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/users/${type === 'password' ? 'updateMyPassword' : 'updateMe'}`;

    const res = await axios.patch(url, data);

    if (res.data.status === 'success') {
      showAlert(res.data.status, `${type.toUpperCase()} successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
