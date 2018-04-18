let remote = (()=>{
  const BASE_URL = 'https://baas.kinvey.com/';
  const APP_KEY = '';
  const APP_SECRET = '';

  function authModule (auth) {
    if(auth === 'basic'){
      return 'Basic '+ btoa(APP_KEY + ':' + APP_SECRET);
    } else {
      return 'Kinvey ' + (sessionStorage.getItem('authToken'));
    }
  }
  function requestModel (method, module, endpoint, auth, data) {
    return {
      method,
      url: `${BASE_URL}${module}/${APP_KEY}/${endpoint}`,
      headers: {
        'Authorization': authModule(auth),
        'Content-type': 'application/json'
      },
      data: JSON.stringify(data),
    }
  }

  function get (module, endpoint, auth) {
    return $.ajax(requestModel ('GET', module, endpoint, auth));
  }

  function post (module, endpoint, auth, data) {
    return $.ajax(requestModel ('POST', module, endpoint, auth, data));
  }

  function update (module, endpoint, auth, data) {
    return $.ajax(requestModel ('PUT', module, endpoint, auth, data));
  }

  function remove (module, endpoint, auth) {
    return $.ajax(requestModel ('DELETE', module, endpoint, auth));
  }


  return {
    get,
    post,
    update,
    remove
  }
})();