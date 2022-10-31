// const axios = require('axios')

const API_URL = 'http://localhost:2527/order';

const token = '';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
   
  },
};

/* const bodyParameters = {
  key: 'value',

}; */

let form = document.getElementById('formulario');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let sponsor = document.getElementById('sponsor').value;
  let username = document.getElementById('usuario').value;
  let firstname = document.getElementById('nombre').value;
  let lastname = document.getElementById('lastname').value;
  let email = document.getElementById('correo').value;
  let password = document.getElementById('password').value;
  let repass = document.getElementById('password2').value;
  let ima = document.getElementById('ima').files[0];
  

  let formdata = new FormData()
  formdata.append('firstname', firstname)
  formdata.append('lastname', lastname)
  formdata.append('email', email)
  formdata.append('sponsorUsername', sponsor)
  formdata.append('username', username)
  formdata.append('password', password)
  formdata.append('passwordConfirmation', repass)
  formdata.append('idProduct', '1')
  formdata.append('imageProoPayment', ima)

  console.log(ima)


  /* let formdata = new FormData()
  formdata.append('firstname',firstname)
  formdata.append('lastname',lastname) */

  axios.post(API_URL,formdata, config
    )
    
    .then((resp) => {
   
      Swal.fire('Mensaje de confirmación', resp.data, 'success')
      return new Promise((resolve) => {
        resolve(true);
      });
    })
    .catch((resp) => {
      console.log(resp.response.data)
      Swal.fire('Oops', 'Ha ocurrido un error', 'error')
      return new Promise((resolve) => {
        
        resolve(false);
      });
    });
    
    return false
});













