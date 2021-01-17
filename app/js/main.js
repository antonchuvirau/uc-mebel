'use strict';

// Variables
const rangeSliderBox = document.querySelector(`.range-slider__box`);
const rangeSliderFromInputElement = document.querySelector(`input[name="range-slider-from-value"]`);
const rangeSliderToInputElement = document.querySelector(`input[name="range-slider-to-value"]`);
const catalogProductCarouselCollection = document.querySelectorAll(`.catalog-product__carousel-box`);
const catalogProductCollection = document.querySelectorAll(`.catalog-product`);

// Events
document.addEventListener(`DOMContentLoaded`, () => {
    // Init noUi range slider
    if (rangeSliderBox) {
        noUiSlider.create(rangeSliderBox, {
            start: [30, 800],
            connect: true,
            range: {
                'min': 0,
                'max': 1000
            }
        });
        rangeSliderBox.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                const handleLastValue = +values[1];
                rangeSliderToInputElement.value = handleLastValue.toFixed(0);
            }
            else {
                const handleFirstValue = +values[0];
                rangeSliderFromInputElement.value = handleFirstValue.toFixed(0);
            }
        });
        rangeSliderFromInputElement.addEventListener(`change`, function() {
            rangeSliderBox.noUiSlider.set([this.value, null]);
        });
        rangeSliderToInputElement.addEventListener(`change`, function() {
            rangeSliderBox.noUiSlider.set([null, this.value]);
        });
    }
    // Init catalog product carousel
    if (catalogProductCarouselCollection.length) {
        for (const catalogProductCarousel of catalogProductCarouselCollection) {
            new Swiper(catalogProductCarousel, {
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: catalogProductCarousel.closest(`.catalog-product`).querySelector(`.swiper-pagination`)
                },
                navigation: {
                    prevEl: catalogProductCarousel.closest(`.catalog-product`).querySelector(`.catalog-product__carousel-button-prev`),
                    nextEl: catalogProductCarousel.closest(`.catalog-product`).querySelector(`.catalog-product__carousel-button-next`)
                }
            });
        }
    }
    // Add padding to catalog product layout
    if (catalogProductCollection.length) {
        for (const catalogProduct of catalogProductCollection) {
            catalogProduct.querySelector(`.catalog-product__footer`).style.paddingTop = `${catalogProduct.offsetHeight}px`;
        }
    }
    // Modal
    $('[data-modal]').on('click', function() {
        $($(this).data('modal')).modal();
        return false;
    });
});