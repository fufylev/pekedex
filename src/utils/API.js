import axios from 'axios'

export function register (email, password, name, mobile) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8888/register', {
      email, password, name, mobile
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
