import {getExample} from 'awesome-phonenumber';
let examplePhoneNumber;

export default class PhoneMask {
  constructor(input, countryCode) {
    this.input = input;
    this.countryCode = countryCode;
    this.linkedSymbols = new Map();
    this.phoneCode = '';
  }

  _initExamplePhoneNumber() {
    const examplePhone = getExample(this.countryCode);
    if (!examplePhone) return;
    this.examplePhoneNumber = examplePhone.number.international;
  }

  _initLinkedSymbolsAndPhoneCode() {
    let phoneCodeEnd = 0;
    for (let i = 0; i < this.examplePhoneNumber.length; i++) {
      if (this.examplePhoneNumber[i].match(/[^\d+]/)) {
        this.linkedSymbols.set(i, this.examplePhoneNumber[i]);
        if (phoneCodeEnd === 0) phoneCodeEnd = i;
      }
    }
    this.phoneCode = this.examplePhoneNumber.substring(0, phoneCodeEnd);
  }

  _setInputPlaceholder() {
    this.input.placeholder = this.examplePhoneNumber.slice(1);
  }

  _setInput(value) {
    this.input.value = value;
    const event = new Event('change');
    this.input.dispatchEvent(event);
  }

  _getInputNumbersValue() {
    return this.input.value.replace(/\D/g, '');
  }

  _onInput(e) {
    let formattedInputValue;
    let inputNumbersValue = this._getInputNumbersValue();
    if (!inputNumbersValue) {
      this.input.value = '';
      return;
    }
    formattedInputValue = '+' + inputNumbersValue;
    const inputLength = this.examplePhoneNumber.length;

    this.linkedSymbols.forEach((symbol, index) => {
      if (formattedInputValue.length > index) {
        const substr1 = formattedInputValue.substring(0, index);
        const substr2 = formattedInputValue.substring(index, inputLength - 1);
        formattedInputValue = substr1 + symbol + substr2;
      }
    });
    this._setInput(formattedInputValue);
  }

  init() {
    this._initExamplePhoneNumber();
    this._initLinkedSymbolsAndPhoneCode();
    this._setInput(this.phoneCode);
    this._setInputPlaceholder();
    this.input.addEventListener('input', this._onInput.bind(this));
  }
}
