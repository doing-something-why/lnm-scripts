// domUtils.js

export function showElement(element) {
  element.classList.add('show');
}

export function hideElement(element) {
  element.classList.remove('show');
}

export function populateSelect(elementId, options, handleDropdownClick) {
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

export function updateProductCards(data, currencySymbols, productContainer, createProductCardHTML) {
  if (!data || !data.vestiare || !data.vinted || !data.vestiare.items || !data.vinted.items) {
    console.error('Unexpected API response structure:', data);
    return;
  }

  const vestiaireItems = data.vestiare.items;
  const vintedItems = data.vinted.items;
  const items = vestiaireItems.concat(vintedItems);

  console.log('Updating product cards with items:', items);

  productContainer.innerHTML = '';

  items.forEach(item => {
    console.log('Processing item:', item);
    if (!item || (!item.name && !item.title)) {
      console.error('Invalid item structure:', item);
      return;
    }

    const isVestiaire = item.brand && item.brand.name;
    const productCardHTML = createProductCardHTML(item, isVestiaire, currencySymbols);

    const productCardElement = document.createElement('div');
    productCardElement.innerHTML = productCardHTML;
    productContainer.appendChild(productCardElement);
  });

  productContainer.style.display = 'flex';
}

export function showSkeletons(productContainer) {
  if (!productContainer) {
    console.error('Product container is not defined.');
    return;
  }
  const skeletonHTML = `
    <div class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
    </div>
  `;
  productContainer.innerHTML = skeletonHTML.repeat(6); // Show six skeleton cards
}