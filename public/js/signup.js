import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios.post('http://127.0.0.1:3000/api/v1/users/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signup successfully!');
      setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
