
$(document).ready(function () {

    new WOW({
            animateClass:'animate__animated'
        }
    ).init();

    const menuBtnOpen = $('#open-btn');
    const menuBtnClose = $('#close-btn');
    const menu = $('#menu');
    const slide = $('.image-slider__slide');
    const moreProjects = $('#more-projects');
    const inputPhone = $('.input-phone');
    const consultationButton = $('#consultation-button');
    let loader = $('.loader-wrap');

    let popupSuccess = $('.popup__success');
    let popupForm = $('#record__popup-form ');

    let popupName = $('#record__input-name');
    let popupPhone = $('#record__input-phone');

    jQuery(function ($) {
        inputPhone.mask("+7(999) 999-99 99");
    });


    menuBtnOpen.click(function () {
        menu.css('transform', 'translateX(0)');
    })
    menuBtnClose.click(function () {
        menu.css('transform', 'translateX(-100%)');
    })


    let originalButtonText = 'Показать еще 3 проекта';
    moreProjects.click(function () {
        let buttonText = $(this).text();

        if ($('.project__more').hasClass('project__active')) {
            $('.project__more').removeClass('project__active');
            $(this).text(originalButtonText);
        } else {
            $('.project__more').addClass('project__active');
            $(this).text('Скрыть проекты');
        }
    });


    $('.project__gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
    });


    $('#popup__close').click(function () {
        $('.record__popup-wrapper').css('display', 'none');
    })


    $("#menu-project").click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top
        }, 2000);
    });
    $("#menu-technology").click(function () {
        $('html, body').animate({
            scrollTop: $("#technologies").offset().top
        }, 2000);
    });
    $("#menu-conditions").click(function () {
        $('html, body').animate({
            scrollTop: $("#conditions").offset().top
        }, 2000);
    });
    $(".contact-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#consultation").offset().top
        }, 2000);
    });
    $("#more-btn").click(function () {
        $('html, body').animate({
            scrollTop: $("#consultation").offset().top
        }, 2000);
    });
    $("#hero__arrow").click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top
        }, 2000);
    });
    $(".project__button-first").click(function () {
        $('html, body').animate({
            scrollTop: $("#consultation").offset().top
        }, 2000);
    });

    const swiper = new Swiper('.image-slider', {
        effect: 'cards',
        initialSlide: 0,
        speed: 800,
        grabCursor: true,
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        cardsEffect: {
            slideShadows: false,
            rotate: false,
            perSlideOffset: 15,
            perSlideRotate: 2,
        },
        loop: false,

    });


    const goNext = () => {
        const nextIndex = (swiper.activeIndex + 1) % swiper.slides.length ;
        swiper.slideTo(nextIndex, 800);
        updatePagination();
    }
    const goPrev = () => {
        const prevIndex = (swiper.activeIndex - 1 + swiper.slides.length) % swiper.slides.length ;
        swiper.slideTo(prevIndex, 800);
        updatePagination();
    }

    const updatePagination = () => {
        const bullets = document.querySelectorAll('.swiper-pagination-bullets'); ;
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle(index === swiper.activeIndex);
        });
    };

    document.addEventListener('keydown', function (e){
        if (e.key === 'ArrowRight') swiper.slideNext();
        if (e.key === 'ArrowLeft') swiper.slidePrev();
    });

    $('.swiper-button-next').click(function () {
       goNext()
    })

    $('.swiper-button-prev').click(function () {
       goPrev()
    })

    // document.querySelector('.swiper-button-next').addEventListener('click', function (){
    //     swiper.slideNext();
    // });
    // document.querySelector('.swiper-button-prev').addEventListener('click', function (){
    //     swiper.slidePrev();
    // });






    $('.download-btn').on('click', function (event) {
        let link = $('<a>', {
            href: 'download.txt',
            download: 'договор.pdf'
        }).hide();

        $('body').append(link);
        link[0].click();
        $(link).remove();
    });

    consultationButton.click(function () {
        let hasError = false;
        let name = $('#consultation__input-name');
        let phone = $('#consultation__input-phone');
        let politic = $('#politic');
        let form = $('#consultation__form');


        $('.input-error').css('opacity', '0');
        name.css('border', '1px solid white');
        phone.css('border', '1px solid white');

        if (!name.val()) {
            name.css('border', '1px solid red');
            name.next().css('opacity', '1');
            hasError = true;
        }
        if (!phone.val()) {
            phone.css('border', '1px solid red');
            phone.next().css('opacity', '1');
            hasError = true;
        }


        if (name.val() === '' && phone.val() === '') {
            loader.hide();
        }

        if (hasError) {
            loader.hide();
        } else {
            loader.css('display', 'flex');

            $.ajax({
                method: 'POST',
                url: "https://testologia.ru/checkout",
                data: {
                    name: name.val(),
                    phone: phone.val()
                }
            })

                .done(function (msg) {
                    loader.hide();
                    if (msg.success === 1 || msg.success === 0 ) {
                        form.css('display', 'none');
                        $('.consultation__title').css('display', 'none');
                        $('.form-success').css('display', 'flex');
                       setTimeout(function () {
                           $('.form-success').css('display', 'none');
                           form.css('display', 'flex');
                           $('.consultation__title').css('display', 'flex');
                           name.val('');
                           phone.val('');
                       }, 5000)
                    } else {
                        form.css('display', 'none');
                        $('.consultation__title').css('display', 'none');
                        $('.form-error').css('display', 'flex').html('');
                    }
                    console.log(msg);
                })
        }

    })

    $('#record-popup-open').click(function () {
        $('.record__popup-wrapper').css('display', 'flex');

        popupForm.css('display', 'flex');
        $('.popup__name').css('display', 'flex');
        popupSuccess.css('display', 'none');

        popupName.val('');
        popupPhone.val('');

    })

    $('#popup-btn').click(function () {
        let hasError = false;

        popupSuccess.css('display', 'none');

        $('.input-error').css('opacity', '0');

        popupName.css('border', '1px solid white');
        popupPhone.css('border', '1px solid white');

        if (!popupName.val()) {
            popupName.css('border', '1px solid red');
            popupName.next().css('opacity', '1');
            hasError = true;
        }
        if (!popupPhone.val()) {
            popupPhone.css('border', '1px solid red');
            popupPhone.next().css('opacity', '1');
            hasError = true;
        }


        if (popupName.val() === '' && popupPhone.val() === '') {
            loader.hide();
        }

        if (hasError) {
            loader.hide();
        } else {
            loader.css('display', 'flex');

            $.ajax({
                method: 'POST',
                url: "https://testologia.ru/checkout",
                data: {
                    name: popupName.val(),
                    phone: popupPhone.val()
                }
            })

                .done(function (msg) {
                    loader.hide();
                    if (msg.success === 1) {
                        popupForm.css('display', 'none');
                        $('.popup__name').css('display', 'none');
                        popupSuccess.css('display', 'flex');
                        popupSuccess.css('margin-top', '40%');
                    } else {
                        alert(msg.error);
                    }
                    console.log(msg);
                })
        }

    })

});
