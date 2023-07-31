import PhoneMaskService from './phone-mask-service.js';

export default class CountryService {
  constructor(input) {
    this.input = input;
    this.countriesSwitchBtn = document.querySelector('.countries-input-angle');
    this.countriesListElement = document.getElementById('countries-list');
  }
  setPhoneMaskService(phoneMaskService) {
    this.phoneMaskService = phoneMaskService;
  }
  _onInputFocus(e) {
    const inputWrapper = e.target.parentElement;
    inputWrapper.classList.remove('close');
    inputWrapper.classList.add('open');
  }

  _onInputBlur(e) {
    const inputWrapper = e.target.parentElement;
    inputWrapper.classList.remove('open');
    inputWrapper.classList.add('close');
  }

  _onSwitchBtnMouseDown(e) {
    e.preventDefault();
    const inputWrapper = e.target.parentElement;
    if (!inputWrapper) return;
    if (inputWrapper.classList.contains('close')) {
      this.input.focus();
    } else if (inputWrapper.classList.contains('open')) {
      this.input.blur();
    }
  }

  _initDropdown() {
    this.input.addEventListener('focus', this._onInputFocus.bind(this));
    this.input.addEventListener('blur', this._onInputBlur.bind(this));
    this.countriesSwitchBtn.addEventListener(
      'mousedown', this._onSwitchBtnMouseDown.bind(this)
    );
  }

  _fetchCountries() {
    const countriesApiURL = 'https://restcountries.com/v3.1/';
    return fetch(`${countriesApiURL}/all`)
      .then((response) => {
        return response.json();
      });
  }

  _sortCountries(country1, country2) {
    if (country1.name.common === country2.name.common) {
      return 0
    }
    if (country1.name.common < country2.name.common) {
      return -1;
    }
    if (country1.name.common > country2.name.common) {
      return 1;
    }
  }

  async _appendCountriesHtml() {
    const countries = await this._fetchCountries();
    const sortedCountries = countries.sort(this._sortCountries);
    let countriesHtml = '';
    sortedCountries.forEach(country => {
      const liElement = `<li class="countries-input__country-item"\
      data-country-code=${country.cca2}>${country.name.common}</li>`
      countriesHtml += liElement;
    });
    this.countriesListElement.innerHTML = countriesHtml;
  }
  _onCountryMouseDown(e) {
    const target = e.target;
    if (target.classList.contains('countries-input__country-item')) {
      this.input.value = target.innerText;
      const event = new Event('change');
      this.input.dispatchEvent(event);

      const countryCode = target.getAttribute('data-country-code');
      const phoneInput = document.getElementById('input-phone');
      this.phoneMaskService.setCountryCode(countryCode);
    }
  }

  init() {
    this._initDropdown();
    this._appendCountriesHtml();
    this.countriesListElement.addEventListener(
      'mousedown', this._onCountryMouseDown.bind(this)
    );
  }
}
