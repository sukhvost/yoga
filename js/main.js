window.addEventListener('DOMContentLoaded', function() {

    'use strict';


    // tabs

    let info = document.querySelector('.info-header');
    let tab = document.querySelectorAll('.info-header-tab');
    let tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    // timer

    let deadline = '2020-04-20';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minuts = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minuts': minuts,
            'seconds': seconds,
        };
    }

    function setClock(id, endtime) {
        let timer = document.querySelector(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let sec = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minuts;
            sec.textContent = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }



    }
    setClock('#timer', deadline);

    // modal

    let btnStartModal = document.querySelector('.more');
    let btnCloseModdal = document.querySelector('.popup-close');
    let overlay = document.querySelector('.overlay');



    btnStartModal.addEventListener('click', function() {
        showModal(overlay);
    });

    btnCloseModdal.addEventListener('click', function() {
        hideModal(overlay);
    });


    function showModal(overlay) {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }



    function hideModal(overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // slider

    let slideIndex = 1;
    let sliderWrap = document.querySelector('.slider .wrap');
    let slides = document.querySelectorAll('.slider-item');
    let dotsWrap = document.querySelector('.slider-dots');
    let dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => {
            item.style.display = 'none';

        });

        dots.forEach((item) => {
            item.classList.remove('dot-active');
        });
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentsSlide(n) {
        showSlides(slideIndex = n);
    }

    setInterval(function() {
        plusSlides(1);
    }, 5000);

    sliderWrap.addEventListener('click', function(event) {
        let target = event.target;

        if (target.classList.contains('next') || target.classList.contains('arrow-right')) {
            plusSlides(1);
        } else if (target.classList.contains('prev') || target.classList.contains('arrow-left')) {
            plusSlides(-1);
        }
    });

    dotsWrap.addEventListener('click', function(event) {
        let target = event.target;
        for (let i = 0; i < dots.length + 1; i++) {
            if (target.classList.contains('dot') && target == dots[i - 1]) {
                currentsSlide(i);
            }
        }
    });

});