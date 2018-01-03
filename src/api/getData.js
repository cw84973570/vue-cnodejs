// 封装axios
import axios from 'axios'
export function getData (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params
    })
    .then(response => {
      resolve(response)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
