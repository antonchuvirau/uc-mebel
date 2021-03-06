'use strict';

// Function
function addCatalogproductCustomPadding(catalogProductCollection) {
    if (window.innerWidth > MAX_CONTAINER_WIDTH) {
        for (const catalogProduct of catalogProductCollection) {
            if (!catalogProduct.classList.contains(`b-section__carousel-product`)) {
                catalogProduct.querySelector(`.catalog-product__footer`).style.paddingTop = `${catalogProduct.offsetHeight}px`;
            }
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

function onCatalogSidebarBoxClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.catalog-sidebar__button`)) {
        if (target.classList.contains(`catalog-sidebar__button_active`)) {
            target.classList.remove(`catalog-sidebar__button_active`);
            target.nextElementSibling.classList.remove(`catalog-sidebar__item_open`);
        }
        else {
            for (const catalogSidebarButton of catalogSidebarButtonCollection) {
                catalogSidebarButton.classList.remove(`catalog-sidebar__button_active`);
                catalogSidebarButton.nextElementSibling.classList.remove(`catalog-sidebar__item_open`);
            }
            target.classList.add(`catalog-sidebar__button_active`);
            target.nextElementSibling.classList.add(`catalog-sidebar__item_open`);
        }
    }
    if (target.matches(`.catalog-navigation__item-button`)) {
        target.classList.toggle(`catalog-navigation__item-button_active`);
        target.parentElement.querySelector(`.catalog-navigation__link`).classList.toggle(`catalog-navigation__link_active`);
        target.parentElement.querySelector(`.b-dropdown`).classList.toggle(`b-dropdown_open`);
    }
}

function onfilterFormBoxClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.filter-form__section-title_js`)) {
        target.classList.toggle(`filter-form__section-title_active`);
        target.nextElementSibling.classList.toggle(`filter-form__section-box_open`);
    }
    if (target.matches(`.show-more`)) {
        if (target.classList.contains(`show-more_active`)) {
            target.textContent = `Доступно ещё: `;
            target.classList.remove(`show-more_active`);
            target.parentElement.classList.remove(`filter-form__section-box_full`);
            return;
        }
        target.textContent = `Скрыть`;
        target.classList.add(`show-more_active`);
        target.parentElement.classList.add(`filter-form__section-box_full`);
    }
}

function onProductInfoTabsContentBoxClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.product-info-tabs__box-button`) && !target.classList.contains(`product-info-tabs__box-button_active`)) {
        const productInfoTabsBoxButtonIndex = Array.from(productInfoTabsBoxButtonCollection).indexOf(target);
        for (const productInfoTabsBoxButton of productInfoTabsBoxButtonCollection) {
            productInfoTabsBoxButton.classList.remove(`product-info-tabs__box-button_active`);
        }
        for (const productInfoTabsContent of productInfoTabsContentCollection) {
            productInfoTabsContent.classList.remove(`product-info-tabs__content_open`);
        }
        target.classList.add(`product-info-tabs__box-button_active`);
        productInfoTabsContentCollection[productInfoTabsBoxButtonIndex].classList.add(`product-info-tabs__content_open`);
    }
    else if (target.matches(`.product-info-tabs__box-button`) && target.classList.contains(`product-info-tabs__box-button_active`)) {
        target.classList.remove(`product-info-tabs__box-button_active`);
        target.nextElementSibling.classList.remove(`product-info-tabs__content_open`);
    }
}

function onFullPropertiesOpenLinkClickHandler(evt) {
    evt.preventDefault();

    const linkHrefValue = evt.target.getAttribute(`href`);
    // Open properties tab
    openProductPropertiesTab(1);
    document.querySelector(linkHrefValue).scrollIntoView({ behavior: 'smooth', block: 'start'});
}

function openProductPropertiesTab(productPropertiesTabIndex) {
    for (const productInfoTabsButton of productInfoTabsButtonCollection) {
        productInfoTabsButton.classList.remove(`product-info-tabs__button_active`);
    }
    for (const productInfoTabsContent of productInfoTabsContentCollection) {
        productInfoTabsContent.classList.remove(`product-info-tabs__content_open`);
    }
    productInfoTabsButtonCollection[productPropertiesTabIndex].classList.add(`product-info-tabs__button_active`);
    productInfoTabsContentCollection[productPropertiesTabIndex].classList.add(`product-info-tabs__content_open`);
}

function onSortBoxClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.catalog-sort__link`)) {
        // Checking if we click on active button
        if (target.classList.contains(`catalog-sort__link_active`)) {
            target.classList.remove(`catalog-sort__link_active`);
            return;
        }
        // Changing active class
        const sortValue = target.dataset.sort;
        console.log(sortValue);
        const sortButtonCollection = document.querySelectorAll(`.catalog-sort__link`);
        for (const sortButton of sortButtonCollection) {
            sortButton.classList.remove(`catalog-sort__link_active`);
        }
        target.classList.toggle(`catalog-sort__link_active`);
    }
}

