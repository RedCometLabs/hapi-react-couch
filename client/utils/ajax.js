/*
  These functions are used constantly for AJAX requests, thus they have been moved here
  to reduce the amount of boilerplate
*/
import Progress from 'react-progress-2';
const baseUrl = '/';

export function post(url, body) {
  Progress.show();
  return request('post', url, body)
   .then(function(response) {
     return response.json();
   });
}

export function put(url, body) {
  Progress.show();
  return request('put', url, body)
   .then(function(response) {
     return response.json();
   });
}

export function get(url) {
  Progress.show();
  return request('get', url, null).then((response) => {
    return response.json();
  });
}

function request (method, url, body) {
  let options = {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if(body) {
    options.body = JSON.stringify(body);
  }
  return fetch(baseUrl + url, options).then(checkStatus);
}

function checkStatus(response) {
  Progress.hide();
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
