import {getData} from './api.js'; 
import {getItems} from './data.js';
import {initGallery} from './gallery.js';
import {debounce, showAlert} from './utils.js';
import {changeFilter, showFilter} from './filter.js';
import {setState, getState} from './state.js';
import {renderSmallItems} from './small-items.js';
import {hideFormUpload, initFormUpload} from './form-upload.js';
import {initValidation} from './validation.js';

const RENDER_DELAY = 500;
setState(getItems());
try {
  renderSmallItems(getState());
  initGallery(getState());
  changeFilter(debounce(() => renderSmallItems(getState()), RENDER_DELAY));
  showFilter();
} catch (err) {
  showAlert(err.message);
}
initFormUpload(initValidation, hideFormUpload);


getData()
  .then((items) => {
    setState(items);
  })
  .then(() => {
    renderSmallItems(getState());
    initGallery(getState());
    changeFilter(debounce(() => renderSmallItems(getState()), RENDER_DELAY));
    showFilter();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initFormUpload(initValidation, hideFormUpload);
