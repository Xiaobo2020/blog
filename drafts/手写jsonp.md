## JONP

```javascript
function formateData (data) {
  const array = [];
  for (let key in data) {
    array.push(`${key}=${encodeURIComponent(data[key])}`);
  }
  return array.join('&');
}
let id = 0;
function jsonp ({
  url,
  params,
  callback,
}) {
  return new Promise((resolve, reject) => {
    id++;
    const script = document.createElement('script');
    window[`${callback}_${id}`] = function (data) {
      resolve(data);
      document.removeChild(script);
    };
    const urlSymbol = url.indexOf('?') === -1 ? '?' : '&';
    const urlParams = formateData({
      ...params,
      callback: `${callback}_${id}`,
    });
    script.scr = url + urlSymbol + urlParams;
    document.appendChild(script);
  });
}
```