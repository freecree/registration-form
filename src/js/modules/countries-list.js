import phoneMask from './phone-mask.js';

const countriesInput = document.getElementById('input-countries');
const countriesList = document.getElementById('countries-list');
const phoneInput = document.getElementById('input-phone');
const countriesInputSwitch = document.querySelector('.countries-input-angle');

function countriesDropdown() {
  countriesInput.addEventListener('focus', (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.classList.remove('close');
    inputWrapper.classList.add('open');
  });
  countriesInput.addEventListener('blur', (e) => {
    const inputWrapper = e.target.parentElement;
    inputWrapper.classList.remove('open');
    inputWrapper.classList.add('close');
  });
  countriesInputSwitch.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const inputWrapper = e.target.parentElement;
    if (!inputWrapper) return;
    if (inputWrapper.classList.contains('close')) {
      countriesInput.focus();
    } else if (inputWrapper.classList.contains('open')) {
      countriesInput.blur();
    }
  });
}
async function fetchCountries() {
  const countriesApiURL = 'https://restcountries.com/v3.1/';

  return fetch(`${countriesApiURL}/all`)
    .then((response) => {
      return response.json();
    })
}

function sortCountries(country1, country2) {
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

export default async function makeCountriesList() {
  countriesDropdown();
  const countries = await fetchCountries();
  const sortedCountries = countries.sort(sortCountries);

  let countriesHtml = '';
  sortedCountries.forEach(country => {
    const liElement = `<li class="countries-input__country-item"\
    data-country-code=${country.cca2}>${country.name.common}</li>`

    countriesHtml += liElement;
  });
  countriesList.innerHTML = countriesHtml;
  countriesList.addEventListener('mousedown', (e) => {
    const target = e.target;
    if (target.classList.contains('countries-input__country-item')) {
      countriesInput.value = target.innerText;
      const event = new Event('change');
      countriesInput.dispatchEvent(event);

      const countryCode = target.getAttribute('data-country-code');
      const phoneInput = document.getElementById('input-phone');
      phoneMask({
        phoneInput,
        countryCode
      });
      
    }
  });
}
