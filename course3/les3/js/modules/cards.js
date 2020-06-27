import {getResourses} from '../services/services';

function cards(){
    //Class
    
    class MenuCard{
        constructor(title,descr,price,bgImg,imgAlt,parentSelector, ...classes){
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.bgImg = bgImg;
            this.imgAlt = imgAlt;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className=>element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.bgImg} alt="${this.imgAlt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
        
    }
    
    getResourses('http://localhost:3000/menu').then(data => {
        data.forEach( ({title, descr, price, img, altimg}) => {
            new MenuCard (title, descr, price, img, altimg, '.menu .container').render();
        });
    });
}
export default cards;