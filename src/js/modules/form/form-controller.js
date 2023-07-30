import validationService from './validation/validation-service.js';
import CountryService from './countries-list-service.js';
import PhoneMaskService from './phone-mask.js';


const form = document.getElementById('form');
const formInputs = document.querySelectorAll('input');

export default function formController() {
  function inputIsEmpty(input) {
    return input.value.length === 0;
  }

  function contolInputsFullness(inputs) {
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', (e) => {
        if (!inputIsEmpty(inputs[i])) {
          inputs[i].classList.add('_not-empty');
        } else {
          inputs[i].classList.remove('_not-empty');
        }
      });
    }
  }
  const formInputs = form.querySelectorAll('input');
  contolInputsFullness(formInputs);
  // countriesListService();
  const countryInput = document.getElementById('input-countries');
  const countryService = new CountryService(countryInput);
  countryService.init();
  validationService(form);
}

class FormController {
  constructor() {
    this.phoneInput = document.getElementById('input-phone');
    this.countryInput = document.getElementById('input-countries');

    this.countryService = new countryService(this.countryInput);
    this.phoneMaskService = new PhoneMaskService(this.phoneInput);
    this_setServices();
  }
  _setServices() {
    this.countriesListService.setPhoneMaskService(this.phoneMaskService);
    this.phoneMaskService.setCountryService(this.countryService);
  }

}
