'use strict';

// Function
function addCatalogproductCustomPadding(catalogProductCollection) {
    if (window.innerWidth > 991) {
        for (const catalogProduct of catalogProductCollection) {
            catalogProduct.querySelector(`.catalog-product__footer`).style.paddingTop = `${catalogProduct.offsetHeight}px`;
        }
    }
}

function onProductInfoTabsHeaderClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.product-info-tabs__button`)) {
        const productInfoTabsButtonIndex = Array.from(productInfoTabsButtonCollection).indexOf(target);
        for (const productInfoTabsButton of productInfoTabsButtonCollection) {
            productInfoTabsButton.classList.remove(`product-info-tabs__button_active`);
        }
        for (const productInfoTabsContent of productInfoTabsContentCollection) {
            productInfoTabsContent.classList.remove(`product-info-tabs__content_open`);
        }
        target.classList.add(`product-info-tabs__button_active`);
        productInfoTabsContentCollection[productInfoTabsButtonIndex].classList.add(`product-info-tabs__content_open`);
    }
}

// Variables
const rangeSliderBox = document.querySelector(`.range-slider__box`);
const rangeSliderFromInputElement = document.querySelector(`input[name="range-slider-from-value"]`);
const rangeSliderToInputElement = document.querySelector(`input[name="range-slider-to-value"]`);
const catalogProductCarouselCollection = document.querySelectorAll(`.catalog-product__carousel-box`);
const catalogProductCollection = document.querySelectorAll(`.catalog-product`);
const sectionCarouselCollection = document.querySelectorAll(`.b-section__carousel`);
const productGalleryBox = document.querySelector(`.product-gallery__box`);
const productGalleryThumbsBox = document.querySelector(`.product-gallery__thumbs-box`);
const productInfoTabsHeader = document.querySelector(`.product-info-tabs__header`);
const productInfoTabsButtonCollection = document.querySelectorAll(`.product-info-tabs__button`);
const productInfoTabsContentCollection = document.querySelectorAll(`.product-info-tabs__content`);

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
    if (catalogProductCarouselCollection || catalogProductCarouselCollection.length) {
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
    // Init section carousel
    if (sectionCarouselCollection || sectionCarouselCollection.length) {
        for (const sectionCarousel of sectionCarouselCollection) {
            new Swiper(sectionCarousel, {
                slidesPerView: 4,
                spaceBetween: 20,
                allowTouchMove: false
            });
        }
        addCatalogproductCustomPadding(catalogProductCollection);
    }
    // Add padding to catalog product layout
    else if (catalogProductCollection || catalogProductCollection.length) {
        addCatalogproductCustomPadding(catalogProductCollection);
    }
    // Init product gallery
    if (productGalleryBox) {
        new Swiper(productGalleryBox, {
            navigation: {
                prevEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_prev`),
                nextEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_next`)
            },
            thumbs: {
                swiper: {
                    el: productGalleryThumbsBox,
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });
    }
    // Modal
    $('[data-modal]').on('click', function() {
        $($(this).data('modal')).modal();
        return false;
    });
    // Product tabs
    if (productInfoTabsHeader) {
        productInfoTabsHeader.addEventListener(`click`, onProductInfoTabsHeaderClickHandler);
    }
});