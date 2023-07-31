function validateName(input, addErrorCb) {
  if (input.value.length <= 2) {
    addErrorCb(input, 'the name must be more than 2 characters\n');
  }
}

function validatePassword(input, addErrorCb) {
  const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  if (!passwordRegex.test(input.value)) {
    addErrorCb(input, 'Password must have 1 letter, 1 number and one symbol\n');
  }
}

function validatePasswordConfirm(confirmInput, addErrorCb) {
  const passwordInput = document.getElementById('input-password');
  if (confirmInput.value !== passwordInput.value) {
    addErrorCb(confirmInput, 'Password does not match\n');
  }
}

function validateEmail(input, addErrorCb) {
  if (!input.value.match(/^\S+@\S+\.\S+$/)) {
    addErrorCb(input, 'Email is not correct\n');
  }
}

function validateCheckbox(checkbox, addErrorCb) {
  if (!checkbox.checked) {
    addErrorCb(checkbox, '');
  }
}

function validatePhone(input, addErrorCb) {
  // const example = getExamplePhoneNumber();
  // if (example && input.value.length !== example.length) {
  //   addErrorCb(input, 'the phone number must be in appropriate format\n');
  // }
}

export const validatorsByClass = {
  '_name': validateName,
  '_passw': validatePassword,
  '_passw2': validatePasswordConfirm,
  '_email': validateEmail,
  '_checkbox': validateCheckbox,
  '_phone': validatePhone
}

export function validateFullness(input, addErrorCb) {
  if (input.value.length === 0) {
    addErrorCb(input, 'Fill in the field\n');
  }
}

