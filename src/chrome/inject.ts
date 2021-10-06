function newXHR() {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (filterUrl(xhr.responseURL)) {
      window.postMessage({ data: xhr.responseText }, '*')
    }
  }
  return xhr
}

// 过滤出目标url
function filterUrl(url: string) {
  return url.indexOf('baidu.com') !== -1
}

// eslint-disable-next-line prettier/prettier
(<any>window).XMLHttpRequest = newXHR
