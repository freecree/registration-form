import {isWebp} from './modules/utils.js';
// import countriesList from './modules/countries-list.js';
// import formController from './modules/form/form-controller.js';
import FormController from './modules/form/form-controller.js';

isWebp();
// formController();
// countriesList();
const formController = new FormController();
formController.init();

