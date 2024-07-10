// api.js

import { countryCodesToNames } from './config.js';

export async function fetchGeolocationData() {
  try {
    const response = await fetch('https://ipinfo.io?token=a3e2e26d91aed3');
    const data = await response.json();
    console.log('Geolocation data:', data);

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
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    const selectElement = document.getElementById('country-nav');
    if (selectElement) {
      selectElement.querySelector('.c-text-s').innerHTML = 'United States';
      selectElement.dataset.selectedValue = 'United States';
    }
  }
}
  
  export async function fetchSearchResults(requestBody) {
    try {
      const response = await fetch('https://findresale.onrender.com/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  