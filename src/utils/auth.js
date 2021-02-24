export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
    .then((res) => {
      try {
        if (res.status === 200){
          return res.json();
        }
      } catch(err){
        return (err)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}; 

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
    .then((res => res.json()))
    .then((data) => {
      if (data.token){
        console.log(data);
        return data;
      } else {
        return;
      }
    })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
} 