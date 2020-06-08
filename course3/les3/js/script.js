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
    const deadline = "2020-06-09";

    function getTimeRemaining(endtime){
        const now = new Date();
        const t = Date.parse(endtime) - Date.parse(now);
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
    const modalCloseBtn = document.querySelector('[data-close]');
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

    modalTimerId = setTimeout(openModal, 2000);

    modalTrigger.forEach(btn=>{btn.addEventListener('click',openModal);});

    modalCloseBtn.addEventListener('click',closeModal);

    modal.addEventListener('click',(e)=>{
        if(e.target ===modal){
            closeModal();
        }
    });

    document.addEventListener('keydown',(e)=>{
        if (e.code ==="Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });
    
    window.addEventListener('scroll',showModalByScroll);
    
    


    
    //Start site
    hideTabContent();
    showTabContent(0);
    
    setClock(".timer", deadline);
});
