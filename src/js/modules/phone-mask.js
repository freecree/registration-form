import {getExample} from 'awesome-phonenumber';
let examplePhoneNumber;

function setInput(input, value) {
  input.value = value;
  const event = new Event('change');
  input.dispatchEvent(event);
}

export function getExamplePhoneNumber() {
  return examplePhoneNumber;
}

export default function phoneMask({countryCode = 'UA', phoneInput}) {
  const examplePhone = getExample(countryCode);
  if (!examplePhone) return;

  examplePhoneNumber = examplePhone.number.international;
  phoneInput.placeholder = examplePhoneNumber.slice(1);

  const linkedSymbols = new Map();
  let phoneCodeEnd = 0;
  for (let i = 0; i < examplePhoneNumber.length; i++) {
    if (examplePhoneNumber[i].match(/[^\d+]/)) {
      linkedSymbols.set(i, examplePhoneNumber[i]);
      if (phoneCodeEnd === 0) phoneCodeEnd = i;
    }
  }
  const phoneCode = examplePhoneNumber.substring(0, phoneCodeEnd);

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }

  phoneInput.addEventListener('input', e => {
    const input = e.target;
    let formattedInputValue;
    let inputNumbersValue = getInputNumbersValue(input);
    if (!inputNumbersValue) {
      input.value = '';
      return;
    }
    formattedInputValue = '+' + inputNumbersValue;
    const inputLength = examplePhoneNumber.length;

    linkedSymbols.forEach((symbol, index) => {
      if (formattedInputValue.length > index) {
        const substr1 = formattedInputValue.substring(0, index);
        const substr2 = formattedInputValue.substring(index, inputLength - 1);
        formattedInputValue = substr1 + symbol + substr2;
      }
    });
    setInput(input, formattedInputValue);
  });

  setInput(phoneInput, phoneCode);

}