// Variables
const MAX_CONTAINER_WIDTH = 1199;
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
const ratingStarsCollection = document.querySelectorAll('.form__rating-stars .star');
const catalogSidebarBox = document.querySelector(`.catalog-sidebar`);
const catalogSidebarButtonCollection = document.querySelectorAll('.catalog-sidebar__button');
const filterFormBox = document.querySelector(`.filter-form`);
const productInfoTabsContentBox = document.querySelector(`.product-info-tabs__box`);
const productInfoTabsBoxButtonCollection = document.querySelectorAll(`.product-info-tabs__box-button`);
const fullPropertiesOpenLink = document.querySelector(`.product-template__target-link`);
const sortBox = document.querySelector(`.catalog-sort`);



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
            } else {
                const handleFirstValue = +values[0];
                rangeSliderFromInputElement.value = handleFirstValue.toFixed(0);
            }
        });
        rangeSliderFromInputElement.addEventListener(`change`, function () {
            rangeSliderBox.noUiSlider.set([this.value, null]);
        });
        rangeSliderToInputElement.addEventListener(`change`, function () {
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
                },
                on: {
                    imagesReady: function() {
                        setTimeout(function() {
                            this.update();
                            addCatalogproductCustomPadding(catalogProductCollection);
                        }.bind(this), 300);
                    }
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
                loop: true,
                pagination: {
                    el: sectionCarousel.nextElementSibling
                },
                navigation: {
                    prevEl: sectionCarousel.closest(`.b-section`).querySelector(`.b-section__button-prev`),
                    nextEl: sectionCarousel.closest(`.b-section`).querySelector(`.b-section__button-next`)
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                },
                on: {
                    imagesReady: function() {
                        setTimeout(function() {
                            this.update();
                            addCatalogproductCustomPadding(catalogProductCollection);
                        }.bind(this), 300);
                    }
                }
            });
        }
    }
    // Init product gallery
    if (productGalleryBox && productGalleryThumbsBox) {
        new Swiper(productGalleryBox, {
            navigation: {
                prevEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_prev`),
                nextEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_next`)
            },
            thumbs: {
                swiper: {
                    el: productGalleryThumbsBox,
                    slidesPerView: `auto`,
                    spaceBetween: 20,
                    breakpoints: {
                        768: {
                            spaceBetween: 30
                        },
                        1200: {
                            spaceBetween: 20
                        }
                    }
                }
            }
        });
    }
    else if (productGalleryBox) {
        new Swiper(productGalleryBox, {
            navigation: {
                prevEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_prev`),
                nextEl: productGalleryBox.closest(`.product-gallery`).querySelector(`.product-gallery__button_next`)
            },
        });
    }
    // Modal
    $('[data-modal]').on('click', function () {
        $($(this).data('modal')).modal();
        return false;
    });
    // Product tabs
    if (productInfoTabsHeader) {
        productInfoTabsHeader.addEventListener(`click`, onProductInfoTabsHeaderClickHandler);
    }
    if (productInfoTabsContentBox && window.innerWidth < 1200) {
        productInfoTabsContentBox.addEventListener(`click`, onProductInfoTabsContentBoxClickHandler);
    }
    else if (productInfoTabsContentBox) {
        productInfoTabsContentBox.removeEventListener(`click`, onProductInfoTabsContentBoxClickHandler);
    }
    if (fullPropertiesOpenLink) {
        fullPropertiesOpenLink.addEventListener(`click`, onFullPropertiesOpenLinkClickHandler);
    }
    // Rating
    if (ratingStarsCollection || ratingStarsCollection.length) {
        ratingStarsCollection.forEach(star => {
            star.addEventListener('click', (evt) => {
                const starElement = evt.currentTarget;
                const ratingName = starElement.parentNode.dataset.ratingName;
                const ratingValue = starElement.dataset.rating;
                starElement.parentNode.setAttribute('data-stars', ratingValue);
                document.querySelector(`input[name="rating-${ratingName}"]`).value = ratingValue;
            });
        });
    }
    // Mobile catalog buttons
    if (catalogSidebarBox) {
        catalogSidebarBox.addEventListener(`click`, onCatalogSidebarBoxClickHandler);
    }
    // Filter
    if (filterFormBox) {
        filterFormBox.addEventListener(`click`, onfilterFormBoxClickHandler);
    }
    // Sorting
    if (sortBox) {
        sortBox.addEventListener(`click`, onSortBoxClickHandler);
    }
});

// JQUERY
(function($) {
    if ($('.swipebox').length) {
        $('.swipebox').swipebox();
    }
})(jQuery);