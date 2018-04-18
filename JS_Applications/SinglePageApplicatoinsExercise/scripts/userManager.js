const baseUrl = 'https://baas.kinvey.com/';
const appKey = '';

const basicAuthHeader = {
  'Authorization': 'Basic ' + btoa(appKey + ':'),
  'Content-type': 'application/json'
};

function request (method, target, header, data) {
  return $.ajax({
    method: method,
    url: baseUrl + target,
    headers: header,
    data: JSON.stringify(data)
  });
}

function loginUser () {
  let username = $('#formLogin input[name=username]').val();
  let password = $('#formLogin input[name=passwd]').val();

  request('POST', `user/${appKey}/login`, basicAuthHeader, {username, password})
    .then(function (res) {
      signInUser(res, 'Login successful.');
    })
    .catch(handleAjaxError);
}

function logoutUser () {
  sessionStorage.clear();
  showView('viewHome')
  showInfo('Logout successful.');
}

function registerUser () {
  let username = $('#formRegister input[name=username]').val();
  let password = $('#formRegister input[name=passwd]').val();

  request('POST', 'user/' + appKey + '/', basicAuthHeader, {username, password})
    .then(function (res) {
      signInUser(res, 'Registration successful.');
    })
    .catch(handleAjaxError);

}

function signInUser (res, message) {
  saveSession(res);
  showView('viewHome')
  showInfo(message);
}

function saveSession (userInfo) {
  sessionStorage.setItem('username', userInfo.username);
  sessionStorage.setItem('userId', userInfo._id);
  sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
  kinveyAuthHeader = {
    'Authorization': 'Kinvey ' + userInfo._kmd.authtoken,
    'Content-type': 'application/json'
  };
}