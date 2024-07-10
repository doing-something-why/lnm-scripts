import { showElement, hideElement } from './utils.js';
import { showSkeletons } from './productDisplay.js'; // Add this line

export function initSearchForm() {
    const searchForm = document.getElementById('wf-form-search-form');
    const resultsSection = document.querySelector('.c-section.results');
    const resultsTitleLoading = document.getElementById('results_title_loading');
    const resultsTitleFound = document.getElementById('results_title_found');
    const productContainer = document.getElementById('cards-container-2');

    if (searchForm) {
      searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Ensure the search form remains visible
        searchForm.style.display = 'block';

        // Show the results section and loading title
        showElement(resultsSection);
        showElement(resultsTitleLoading);
        hideElement(resultsTitleFound);
        showSkeletons(productContainer);

        // Get form values
        const itemUrl = document.getElementById('item-url');
        const country = document.getElementById('country-nav').dataset.selectedValue; // Use country-nav instead of country
        const colors = document.getElementById('colors').dataset.selectedValues ? document.getElementById('colors').dataset.selectedValues.split(',') : [];

        if (!itemUrl || !country) {
          console.error('Form elements not found or not selected.');
          return;
        }

        const itemUrlValue = itemUrl.value;
        const countryValue = country;
        const colorsValue = colors;

        // Prepare API request
        const requestBody = {
          search_str: itemUrlValue,
          country: countryValue,
          colors: colorsValue
        };

        console.log('Sending request with body:', requestBody);

        // Fetch API with CORS proxy
        fetch('https://findresale.onrender.com/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
          console.log('API response data:', data);
          updateProductCards(data, productContainer, resultsTitleLoading, resultsTitleFound, searchForm);
        })
        .catch(error => {
          console.error('Error:', error);
          resultsTitleLoading.style.display = 'none';
        });
      });

      // Automatically perform search if URL has parameters
      const params = new URLSearchParams(window.location.search);
      const url = params.get('search_str');
      const country = params.get('country');
      const colors = params.get('colors') ? params.get('colors').split(',') : [];

      if (url && country) {
        document.getElementById('item-url').value = url;
        document.querySelector(`#country-nav .c-text-s`).innerHTML = country; // Use country-nav instead of country
        document.getElementById('country-nav').dataset.selectedValue = country; // Use country-nav instead of country

        const colorOptions = colors.join(', ');
        document.querySelector(`#colors .c-text-l`).innerHTML = "Colors"; // Display "Colors" instead of the values
        document.getElementById('colors').dataset.selectedValues = colorOptions;

        // Trigger the form submission
        searchForm.dispatchEvent(new Event('submit'));
      }
    } else {
      console.error('Form with ID "search-form" not found.');
    }
}