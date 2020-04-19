## Ajax

```javascript
function formateData (data) {
  const array = [];
  for (let key in data) {
    array.push(`${key}=${encodeURIComponent(data[key])}`)
  }
  return array.join(array.join('&'));
}
function ajax ({
  url,
  type,
  params,
  headers,
  data,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    const dataFormatted = formateData(data);
    const urlParams = formateData(params);
    const urlSymbol = url.indexOf('?') === -1 ? '?' : '&';
    const targetUrl = url + urlSymbol + urlParams;
    const method = type && type.toUpperCase() || 'GET';
    xhr.open(method, targetUrl);
    if (method === 'GET') {
      xhr.send();
    } else {
      xhr.send(dataFormatted);
    }
  });
}
```