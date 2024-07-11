import { showElement, hideElement, countries, colors } from './utils.js';

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

export function removeFilter(event) {
    const filterTag = event.target.closest(".filter-tag");
    const filterId = filterTag.dataset.filterId;
    const optionValue = filterTag.dataset.optionValue;
    const dropdown = document.getElementById(filterId);
    let currentValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];

    if (filterId === 'colors') {
        currentValues = currentValues.filter(val => val !== optionValue);
        dropdown.dataset.selectedValues = currentValues.join(',');
    } else {
        dropdown.dataset.selectedValue = '';
    }

    updateSelectedFilters();
}

export function handleDropdownClick(event) {
    const dropdownItem = event.target;
    const dropdown = dropdownItem.closest('.dropdown');
    const value = dropdownItem.dataset.value;
    let currentValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];
    // const filterName = dropdown.closest('.filter-button').querySelector('.c-text-l').textContent;

    if (dropdown.id === 'colors') {
        // Allow multiple selections for colors
        if (currentValues.includes(value)) {
            // Remove the value if already selected
            dropdown.dataset.selectedValues = currentValues.filter(val => val !== value).join(',');
        } else {
            // Add the value if not already selected
            currentValues.push(value);
            dropdown.dataset.selectedValues = currentValues.join(',');
        }
    } else {
        // Single selection for other filters
        dropdown.dataset.selectedValue = value;
        document.getElementById('selected-country').innerText = value;

    }

    updateSelectedFilters();
}

export function populateSelect(elementId, options) {
    const dropdownContent = document.querySelector(`#${elementId} .dropdown-content`);
    if (dropdownContent) {
        options.forEach(option => {
            const opt = document.createElement('div');
            opt.className = 'dropdown-item';
            opt.dataset.value = option;
            opt.innerHTML = option;
            opt.addEventListener('click', handleDropdownClick);
            dropdownContent.appendChild(opt);
        });
        console.log(`Populated ${elementId} with options:`, options);
    } else {
        console.error(`Dropdown content for element ID "${elementId}" not found.`);
    }
}

export function initFilters() {
    
    
    /*
    const filters = document.querySelectorAll(".dropdown .dropdown-content");
    filters.forEach(filter => {
        const dropdown = filter.closest('.dropdown');
        dropdown.addEventListener('click', handleDropdownClick);
    });    
    */
    populateSelect('country-nav', countries); // Use country-nav instead of country
    populateSelect('colors', colors);
}
