import phoneMask, {getExamplePhoneNumber} from './phone-mask.js';

const form = document.getElementById('form');
const formInputs = document.querySelectorAll('input');

function inputIsEmpty(input) {
  return input.value.length === 0;
}

function contolInputFullness() {
  for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('change', (e) => {
      if (!inputIsEmpty(formInputs[i])) {
        formInputs[i].classList.add('_not-empty');
      } else {
        formInputs[i].classList.remove('_not-empty');
      }
    });
  }
}

const errors = new Map();

function addError(input, errorMessage) {
  if (!errors.has(input)) {
    errors.set(input, errorMessage);
  }
}
function appendErrors() {
  errors.forEach((errMessage, errInput) => {
    errInput.classList.add('_err');
    const errorElement = errInput
      .parentElement
      .querySelector('.input-error');
    if (errorElement) {
      errorElement.innerText = errMessage;
    }
  });
}

function removeErrors() {
  errors.forEach((_, errInput) => {
    errInput.classList.remove('_err');
    const errorElement = errInput
      .parentElement
      .querySelector('.input-error');
    if (errorElement) {
      errorElement.innerText = '';
    }
  });
  errors.clear();
}

function validateFullness(input) {
  if (input.value.length === 0) {
    addError(input, 'Fill in the field\n');
  }
}

function validateName(input) {
  if (input.value.length <= 2) {
    addError(input, 'the name must be more than 2 characters\n');
  }
}

function validatePassword(input) {
  const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  if (!passwordRegex.test(input.value)) {
    addError(input, 'Password must have 1 letter, 1 number and one symbol\n');
  }
}

function validatePasswordConfirm(confirmInput) {
  const passwordInput = document.getElementById('input-password');
  if (confirmInput.value !== passwordInput.value) {
    addError(confirmInput, 'Password does not match\n');
  }
}

function validateEmail(input) {
  if (!input.value.match(/^\S+@\S+\.\S+$/)) {
    addError(input, 'Email is not correct\n');
  }
}

function validatePhone(input) {
  const example = getExamplePhoneNumber();
  if (example && input.value.length !== example.length) {
    addError(input, 'the phone number must be in appropriate format\n');
  }
}

function validateCheckbox(checkbox) {
  if (!checkbox.checked) {
    addError(checkbox, '');
  }
}

export default function formController() {
  contolInputFullness();
  // const phoneInput = document.getElementById('input-phone');
  // phoneMask({phoneInput});

  const reqInputs = Array.from(formInputs)
  .filter(input => input.classList.contains('_req'));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    removeErrors();

    reqInputs.forEach(input => {
      validateFullness(input);
      if (input.classList.contains('_name')) {
        validateName(input);
      }
      if (input.classList.contains('_passw')) {
        validatePassword(input);
      }
      if (input.classList.contains('_passw2')) {
        validatePasswordConfirm(input);
      }
      if (input.classList.contains('_email')) {
        validateEmail(input);
      }
      if (input.classList.contains('_checkbox')) {
        validateCheckbox(input);
      }
      if (input.classList.contains('_phone')) {
        validatePhone(input);
      }
    });
    appendErrors();
  });
}
