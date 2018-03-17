let cardFactory = require('./PlayingCards.js');
//module.exports = cardFactory; - export the function from other .js file

function printDequeOfCards (cards) {
  let result = [];

  for (let obj of cards) {
    let face = obj.substring(0, obj.length-1);
    let suit = obj.substr(obj.length-1, 1);
    try{
      result.push(cardFactory(face, suit));
    }catch (Error){
      console.log('Invalid card: ' + obj);
      return;
    }
  }

  console.log(result.join(' '));
}

printDequeOfCards(['5S', '3D', 'QD', '7C']);