const productsContainer = document.querySelector('#products');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');

let currentPage = 1; 
const productsPerPage = 10;  

function fetchProducts(page) {
    fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`)
        .then(response => response.json())
        .then(data => {
            productsContainer.innerHTML = '';

            data.products.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('product');
                div.innerHTML = `
                    <div class="card">
                        <img src="${product.thumbnail}" alt="${product.title}" style="width:100%">
                        <h1>${product.title}</h1>
                        <p class="price">${product.price}</p>
                        <p>${product.description.slice(0, 30)}...</p>
                        <p><button>Add to Cart</button></p>
                    </div>
                `;
                productsContainer.appendChild(div);
            });

            prevButton.disabled = page === 1;  
            nextButton.disabled = data.products.length < productsPerPage;  
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

nextButton.addEventListener('click', () => {
    currentPage++;  
    fetchProducts(currentPage);
});

prevButton.addEventListener('click', () => {
    currentPage--;  
    fetchProducts(currentPage);
});

fetchProducts(currentPage);
