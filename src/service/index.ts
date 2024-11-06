import Cookies from 'js-cookie';
import { ILogin } from '../components/login/Login';

const API_URL = 'http://ec2-47-129-59-69.ap-southeast-1.compute.amazonaws.com:8000';


export const login = async (params : ILogin) => {
  const data = new URLSearchParams();
  data.append('grant_type', 'password');
  data.append('username', params.userName);
  data.append('password', params.password);
  data.append('scope', '');
  data.append('client_id', 'string');
  data.append('client_secret', 'string');

  try {
    const response = await fetch(
      `${API_URL}/auth/login`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: data,
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const { token } = result;

    // Save the token in cookies
    Cookies.set('token', token, { expires: 7 });

    return result.token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};



// Function to fetch data
export const fetchData = async () => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('You need to log in first!');
    }
  
    const response = await fetch(`${API_URL}/projects/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      mode: 'cors',
    });
  
    // Check if the response is successful
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  };

