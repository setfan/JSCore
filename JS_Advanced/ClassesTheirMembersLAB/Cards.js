let cardFactory = (function () {
  const Suits = {
    SPADES: '\u2660',
    HEARTS: '\u2665',
    DIAMONDS: '\u2666',
    CLUBS: '\u2663'
  };
  const Faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  class Card{
    constructor (face, suit){
      this.face = face;
      this.suit = suit;
    }
    set face(item){
      if(!Faces.includes(item)){
        throw new Error('Invalid card face: ' + face);
      }

      this._face = item;
    }

    get face(){
      return this._face;
    }

    set suit(item){
      if (!Object.keys(Suits).map(k => Suits[k]).includes(item)){
        throw new Error("Invalid card suite: " + item);
      }
      this._suit = item;
    }

    get suit(){
      return this._suit;
    }

    toString(){
      return `${this._face}${this._suit}`
    }
  }

  return {Suits, Card}
}())

let Card = cardFactory.Card;
let Suits  = cardFactory.Suits;

let c1 = new Card('Q', Suits.DIAMONDS);

console.log(c1.toString());