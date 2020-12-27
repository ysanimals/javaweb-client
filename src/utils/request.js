import Vue from 'vue'

function requestPost (url, method, data, token) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'https://tomb.xuebaeasy.com/',
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': token
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      // console.log(res)
      // if (res.headers.map.token_status[0] === 'no') {
      //   localStorage.removeItem('access-token')
      //   alert('登录已过期，请重新登录')
      //   window.location.href = '/'
      // } else {
        resolve(res.data)
      // }
    }).catch((res) => {
      reject(res)
    })
  })
}

function requestGet (url, method, data, token) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, data, {
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': token
      },
      responseType: 'blob',
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}

function get (obj) {
  return requestGet(obj.url, 'GET', obj.data, localStorage.getItem('access-token'))
}

function post (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data), localStorage.getItem('access-token'))
}

function postNoToken (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data), null)
}

// 如果传TableReqDTO,数据不要转为JSON.STRING
function postNoJSON (obj) {
  return requestPost(obj.url, 'POST', obj.data, localStorage.getItem('access-token'))
}

export default {
  get,
  post,
  postNoJSON,
  postNoToken
}
