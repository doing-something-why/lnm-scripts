import { updateSelectedFilters } from './filters.js';

export const currencySymbols = {
    "USD": "$",       // United States Dollar
    "EUR": "€",       // Euro
    "GBP": "£",       // British Pound Sterling
    "ALL": "Lek",     // Albanian Lek
    "AMD": "֏",       // Armenian Dram
    "AUD": "$",       // Australian Dollar
    "AZN": "₼",       // Azerbaijani Manat
    "BHD": ".د.ب",    // Bahraini Dinar
    "BRL": "R$",      // Brazilian Real
    "BGN": "лв",      // Bulgarian Lev
    "CAD": "$",       // Canadian Dollar
    "CNY": "¥",       // Chinese Yuan
    "HRK": "kn",      // Croatian Kuna
    "CZK": "Kč",      // Czech Koruna
    "DKK": "kr",      // Danish Krone
    "EGP": "£",       // Egyptian Pound
    "EEK": "kr",      // Estonian Kroon
    "FIM": "mk",      // Finnish Markka
    "FRF": "₣",       // French Franc
    "DEM": "DM",      // German Mark
    "GIP": "£",       // Gibraltar Pound
    "GRD": "₯",       // Greek Drachma
    "HUF": "Ft",      // Hungarian Forint
    "ISK": "kr",      // Icelandic Króna
    "INR": "₹",       // Indian Rupee
    "IDR": "Rp",      // Indonesian Rupiah
    "IEP": "£",       // Irish Pound
    "ILS": "₪",       // Israeli Shekel
    "ITL": "₤",       // Italian Lira
    "JPY": "¥",       // Japanese Yen
    "JOD": "د.أ",     // Jordanian Dinar
    "KRW": "₩",       // South Korean Won
    "KWD": "د.ك",     // Kuwaiti Dinar
    "LBP": "£",       // Lebanese Pound
    "LUF": "₣",       // Luxembourg Franc
    "MYR": "RM",      // Malaysian Ringgit
    "MXN": "$",       // Mexican Peso
    "NLG": "ƒ",       // Dutch Guilder
    "NZD": "$",       // New Zealand Dollar
    "NOK": "kr",      // Norwegian Krone
    "PKR": "₨",       // Pakistani Rupee
    "PEN": "S/.",     // Peruvian Sol
    "PHP": "₱",       // Philippine Peso
    "PLN": "zł",      // Polish Zloty
    "PTE": "₣",       // Portuguese Escudo
    "QAR": "﷼",      // Qatari Riyal
    "RUB": "₽",       // Russian Ruble
    "SAR": "﷼",      // Saudi Riyal
    "SGD": "$",       // Singapore Dollar
    "ZAR": "R",       // South African Rand
    "ESP": "₧",       // Spanish Peseta
    "SEK": "kr",      // Swedish Krona
    "CHF": "₣",       // Swiss Franc
    "TWD": "NT$",     // Taiwan Dollar
    "THB": "฿",       // Thai Baht
    "TRY": "₺",       // Turkish Lira
    "AED": "د.إ",     // United Arab Emirates Dirham
    "UYU": "$",       // Uruguayan Peso
    "VND": "₫",       // Vietnamese Dong
    "YER": "﷼",      // Yemeni Rial
    "ZMK": "ZK",      // Zambian Kwacha
    "ZWD": "$"        // Zimbabwean Dollar
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