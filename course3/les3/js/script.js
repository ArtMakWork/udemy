'use strict';
window.addEventListener('DOMContentLoaded',()=>{
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show','fade');

        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);  
                }
            });
        }
    });
    
    
    //Timer
    const deadline = "2020-07-24";

    function getTimeRemaining(endtime){
        const now = new Date();
        const x = 1000*60*60*3;
        
        let t = Date.parse(endtime);
        t = t - x;
        t = t - Date.parse(now);
        let days = Math.floor(t/(1000*60*60*24));
        let hours = Math.floor((t/(1000*60*60))%24);
        let minutes = Math.floor((t/1000/60)%60);
        let seconds = Math.floor((t/1000)%60);
        
        return{
            'total':t,
            'days':days,
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num <10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock (selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total<=0){
                clearInterval(timeInterval);
            }
        }
    }

    //modal
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    let modalTimerId;
    
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        }
    }

    modalTimerId = setTimeout(openModal, 50000);

    modalTrigger.forEach(btn=>{btn.addEventListener('click',openModal);});
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown',(e)=>{
        if (e.code ==="Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });
    
    window.addEventListener('scroll',showModalByScroll);
    
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
    
    const getResourses = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
    
    getResourses('http://localhost:3000/menu').then(data => {
        data.forEach( ({title, descr, price, img, altimg}) => {
            new MenuCard (title, descr, price, img, altimg, '.menu .container').render();
        });
    });
    
    //Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spiner.svg",
        success: "good",
        failure: "error"
    };

    forms.forEach(item =>{
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        
        return await res.json();
    };
    
    function  bindPostData (form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
   
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;`;
            
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },4000);
    }

    //slider
    const slider = document.querySelector('.offer__slider');
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const width = window.getComputedStyle(slidesWrapper).width;
    const slidesField = document.querySelector('.offer__slider-inner');
    
    let slideIndex = 1;
    let offset = 0;
    const dots = [];

    function addZeroToCounter(ind,field){
        if (ind < 10) {
            field.textContent =  `0${ind}`;
        } else {
            field.textContent =  ind;
        }
    }

    function slidersIndicators (){
        addZeroToCounter(slideIndex, current);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex-1].style.opacity = 1;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i==0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }
    
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        
        slidersIndicators();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width)* (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        
        slidersIndicators();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            
            slidersIndicators();
        });
    });

    //calculating
    const result = document.querySelector('.calculating__result span');
    
    let sex;
    let height;
    let weight;
    let age;
    let ratio;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    function calcTotal (){
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        } 
        if (sex === 'female') {
            result.textContent =  Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent =  Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    
    function getStaticInformation (selector, activeClass){
        
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener( 'input', () => {
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
                case 'height':  height  = +input.value; break;
                case 'weight':  weight  = +input.value; break;
                case 'age':     age     = +input.value; break;
            }
        calcTotal();
        });
    }
    
    
    
    //Start site


    hideTabContent();
    showTabContent(0);
    
    setClock(".timer", deadline);

    addZeroToCounter(slideIndex, current);
    addZeroToCounter(slides.length, total);
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');
    calcTotal();
    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});
