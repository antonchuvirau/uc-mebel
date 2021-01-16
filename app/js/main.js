'use strict';

// Variables
const rangeSliderBox = document.querySelector(`.range-slider__box`);
const rangeSliderFromInputElement = document.querySelector(`input[name="range-slider-from-value"]`);
const rangeSliderToInputElement = document.querySelector(`input[name="range-slider-to-value"]`);

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
});