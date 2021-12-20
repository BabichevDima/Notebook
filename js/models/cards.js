import { generateID } from '../helpers/utils.js';

class Cards {
  constructor() {
    this.defaultCards = [
      {
        id: generateID(),
        type: 'Visa',
        number: '0000222211113333',
        description: 'No Description'
      },
      {
        id: generateID(),
        type: 'Mastercard',
        number: '1111000055558888',
        description: 'No Description'
      },
      {
        id: generateID(),
        type: 'Visa',
        number: '9999111155550000',
        description: 'No Description'
      },
      {
        id: generateID(),
        type: 'Mastercard',
        number: '6666444488882222',
        description: 'No Description'
      },
      {
        id: generateID(),
        type: 'Mastercard',
        number: '7777111122223333',
        description: 'No Description'
      }
    ];
  }

  getCardsFromLS() {
    return (
      JSON.parse(localStorage.getItem('cards')) ||
      (this.defaultCards && Cards.setCardsToLS(this.defaultCards))
    );
  }

  static setCardsToLS(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }
}

export default Cards;
