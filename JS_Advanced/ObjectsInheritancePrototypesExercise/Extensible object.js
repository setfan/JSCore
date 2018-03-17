function extend () {
  let resultObj = Object.create({});

  resultObj.extend = function (template) {
    for (let prop in template) {
      if (typeof template[prop] === 'function') {
       Object.getPrototypeOf(resultObj)[prop] = template[prop];
      } else {
        resultObj[prop] = template[prop];
      }
    }
  };

  return resultObj;
}

let template = {
  extensionMethod: function () {
    console.log("From extension method")
  }
};

let testObject = extend();
console.log(testObject.extend(template));