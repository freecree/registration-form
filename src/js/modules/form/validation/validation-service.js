import {validateFullness, validatorsByClass} from './validation-test-functions.js';

export default function validationService(form) {
  const errors = new Map();
  const inputs = Array.from(form.querySelectorAll('._req'));

  function addError(input, errorMessage) {
    if (!errors.has(input)) {
      errors.set(input, errorMessage);
    }
  }

  function appendErrors() {
    errors.forEach((errMessage, errInput) => {
      errInput.classList.add('_err');
      const errorElement = errInput.parentElement.querySelector('.input-error');
      if (errorElement) {
        errorElement.innerText = errMessage;
      }
    });
  }

  function removeErrors() {
    errors.forEach((_, errInput) => {
      errInput.classList.remove('_err');
      const errorElement = errInput.parentElement.querySelector('.input-error');
      if (errorElement) {
        errorElement.innerText = '';
      }
    });
    errors.clear();
  }

  function onSubmit(e) {
    e.preventDefault();
    removeErrors();
    
    inputs.forEach(input => {
      Object.keys(validatorsByClass).forEach((className) => {
        validateFullness(input, addError);
        if (input.classList.contains(className)) {
          const validatorFunc = validatorsByClass[className];
          validatorFunc(input, addError);
        }
      });
    });
    appendErrors();
  }

  form.addEventListener('submit', onSubmit);
}
