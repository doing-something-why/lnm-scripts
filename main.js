// main.js

import { fetchGeolocationData } from './api.js';
import { populateSelect } from './domUtils.js';
import './eventHandlers.js';
import { handleDropdownClick } from './eventHandlers.js';
import { countries } from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
  populateSelect('country-nav', countries, handleDropdownClick);

  const geoData = await fetchGeolocationData();
  if (geoData) {
    const countryName = geoData.country; // Assuming you have a mapping function
    document.getElementById('country-nav').dataset.selectedValue = countryName;
  }
});
