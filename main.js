
const container = document.getElementById('product-container');
const loader = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');


const API_URL = 'https://api.escuelajs.co/api/v1/products?limit=10';


loader.style.display = 'block';
container.innerHTML = ''; 

axios.get(API_URL)
  .then(response => {
    const products = response.data;
    loader.style.display = 'none';

    
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imageUrl = product.images?.[0] || 'https://via.placeholder.com/200x200?text=No+Image';
      const categoryName = product.category?.name || 'Uncategorized';

    
      card.innerHTML = `
        <img src="${imageUrl}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/200x200?text=Image+Error';">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p class="category">${categoryName}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    loader.style.display = 'none';
    errorMessage.textContent = 'Failed to load products. Please try again later.';
    console.error('Fetch error details:', error);
  });
