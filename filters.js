import { showElement, hideElement, populateSelect, countries, colors, handleDropdownClick} from './utils.js';

export function updateSelectedFilters() {
    const filters = document.querySelectorAll(".dropdown .dropdown-content");
    const selectedFiltersContainer = document.getElementById("selected-filters");
    selectedFiltersContainer.innerHTML = ""; // Clear existing filters
    filters.forEach(filter => {
      const dropdown = filter.closest('.dropdown');
      const filterId = dropdown.id;
      const filterName = filterId.charAt(0).toUpperCase() + filterId.slice(1); // Capitalize filter name
      const selectedValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];

      if (filterId !== 'country-nav' && filterId !== 'country') {
        selectedValues.forEach(selectedValue => {
          if (selectedValue) {
            const filterTag = document.createElement("div");
            filterTag.className = "filter-tag";
            filterTag.innerHTML = `<span>${selectedValue}</span><img src="https://cdn.prod.website-files.com/666b15a55a26ad71221e8e13/667855b6602dabc71813e1d9_filter_select_cross.png" class="remove-filter-icon">`;
            filterTag.dataset.filterId = dropdown.id;
            filterTag.dataset.optionValue = selectedValue;
            filterTag.addEventListener("click", removeFilter);
            selectedFiltersContainer.appendChild(filterTag);
          }
        });
      }
    });
  }

  export function initFilters() {
    const filters = document.querySelectorAll(".dropdown .dropdown-content");
    const selectedFiltersContainer = document.getElementById("selected-filters");
  
    filters.forEach(filter => {
      const dropdown = filter.closest('.dropdown');
      dropdown.addEventListener('click', handleDropdownClick);
    });
  
    function removeFilter(event) {
      const filterTag = event.target.closest(".filter-tag");
      const filterId = filterTag.dataset.filterId;
      const optionValue = filterTag.dataset.optionValue;
      const dropdown = document.getElementById(filterId);
      const currentValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];
  
      if (filterId === 'colors') {
        dropdown.dataset.selectedValues = currentValues.filter(val => val !== optionValue).join(',');
      } else {
        dropdown.dataset.selectedValue = '';
      }
  
      updateSelectedFilters();
    }
    
    populateSelect('country-nav', countries); // Use country-nav instead of country
    populateSelect('colors', colors);
  }