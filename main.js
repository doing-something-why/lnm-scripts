document.addEventListener("DOMContentLoaded", function() {
  initFilters();
  initSearchForm();
  initProductDisplay();
  initCountrySelection();
  initNavigationArrows();
});

function initCountrySelection() {
  fetch(`https://ipinfo.io?token=a3e2e26d91aed3`)
    .then(response => response.json())
    .then(data => {
      console.log('Geolocation data:', data);
      const userCountryCode = data.country;
      const countryName = countryCodesToNames[userCountryCode];
      const selectElement = document.getElementById('country-nav'); // Use country-nav instead of country

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
    })
    .catch(error => {
      console.error('Error fetching geolocation data:', error);
      const selectElement = document.getElementById('country-nav'); // Use country-nav instead of country
      selectElement.querySelector('.c-text-l').innerHTML = 'United States';
      selectElement.dataset.selectedValue = 'United States';
    });
}
