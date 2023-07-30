// import phoneMask from './phone-mask.js';
import PhoneMask from './phone-mask.js';

// async function fetchCountries() {
//   const countriesApiURL = 'https://restcountries.com/v3.1/';
//   return fetch(`${countriesApiURL}/all`)
//     .then((response) => {
//       return response.json();
//     });
// }

// function sortCountries(country1, country2) {
//   if (country1.name.common === country2.name.common) {
//     return 0
//   }
//   if (country1.name.common < country2.name.common) {
//     return -1;
//   }
//   if (country1.name.common > country2.name.common) {
//     return 1;
//   }
// }

// export default async function countriesListService() {
//   const countriesInput = document.getElementById('input-countries');
//   const countriesInputSwitch = document.querySelector('.countries-input-angle');
//   const countriesList = document.getElementById('countries-list');

//   function onInputFocus(e) {
//     const inputWrapper = e.target.parentElement;
//     inputWrapper.classList.remove('close');
//     inputWrapper.classList.add('open');
//   }

//   function onInputBlur(e) {
//     const inputWrapper = e.target.parentElement;
//     inputWrapper.classList.remove('open');
//     inputWrapper.classList.add('close');
//   }

//   function onInputMouseDown(e) {
//     e.preventDefault();
//     const inputWrapper = e.target.parentElement;
//     if (!inputWrapper) return;
//     if (inputWrapper.classList.contains('close')) {
//       countriesInput.focus();
//     } else if (inputWrapper.classList.contains('open')) {
//       countriesInput.blur();
//     }
//   }

//   function countriesDropdown() {
//     countriesInput.addEventListener('focus', onInputFocus);
//     countriesInput.addEventListener('blur', onInputBlur);
//     countriesInputSwitch.addEventListener('mousedown', onInputMouseDown);
//   }

//   async function appendCountriesHtml() {
//     const countries = await fetchCountries();
//     const sortedCountries = countries.sort(sortCountries);
//     let countriesHtml = '';
//     sortedCountries.forEach(country => {
//       const liElement = `<li class="countries-input__country-item"\
//       data-country-code=${country.cca2}>${country.name.common}</li>`
//       countriesHtml += liElement;
//     });
//     countriesList.innerHTML = countriesHtml;
//   }

//   function onCountryMouseDown(e) {
//     const target = e.target;
//     if (target.classList.contains('countries-input__country-item')) {
//       countriesInput.value = target.innerText;
//       const event = new Event('change');
//       countriesInput.dispatchEvent(event);

//       const countryCode = target.getAttribute('data-country-code');
//       const phoneInput = document.getElementById('input-phone');
//       const phoneMask = new PhoneMask(phoneInput, countryCode);
//       phoneMask.init();
//     }
//   }


//   countriesDropdown();
//   appendCountriesHtml();
//   countriesList.addEventListener('mousedown', onCountryMouseDown);
// }

export default class CountryService {
  constructor(input) {
    this.input = input;
    this.countriesSwitchBtn = document.querySelector('.countries-input-angle');
    this.countriesListElement = document.getElementById('countries-list');
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
      const phoneMask = new PhoneMask(phoneInput, countryCode);
      phoneMask.init();
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
