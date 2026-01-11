import { miniaturesRender } from './thumbnails.js';
import { getData } from './api.js';
import { alertShow } from './utils.js';
import { formSetup } from './upload-form.js';
import { filtersInit } from './filter.js';
import * as validationModule from './validation.js';
import * as effectsModule from './scale.js';

formSetup(validationModule, effectsModule);

getData()
  .then((pictures) => {
    miniaturesRender(pictures);
    filtersInit(pictures);
  })
  .catch((err) => {
    alertShow(err.message);
  });
