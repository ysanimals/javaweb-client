import Vue from 'vue'

function requestPost (url, method, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'https://tomb.xuebaeasy.com/',
      method: method,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': localStorage.getItem('access-token')
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      if (res.headers.map.token_status[0] === 'no') {
        localStorage.removeItem('access-token')
        alert('登录已过期，请重新登录')
        window.location.href = '/'
      } else {
        resolve(res.data)
      }
    }).catch((res) => {
      reject(res)
    })
  })
}

// 'Content-Type': 'multipart/form-data;multipart/form-data;boundary=12341411'
function postFile (url, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      // baseURL: 'https://tomb.xuebaeasy.com/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;multipart/form-data;boundary=12341411',
        'Access-Token': localStorage.getItem('access-token')
      },
      timeout: 10000
    }).then((res) => {
      // 这边可以验证请求的token是否有效
      if (res.headers.map.token_status[0] === 'no') {
        localStorage.removeItem('access-token')
        alert('登录已过期，请重新登录')
        window.location.href = '/'
      } else {
        resolve(res.data)
      }
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
  return requestGet(obj.url, 'GET', obj.data)
}

function post (obj) {
  return requestPost(obj.url, 'POST', JSON.stringify(obj.data))
}

// 如果传TableReqDTO,数据不要转为JSON.STRING
function postNoJSON (obj) {
  return requestPost(obj.url, 'POST', obj.data)
}

export default {
  get,
  post,
  postNoJSON,
  postFile
}
