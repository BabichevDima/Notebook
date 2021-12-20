import {parseRequestURL} from '../helpers/utils.js';

import Cards from '../models/cards.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
        this.cards = new Cards().getCardsFromLS();
    }

    afterRender() {}
}

export default Component;