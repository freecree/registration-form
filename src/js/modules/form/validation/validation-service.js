import {validateFullness, validatorsByClass, validatePhone} from './validation-test-functions.js';

export default function validationService(form, {phoneMaskService}) {
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
    inputs.forEach((input) => {
      input.classList.remove('_err');
      const errorElement = input.parentElement.querySelector('.input-error');
      if (errorElement) {
        errorElement.innerText = '';
      }
    });
    errors.clear();
  }

  function validate() {
    inputs.forEach(input => {
      validateFullness(input, addError);
      Object.keys(validatorsByClass).forEach((className) => {
        if (input.classList.contains(className)) {
          const validatorFunc = validatorsByClass[className];
          validatorFunc(input, addError);
        }
      });
      if (input.classList.contains('_phone')) {
        validatePhone(input, addError, phoneMaskService);
      }
    });
  }

  removeErrors();
  validate();
  appendErrors();
  return errors;
}
