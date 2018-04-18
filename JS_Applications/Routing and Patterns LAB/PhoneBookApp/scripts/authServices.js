let auth = (() => {
  function register (username, password) {
    return remote.post('user', '', 'basic', {username, password})

  }

  function login (username, password) {
    return remote.post('user', 'login', 'basic', {username, password})

  }

  function logout () {
    return remote.post('user', '_logout', 'kinvey',)
  }

  function isAuth () {
    return sessionStorage.getItem('authToken') !== null;
  }

  function saveSession (userdata) {
    sessionStorage.setItem('authToken', userdata._kmd.authtoken);
    sessionStorage.setItem('userName', userdata.username);
    sessionStorage.setItem('id', userdata._id);
  }

  return{
    isAuth,
    login,
    logout,
    register,
    saveSession
  }

})();