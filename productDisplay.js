import { showElement, hideElement, currencySymbols } from './utils.js';

console.log('productDisplay.js loaded'); // Add this line


export function initProductDisplay() {
    console.log('initProductDisplay called'); // Add this line
    const productContainer = document.getElementById('cards-container-2');

    // Add event listeners for the navigation arrows
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    leftArrow.addEventListener('click', () => {
      productContainer.scrollLeft -= productContainer.offsetWidth;
    });

    rightArrow.addEventListener('click', () => {
      productContainer.scrollLeft += productContainer.offsetWidth;
    });

    // Check if arrows should be visible
    function checkArrowsVisibility() {
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

    function CopyLinkSearch() {
        const copyLinkSearch = document.getElementById('copy-link-search');
        if (copyLinkSearch) {
          copyLinkSearch.addEventListener('click', function() {
            // Get form values
            const itemUrl = document.getElementById('item-url').value;
            const country = document.getElementById('country-nav').dataset.selectedValue;
            const colors = document.getElementById('colors').dataset.selectedValues ? document.getElementById('colors').dataset.selectedValues.split(',') : [];
      
            // Generate the search link with parameters
            const params = new URLSearchParams({
              search_str: itemUrl,
              country: country,
              colors: colors.join(',')
            });
      
            const searchLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      
            // Copy the generated link to clipboard
            navigator.clipboard.writeText(searchLink).then(() => {
              // Change the text to "Link copied!"
              copyLinkSearch.innerText = "Link copied!";
              // Optionally, reset the text back after a delay
              setTimeout(() => {
                copyLinkSearch.innerText = "Copy search link";
              }, 2000); // Change back after 2 seconds
            }).catch(err => {
              console.error('Failed to copy the text: ', err);
            });
          });
        }
      }
      
      // Call this function when you want to initialize the event listener

    productContainer.addEventListener('scroll', checkArrowsVisibility);
    window.addEventListener('resize', checkArrowsVisibility);

    // Initial check
    checkArrowsVisibility();
    CopyLinkSearch();
}

export function showSkeletons(productContainer) {
    console.log('showSkeletons called'); // Add this line
    const skeletonHTML = `
      <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
    `;
    productContainer.innerHTML = skeletonHTML.repeat(6); // Show six skeleton cards
}

export function updateProductCards(data, productContainer, resultsTitleLoading, resultsTitleFound, searchForm) {
    if (!data || !data.vestiare || !data.vinted || !data.vestiare.items || !data.vinted.items) {
      console.error('Unexpected API response structure:', data);
      return;
    }

    const vestiaireItems = data.vestiare.items; // Take top 3 items from Vestiaire
    const vintedItems = data.vinted.items; // Take top 3 items from Vinted
    const items = vestiaireItems.concat(vintedItems); // Combine both sets of items

    console.log('Updating product cards with items:', items);

    // Clear existing products and skeletons
    productContainer.innerHTML = '';

    // Update with new products
    items.forEach(item => {
      console.log('Processing item:', item);
      if (!item || (!item.name && !item.title)) {
        console.error('Invalid item structure:', item);
        return;
      }

      const isVestiaire = item.brand && item.brand.name;
      const productCardHTML = createProductCardHTML(item, isVestiaire);

      const productCardElement = document.createElement('div');
      productCardElement.innerHTML = productCardHTML;
      productContainer.appendChild(productCardElement);
    });

    // Make sure the product container is visible
    productContainer.style.display = 'flex';

    hideElement(resultsTitleLoading);
    showElement(resultsTitleFound);
    searchForm.style.display = 'block';
}

function createProductCardHTML(item, isVestiaire) {
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