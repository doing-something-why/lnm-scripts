import { initFilters } from './filters.js';
import { initSearchForm } from './search.js';
import { initProductDisplay } from './productDisplay.js';
import { initCountrySelection } from './country.js';

document.addEventListener("DOMContentLoaded", function() {
  initFilters();
  initSearchForm();
  initProductDisplay();
  initCountrySelection();
});
