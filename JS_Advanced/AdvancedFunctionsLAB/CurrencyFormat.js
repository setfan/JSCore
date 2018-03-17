function solve () {

  function currencyFormatter (separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) {
      return symbol + ' ' + result;
    } else {
      return result + ' ' + symbol;
    }
  }

  function getDolladFormater (formater) {
    function dollarFormater (value) {
      return formater(',', '$', true, value);
    }

    return dollarFormater;
  }

  let formater = getDolladFormater(currencyFormatter);

}

solve();