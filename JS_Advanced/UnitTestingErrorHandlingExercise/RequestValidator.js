function validateRequest(req) {
  const methodType = ['GET', 'POST', 'DELETE', 'CONNECT'];
  const versionType = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
  const errorStr = 'Invalid request header: Invalid ';

  let elem = 5;

  if(methodType.indexOf(req.method) < 0 || req.method === undefined){
    throw new Error(errorStr + 'Method');
  }

  if (!isValidUri(req.uri) || req.uri === undefined){
    throw new Error(errorStr + 'URI');
  }

  if(versionType.indexOf(req.version) < 0 || req.version === undefined){
    throw new Error(errorStr + 'Version');
  }

  if(!isValidMessage(req.message) || req.message === undefined){
    throw new Error(errorStr + 'Message');
  }

  function isValidMessage (message) {
    let pattern = /^([^<>&'"\\]+)*$/;

    return pattern.test(message)
  }

  function isValidUri (uri) {
    let pattern1 = /^(\.*\w+\.*)+$/;
    let pattern2 = /\*+/;

    let result = false;

    pattern1.test(uri) ? result = true: pattern2.test(uri) ? result = true : result = false;

    return result;
  }

return req;
}

console.log(validateRequest({
    method: 'GET',
    uri: 'kkk jjjj',
    version: 'HTTP/0.8',
    message: ''
  }
));