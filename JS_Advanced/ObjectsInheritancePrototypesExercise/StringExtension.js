(function solve () {
  String.prototype.ensureStart = function (str) {
    if (this.substring(0, str.length) !== str) {
      return str + this;
    }
    return this.toString();
  };

  String.prototype.ensureEnd = function (str) {
    if (this.substr(this.length - str.length, str.length) !== str) {
      return this + str;
    }
    return this.toString();
  };

  String.prototype.isEmpty = function () {
    return this.toString() === '';
  };

  String.prototype.truncate = function (n) {
    if (this.length <= n) {
      return this.toString();
    }
    if (n < 4) {
      return '.'.repeat(n);
    }
    if (!this.includes(' ')) {
      return this.slice(0, n - 3) + '...';
    }
    let words = this.split(' ');
    let result = words[0];
    for (let i = 1; i < words.length; i++) {
      if (result.length + words[i].length + 4 > n) {
        return result + '...';
      }
      result += ` ${words[i]}`;
    }
  };

  String.format = function (str, ...params) {
    return str.replace(/{([\d]+)}/g, function (m, g) {
      if (params[Number(g)] != undefined) {
        return params[Number(g)];
      }
      return m;
    });
  };

})();

let str = '';

console.log(str.isEmpty());
