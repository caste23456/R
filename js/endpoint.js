// const axios = require('axios')

const API_URL = 'http://localhost:2527/order';

const token = '11e05ed76d61223b0f9f2b5c091c3a5d';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
};

const bodyParameters = {
  key: 'value',
};

let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  let sponsor = document.getElementById('sponsor').value;
  let username = document.getElementById('username').value;
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let email = document.getElementById('mail').value;
  let password = document.getElementById('password').value;
  let repass = document.getElementById('repass').value;

  e.preventDefault();
  console.log(firstname);

  /* let formdata = new FormData()
  formdata.append('firstname',firstname)
  formdata.append('lastname',lastname) */

  axios.post(API_URL,{
        firstname,
        lastname,
        email,
        sponsorUsername: sponsor,
        username,
        password,
        passwordConfirmation: repass,
        idProduct: '1',
      },
      config
    )
    .then((resp) => {
      console.log(resp.data);
      return new Promise((resolve) => {
        resolve(true);
      });
    })
    .catch((resp) => {
      console.log(resp.response.data.message);
      return new Promise((resolve) => {
        resolve(false);
      });
    });
});
