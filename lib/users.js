const axios = require('axios')
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function addUser(email) {
  let user = {}
  await axios.post('https://yokan-charger.herokuapp.com/users', {
    email: email,
  }).then((response) => {
    user = response.data.email
  }).catch((error) => {
    if(error.code == '409') {
      user = email
    } else {
      user = null
    }
  })

  return user
}
