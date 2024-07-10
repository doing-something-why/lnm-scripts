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
  
  export function showElement(element) {
    console.log('showElement called'); // Add this line
    element.classList.add('show');
  }
  
  export function hideElement(element) {
    console.log('hideElement called'); // Add this line
    element.classList.remove('show');
  }
  
  export function populateSelect(elementId, options) {
    console.log('populateSelect called'); // Add this line
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