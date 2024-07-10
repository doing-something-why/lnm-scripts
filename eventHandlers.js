// eventHandlers.js

import { showSkeletons, showElement, hideElement, populateSelect, updateProductCards } from './domUtils.js';
import { fetchGeolocationData, fetchSearchResults } from './api.js';
import { countryCodesToNames, countries, colors } from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".dropdown .dropdown-content");
  const selectedFiltersContainer = document.getElementById("selected-filters");
  const searchForm = document.getElementById('wf-form-search-form');
  const productContainer = document.getElementById('cards-container-2');
  const resultsSection = document.querySelector('.c-section.results');
  const resultsTitleLoading = document.getElementById('results_title_loading');
  const resultsTitleFound = document.getElementById('results_title_found');
  const currencySymbols = {
    // Currency symbols mapping
  };

  const copyLinkSearch = document.getElementById('copy-link-search');
  if (copyLinkSearch) {
    copyLinkSearch.addEventListener('click', handleCopyLinkSearch);
  }

  setTimeout(() => {
    const filtersAnnotationWrapper = document.querySelector(".filters-annotation-wrapper");
    if (filtersAnnotationWrapper) {
      filtersAnnotationWrapper.classList.add("show-timeout");
    }
  }, 1500);

  if (searchForm) {
    searchForm.addEventListener('submit', handleSearchFormSubmit);
    handleAutoSearch(searchForm);
  } else {
    console.error('Form with ID "search-form" not found.');
  }

  populateSelect('country-nav', countries, handleDropdownClick);
  populateSelect('colors', colors, handleDropdownClick);

  fetchGeolocationData().then(data => {
    if (data) {
      handleGeolocationData(data, countryCodesToNames);
    }
  }).catch(console.error);

  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => handleArrowClick('left'));
    rightArrow.addEventListener('click', () => handleArrowClick('right'));
    productContainer.addEventListener('scroll', checkArrowsVisibility);
    window.addEventListener('resize', checkArrowsVisibility);
    checkArrowsVisibility();
  }
});

function handleDropdownClick(event) {
  const dropdownItem = event.target;
  const dropdown = dropdownItem.closest('.dropdown');
  const value = dropdownItem.dataset.value;
  const currentValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];
  const filterName = dropdown.closest('.filter-button').querySelector('.c-text-l').textContent;

  if (dropdown.id === 'colors') {
    if (currentValues.includes(value)) {
      dropdown.dataset.selectedValues = currentValues.filter(val => val !== value).join(',');
    } else {
      currentValues.push(value);
      dropdown.dataset.selectedValues = currentValues.join(',');
    }
  } else {
    dropdown.dataset.selectedValue = value;
  }

  updateSelectedFilters();
}

