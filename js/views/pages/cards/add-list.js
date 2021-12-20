import { generateID } from '../../../helpers/utils.js';

import Component from '../../component.js';

import Cards from '../../../models/cards.js';

class AddAndList extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`     
                <h1 class="page-title">Cards List</h1>
                
                <div class="card-add">
                    <input class="card-add__type" type="text" placeholder="Type of card">
                    <input class="card-add__number" type="number" placeholder="Number of card">
                    <input class="card-add__description" maxlength="1024" type="text" placeholder="Description of card">
                    <button class="card-add__btn-add button" disabled>Add Card</button>
                </div>   
                  
                <div class="cards">
                    <div class="cards__list">
                        ${this.cards
                          .map(card => this.getCardHTML(card))
                          .join('\n ')}
                    </div>
                </div>            
            `);
    });
  }

  afterRender() {
    this.setActions();
  }

  setActions() {
    const addCardNumber = document.getElementsByClassName(
        'card-add__number'
      )[0],
      addCardType = document.getElementsByClassName('card-add__type')[0],
      addCardDescription = document.getElementsByClassName(
        'card-add__description'
      )[0],
      addCardBtn = document.getElementsByClassName('card-add__btn-add')[0],
      cardsContainer = document.getElementsByClassName('cards')[0],
      cardsList = document.getElementsByClassName('cards__list')[0];

    addCardType.addEventListener('keyup', () => {
      addCardType.style.borderColor = 'black';
      addCardBtn.disabled =
        !addCardType.value.trim() || !addCardNumber.value.trim();
    });

    addCardNumber.addEventListener('keyup', () => {
      addCardNumber.style.borderColor = 'black';
      addCardBtn.disabled =
        !addCardNumber.value.trim() || !addCardType.value.trim();
    });

    addCardNumber.addEventListener('blur', () => {
      const regExp = /^(\d){16}$/;
      if (!regExp.test(+addCardNumber.value.trim())) {
        alert('Карта должна иметь 16-ти значный номер!');
        addCardNumber.style.borderColor = 'red';
        addCardNumber.value = '';
        addCardBtn.disabled = true;
      }
    });

    addCardBtn.addEventListener('click', () => {
      if (
        addCardType.value.toLowerCase().trim() === 'visa' ||
        addCardType.value.toLowerCase().trim() === 'mastercard'
      ) {
        this.addCard(
          addCardNumber,
          addCardType,
          cardsList,
          addCardDescription,
          addCardBtn
        );
      } else {
        alert('Только карты Visa и Mastercard могут добавляться в список!');
        addCardType.style.borderColor = 'red';
        addCardType.value = '';
      }
    });

    cardsContainer.addEventListener('click', event => {
      const target = event.target,
        targetClassList = target.classList;

      switch (true) {
        case targetClassList.contains('card__button'):
          this.removeCard(target.parentNode.parentNode);
          break;
      }
    });
  }

  addCard(
    addCardNumber,
    addCardType,
    cardsList,
    addCardDescription,
    addCardBtn
  ) {
    const newCard = {
      id: generateID(),
      type: this.changeWord(addCardType.value.toLowerCase().trim()),
      number: addCardNumber.value.trim(),
      description:
        addCardDescription.value === ''
          ? 'No Description'
          : addCardDescription.value.trim()
    };

    this.cards.push(newCard);
    Cards.setCardsToLS(this.cards);

    this.clearAddCard(
      addCardType,
      addCardNumber,
      addCardBtn,
      addCardDescription
    );
    cardsList.insertAdjacentHTML('beforeEnd', this.getCardHTML(newCard));
  }

  getCardHTML(card) {
    return `
          <div class="card__info" data-id="${card.id}">
            <div class="card ${card.type.toLowerCase() === 'visa'
              ? 'visa'
              : 'mastercard'}">     
                <a class="card__type">${card.type}</a>
                <a class="card__number">${card.number}</a>
                <div class="card__button" title="Remove card!">&#128465</div>
                ${card.type.toLowerCase() === 'visa'
                  ? '<img class="card__img" src="../../../../images/Visa.png" alt="Visa">'
                  : '<img class="card__img" src="../../../../images/MasterCard.png" alt="MasterCard">'}                
            </div>
            <div class="card__description">${card.description}</div> 
          </div>   
        `;
  }

  clearAddCard(addCardType, addCardTitle, addCardBtn, addCardDescription) {
    addCardType.value = '';
    addCardTitle.value = '';
    addCardDescription.value = '';
    addCardBtn.disabled = true;
  }

  removeCard(card) {
    if (confirm('Are you sure?')) {
      this.cards = this.cards.filter(item => item.id !== card.dataset.id);
      Cards.setCardsToLS(this.cards);
      card.remove();
    }
  }

  changeWord(word) {
    return (word = word[0].toUpperCase() + word.substring(1));
  }
}

export default AddAndList;
