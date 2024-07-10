import { updateSelectedFilters } from './filters.js';

export const currencySymbols = {
    // Currency symbols mapping
  };
  
  export const countryCodesToNames = {
    "FR": "France",
    "AL": "Albania",
    "AM": "Armenia",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BH": "Bahrain",
    "BE": "Belgium",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "CA": "Canada",
    "CN": "China",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EG": "Egypt",
    "EE": "Estonia",
    "FI": "Finland",
    "DE": "Germany",
    "GR": "Greece",
    "GP": "Guadeloupe",
    "GT": "Guatemala",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JP": "Japan",
    "JE": "Jersey",
    "KE": "Kenya",
    "KW": "Kuwait",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macau",
    "MY": "Malaysia",
    "MT": "Malta",
    "MQ": "Martinique",
    "MX": "Mexico",
    "MC": "Monaco",
    "NL": "Netherlands",
    "NZ": "New Zealand",
    "NO": "Norway",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "SM": "San Marino",
    "SA": "Saudi Arabia",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "ES": "Spain",
    "MF": "St Martin",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TW": "Taiwan",
    "TH": "Thailand",
    "IC": "The Canary Islands",
    "TN": "Tunisia",
    "TR": "Turkey",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "VA": "Vatican City State"
  };
  
  
  export const countries = [
    "France", "Albania", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahrain", "Belgium", "Brazil", "Bulgaria", "Canada", "China", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Egypt", "Estonia", "Finland",
    "Germany", "Greece", "Guadeloupe", "Guatemala", "Hong Kong", "Hungary",
    "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jersey", "Kenya",
    "Kuwait", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg",
    "Macau", "Malaysia", "Malta", "Martinique", "Mexico", "Monaco",
    "Netherlands", "New Zealand", "Norway", "Philippines", "Poland",
    "Portugal", "Qatar", "Reunion", "Romania", "San Marino", "Saudi Arabia",
    "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea",
    "Spain", "St Martin", "Sweden", "Switzerland", "Taiwan", "Thailand",
    "The Canary Islands", "Tunisia", "Turkey", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Vatican City State"
  ];

  export const colors = [
    "Beige", "Black", "Blue", "Brown", "Burgundy", "Khaki", "Grey", "Cream",
    "Gold", "Green", "Silver", "Multi", "Navy", "Orange", "Pink", "Purple",
    "Red", "Turquoise", "White", "Yellow", "Light blue", "Rose", "Dark green",
    "Coral", "Mustard", "Lilac", "Mint", "Apricot"
  ];

  export function showElement(element) {
    console.log('showElement called'); // Add this line
    element.classList.add('show');
  }
  
  export function hideElement(element) {
    console.log('hideElement called'); // Add this line
    element.classList.remove('show');
  }
  
  export function handleDropdownClick(event) {
    const dropdownItem = event.target;
    const dropdown = dropdownItem.closest('.dropdown');
    const value = dropdownItem.dataset.value;
    let currentValues = dropdown.dataset.selectedValues ? dropdown.dataset.selectedValues.split(',') : [];
    const filterName = dropdown.closest('.filter-button').querySelector('.c-text-l').textContent;

    if (dropdown.id === 'colors') {
        if (currentValues.includes(value)) {
            currentValues = currentValues.filter(val => val !== value);
        } else {
            currentValues.push(value);
        }
        dropdown.dataset.selectedValues = currentValues.join(',');
    } else {
        dropdown.dataset.selectedValue = value;
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
    } else {
        console.error(`Dropdown content for element ID "${elementId}" not found.`);
    }
}