function updateSelectedFilters() {
  const selectedFiltersContainer = document.getElementById("selected-filters");
  selectedFiltersContainer.innerHTML = ""; 
  const filters = document.querySelectorAll(".dropdown .dropdown-content");
  filters.forEach(filter => {
    const dropdown = filter.closest('.dropdown');
    const filterId = dropdown.id;
    const filterName = filterId.charAt(0).toUpperCase() + filterId.slice(1); 
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

function handleCopyLinkSearch() {
  const itemUrl = document.getElementById('item-url').value;
  const country = document.getElementById('country-nav').dataset.selectedValue;
  const colors = document.getElementById('colors').dataset.selectedValues ? document.getElementById('colors').dataset.selectedValues.split(',') : [];

  const params = new URLSearchParams({
    search_str: itemUrl,
    country: country,
    colors: colors.join(',')
  });

  const searchLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  navigator.clipboard.writeText(searchLink).then(() => {
    copyLinkSearch.innerText = "Link copied!";
    setTimeout(() => {
      copyLinkSearch.innerText = "Copy search link";
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy the text: ', err);
  });
}

function handleSearchFormSubmit(event) {
  event.preventDefault(); 
  const resultsSection = document.querySelector('.c-section.results');
  const resultsTitleLoading = document.getElementById('results_title_loading');
  const resultsTitleFound = document.getElementById('results_title_found');
  const productContainer = document.getElementById('cards-container-2');
  const currencySymbols = {
    // Currency symbols mapping
  };
  showElement(resultsSection);
  showElement(resultsTitleLoading);
  hideElement(resultsTitleFound);
  showSkeletons(productContainer);

  const itemUrl = document.getElementById('item-url');
  const country = document.getElementById('country-nav').dataset.selectedValue;
  const colors = document.getElementById('colors').dataset.selectedValues ? document.getElementById('colors').dataset.selectedValues.split(',') : [];

  if (!itemUrl || !country) {
    console.error('Form elements not found or not selected.');
    return;
  }

  const itemUrlValue = itemUrl.value;
  const countryValue = country;
  const colorsValue = colors;

  const requestBody = {
    search_str: itemUrlValue,
    country: countryValue,
    colors: colorsValue
  };

  fetchSearchResults(requestBody).then(data => {
    if (data) {
      updateProductCards(data, currencySymbols, productContainer, createProductCardHTML);
      hideElement(resultsTitleLoading);
      showElement(resultsTitleFound);
    }
  }).catch(error => {
    console.error('Error:', error);
    resultsTitleLoading.style.display = 'none';
  });
}

function handleAutoSearch(searchForm) {
  const params = new URLSearchParams(window.location.search);
  const search_str = params.get('search_str');
  const country = params.get('country');
  const colors = params.get('colors') ? params.get('colors').split(',') : [];

  if (url && country) {
    document.getElementById('item-url').value = url;
    document.querySelector(`#country-nav .c-text-s`).innerHTML = country; 
    document.getElementById('country-nav').dataset.selectedValue = country;

    const colorOptions = colors.join(', ');
    document.querySelector(`#colors .c-text-l`).innerHTML = "Colors";
    document.getElementById('colors').dataset.selectedValues = colorOptions;

    searchForm.dispatchEvent(new Event('submit'));
  }
}

function handleGeolocationData(data, countryCodesToNames) {
  const userCountryCode = data.country;
  const countryName = countryCodesToNames[userCountryCode];
  const selectElement = document.getElementById('country-nav'); 

  if (selectElement) {
    const options = Array.from(selectElement.querySelectorAll('.dropdown-item'));
    const matchingOption = options.find(opt => opt.dataset.value === countryName);

    if (matchingOption) {
      selectElement.querySelector('.c-text-s').innerHTML = countryName;
      selectElement.dataset.selectedValue = countryName;
    } else {
      selectElement.querySelector('.c-text-s').innerHTML = 'United States';
      selectElement.dataset.selectedValue = 'United States';
    }
  }
}

function handleArrowClick(direction) {
  const productContainer = document.getElementById('cards-container-2');
  if (productContainer) {
    if (direction === 'left') {
      productContainer.scrollLeft -= productContainer.offsetWidth;
    } else {
      productContainer.scrollLeft += productContainer.offsetWidth;
    }
  }
}

function checkArrowsVisibility() {
  const productContainer = document.getElementById('cards-container-2');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  const maxScrollLeft = productContainer.scrollWidth - productContainer.clientWidth;
  if (productContainer.scrollLeft === 0) {
    leftArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'block';
  }
  if (productContainer.scrollLeft >= maxScrollLeft) {
    rightArrow.style.display = 'none';
  } else {
    rightArrow.style.display = 'block';
  }
}

function createProductCardHTML(item, isVestiaire, currencySymbols) {
  const productImage = isVestiaire ? (item.pictures && item.pictures.length > 0 ? `https://images.vestiairecollective.com/images/resized/w=480,q=75,f=auto,${item.pictures[0]}` : 'default-image.jpg') : (item.photo ? item.photo.url : 'default-image.jpg');
  let productPrice;
  if (isVestiaire) {
    if (item.price && item.price.cents && item.price.currency) {
      const currencySymbol = currencySymbols[item.price.currency] || item.price.currency;
      productPrice = `${Math.round(parseInt(item.price.cents, 10) / 100)}${currencySymbol}`;
    } else {
      productPrice = 'N/A';
    }
  } else {
    const currencySymbol = currencySymbols[item.currency] || item.currency;
    productPrice = item.price ? `${Math.round(item.price)}${currencySymbol}` : 'N/A';
  }
  const productDescription = isVestiaire ? (item.description ? item.name : 'No name available') : (item.title ? item.title : 'No name available');
  const productBrand = isVestiaire ? (item.brand && item.brand.name ? item.brand.name : 'Unknown Brand') : (item.brand_title ? item.brand_title : 'Unknown Brand');
  const productCountry = isVestiaire ? (item.country ? item.country : '') : '';
  const productCondition = isVestiaire ? (item.condition ? item.condition.name : '') : (item.status ? item.status : '');
  const productSize = isVestiaire ? (item.size && item.size.label ? item.size.label : 'Unknown Size') : (item.size_title ? item.size_title : 'Unknown Size');
  const productLink = isVestiaire ? (item.link ? `https://www.vestiairecollective.com${item.link}` : '#') : (item.url ? item.url : '#');
  const platformLogo = isVestiaire 
    ? 'https://uploads-ssl.webflow.com/666b15a55a26ad71221e8e13/666e9e119c5082dae41c664f_vestiaire%20logo.png'
    : 'https://uploads-ssl.webflow.com/666b15a55a26ad71221e8e13/666e9e11d0c8bbf461c51a1e_vinted%20logo.png';

  return `
    <a href="${productLink}" class="product-card-wrapper">
      <div class="product-card">
        <div class="card-image-wrapper">
          <img loading="lazy" src="${productImage}" alt="${productBrand} ${productDescription}" class="card-image">
        </div>
        <div class="card-text-wrapper">
          <div class="card-title-wrapper">
            <div class="card-line-wrapper truncate-text">
              <div class="c-text-m-sb truncate-text" data-brand-name>${productBrand}</div>
              <img src="${platformLogo}" loading="lazy" alt="" class="card-platform-logo hide-mobile">
            </div>
            <div class="c-text-m align-right truncate-text">${productSize}</div>
          </div>
          <div class="card-line-wrapper">
            <div class="c-text-m-normal truncate-text" data-product-name>${productDescription}</div>
          </div>
          <div class="card-line-wrapper">
            <div class="c-text-m-sb truncate-text" data-product-name>${productPrice}</div>
          </div>
          ${productCountry ? `
            <div class="card-line-wrapper">
              <div class="card-icon w-embed">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.875 7.0835C14.875 12.0418 8.5 16.2918 8.5 16.2918C8.5 16.2918 2.125 12.0418 2.125 7.0835C2.125 5.39274 2.79665 3.77123 3.99219 2.57569C5.18774 1.38015 6.80924 0.708496 8.5 0.708496C10.1908 0.708496 11.8123 1.38015 13.0078 2.57569C14.2033 3.77123 14.875 5.39274 14.875 7.0835Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8.5 9.2085C9.6736 9.2085 10.625 8.2571 10.625 7.0835C10.625 5.90989 9.6736 4.9585 8.5 4.9585C7.32639 4.9585 6.375 5.90989 6.375 7.0835C6.375 8.2571 7.32639 9.2085 8.5 9.2085Z" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <div class="c-text-m-normal truncate-text" data-product-country>${productCountry}</div>
            </div>` : ''}
          ${productCondition ? `
            <div class="card-line-wrapper">
              <div class="card-icon w-embed">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5839 9.49859L9.50518 14.5773C9.37361 14.7091 9.21737 14.8135 9.04539 14.8848C8.87341 14.9561 8.68906 14.9928 8.50289 14.9928C8.31672 14.9928 8.13237 14.9561 7.96039 14.8848C7.78841 14.8135 7.63217 14.7091 7.5006 14.5773L1.41602 8.49984V1.4165H8.49935L14.5839 7.50109C14.8478 7.76652 14.9959 8.12557 14.9959 8.49984C14.9959 8.8741 14.8478 9.23316 14.5839 9.49859Z" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M4.95898 4.9585H4.96695" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <div class="c-text-m-normal truncate-text" data-product-condition">${productCondition}</div>
            </div>` : ''}
        </div>
      </div>
    </a>
  `;
}