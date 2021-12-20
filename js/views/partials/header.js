import Component from '../../views/component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header">                    
                     <a class="header__link ${!resource ? 'active' : ''}" href="/#/">
                        Home
                     </a>
                     <a class="header__link ${resource === 'cards' ? 'active' : ''}" href="/#/cards">
                        Cards List
                     </a>                                            
                </header>
            `);
        });
    }
}

export default Header;