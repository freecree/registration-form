import validationService from './validation/validation-service.js';
import CountryService from './country-service.js';
import PhoneMaskService from './phone-mask-service.js';

export default class FormController {
  constructor() {
    this.form = document.getElementById('form');
    this.inputs = this.form.querySelectorAll('input');
    this.phoneInput = document.getElementById('input-phone');
    this.countryInput = document.getElementById('input-countries');

    this.countryService = new CountryService(this.countryInput);
    this.phoneMaskService = new PhoneMaskService(this.phoneInput);
    this.countryService.setPhoneMaskService(this.phoneMaskService);
  }

  _inputIsEmpty(input) {
    return input.value.length === 0;
  }

  _contolInputsFullness() {
    for(let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].addEventListener('change', (e) => {
        if (!this._inputIsEmpty(this.inputs[i])) {
          this.inputs[i].classList.add('_not-empty');
        } else {
          this.inputs[i].classList.remove('_not-empty');
        }
      });
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    const errors = validationService(this.form, {
      phoneMaskService: this.phoneMaskService
    });
  }
  
  init() {
    this._contolInputsFullness();
    this.countryService.init();
    this.phoneMaskService.init();
    this.form.addEventListener('submit', this._onSubmit.bind(this))
  }
}
