import Component from '../../views/component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Welcome!</h1>                   
                    <p class="about__info">So, here is an application, where you can manage information about your bank cards.</p>
                    <a class="about__btn-start button" href="#/cards" title="Click here to get started!">Get bank cards</a>
                </div>
            `);
        });
    }
}

export default About;