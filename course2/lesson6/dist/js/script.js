$(document).ready(function(){
    $('.carousel__inner').slick({
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });
    $(function() {
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
          $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });
    });
      
    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click',function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal
    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click',function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });
    $('.button_mini').each(function(i){
        $(this).on('click',function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    //validation jQuery
    function validateForms(form){
        $(form).validate({
            rules:{
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите имя",
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Введите корректный email",
                    email: "Формат email должен быть: name@domain.com"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38 (099) 999-99-99");


    $('form').submit(function(e){
        e.preventDefault();//otmena perezagryzki stanicy
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find('input').val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scrpll and pageUp
    $(window).scroll(function(){
        if($(this).scrollTop()>1600){
            $('.pageup').fadeIn();
        }else{
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});

}); 
