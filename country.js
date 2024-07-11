import { countryCodesToNames } from './utils.js'; // Ensure utils.js is correctly imported

export function initCountrySelection() {
    fetch(`https://ipinfo.io?token=a3e2e26d91aed3`)
      .then(response => response.json())
      .then(data => {
        console.log('Geolocation data:', data);
        const userCountryCode = data.country;
        const countryName = countryCodesToNames[userCountryCode];
        const selectElement = document.getElementById('country-nav'); // Use country-nav instead of country
        const selectedCountry = document.getElementById('selected-country')

        if (selectElement) {
          const options = Array.from(selectElement.querySelectorAll('.dropdown-item'));
          const matchingOption = options.find(opt => opt.dataset.value === countryName);
  
          if (matchingOption) {
            selectedCountry.innerText = countryName;
            selectElement.dataset.selectedValue = countryName;
          } else {
            selectedCountry.innerText = 'United States';
            selectElement.dataset.selectedValue = 'United States';
          }
        }
      })
      .catch(error => {
        console.error('Error fetching geolocation data:', error);
        const selectElement = document.getElementById('country-nav'); // Use country-nav instead of country
        selectedCountry.innerText = 'United States';
        selectElement.dataset.selectedValue = 'United States';
      });
}

