/*
  These functions are used constantly for AJAX requests, thus they have been moved here
  to reduce the amount of boilerplate
*/

import config from '../../config';
const baseUrl = 'http://' + config.app.host + ':' + config.app.port + '/';

export function Post(url, body) {
  return request('post', url, body)
   .then(function(response) {
     return response.json();
   });
}

export function Get(url) {
  return request('get', url, null);
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
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
