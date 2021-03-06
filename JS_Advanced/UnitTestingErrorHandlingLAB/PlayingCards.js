function cardFactory (face, suit) {

  const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const SUITS = ['S', 'H', 'D', 'C'];
  if(!FACES.includes(face)){
    throw new Error('Invalid card face: ' + face);
  }

  if(!SUITS.includes(suit)){
    throw new Error('Invalid card siut: ' + suit);
  }
  let card =  {
    face: face,
    suit: suit,
    toString: () => {
      let suitToChar ={
        S: '\u2660',
        H: '\u2665',
        D: '\u2666',
        C: '\u2663'
      };
      return card.face + suitToChar[card.suit];
    }

  };

  return card;

}

module.exports = cardFactory;