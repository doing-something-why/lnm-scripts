import { initCountrySelection } from './country.js';
import { initFilters } from './filters.js';
import { initSearchForm } from './search.js';
import { initProductDisplay } from './productDisplay.js';

document.addEventListener("DOMContentLoaded", function() {
  initCountrySelection();
  initFilters();
  initSearchForm();
  initProductDisplay();
});
