// main.js

import { fetchGeolocationData } from './api.js';
import { populateSelect } from './domUtils.js';
import { handleDropdownClick } from './eventHandlers.js';
import { countries } from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
  populateSelect('country-nav', countries, handleDropdownClick);

  await fetchGeolocationData();
});
