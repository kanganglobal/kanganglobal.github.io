// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categorySection = document.querySelectorAll('.category-section');
    
    // Initialize - show all products
    showAllProducts();
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    function filterProducts(category) {
        const allProducts = document.querySelectorAll('.category-section');
        
        if (category === 'all') {
            showAllProducts();
        } else {
            // Hide all sections first
            allProducts.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show only the selected category
            const targetSection = document.querySelector(`[data-category="${category}"]`);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.style.animation = 'fadeInUp 0.5s ease-out';
            }
        }
    }
    
    function showAllProducts() {
        const allSections = document.querySelectorAll('.category-section');
        allSections.forEach(section => {
            section.style.display = 'block';
            section.style.animation = 'fadeInUp 0.5s ease-out';
        });
    }
    
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Learn More button functionality
    const learnMoreButtons = document.querySelectorAll('.product-card .btn-primary');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Create and show product modal
            showProductModal(productCard);
        });
    });
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card .btn-outline');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price')?.textContent || 'Price available on request';
            
            // Add to cart animation
            addToCartAnimation(this, productName, productPrice);
        });
    });
});

// Product modal functionality
function showProductModal(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.product-price')?.textContent || 'Contact for pricing';
    const productDescription = productCard.querySelector('p:not(.product-price)').textContent;
    const productFeatures = Array.from(productCard.querySelectorAll('.product-features li')).map(li => li.textContent);
    const productImage = productCard.querySelector('img').src;
    
    // Create modal HTML
    const modalHTML = `
        <div class="product-modal" id="product-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="modal-info">
                        <h2>${productName}</h2>
                        <p class="modal-price">${productPrice}</p>
                        <p class="modal-description">${productDescription}</p>
                        <h3>Key Features:</h3>
                        <ul class="modal-features">
                            ${productFeatures.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                        <div class="modal-actions">
                            <button class="btn btn-primary modal-cart-btn">Add to Cart</button>
                            <button class="btn btn-secondary modal-contact-btn">Contact Us</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if they don't exist
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .product-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 15px;
                max-width: 800px;
                max-height: 90vh;
                width: 90%;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: slideInUp 0.3s ease-out;
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                z-index: 1;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                padding: 2rem;
            }
            
            .modal-image img {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 10px;
            }
            
            .modal-info h2 {
                color: #333;
                margin-bottom: 1rem;
                font-size: 2rem;
            }
            
            .modal-price {
                font-size: 1.5rem;
                color: #007bff;
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .modal-description {
                color: #666;
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .modal-info h3 {
                color: #333;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .modal-features {
                list-style: none;
                padding: 0;
                margin-bottom: 2rem;
            }
            
            .modal-features li {
                display: flex;
                align-items: center;
                margin-bottom: 0.8rem;
                color: #666;
            }
            
            .modal-features li i {
                color: #28a745;
                margin-right: 1rem;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    padding: 1rem;
                }
                
                .modal-content {
                    width: 95%;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Add event listeners
    const modal = document.getElementById('product-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const cartBtn = modal.querySelector('.modal-cart-btn');
    const contactBtn = modal.querySelector('.modal-contact-btn');
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Modal actions
    cartBtn.addEventListener('click', function() {
        addToCartAnimation(this, productName, productPrice);
        closeModal();
    });
    
    contactBtn.addEventListener('click', function() {
        // Redirect to contact page with product info
        window.location.href = `contact.html?product=${encodeURIComponent(productName)}`;
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Add to cart animation
function addToCartAnimation(button, productName, productPrice) {
    // Change button text and style
    const originalText = button.textContent;
    const originalBg = button.style.backgroundColor;
    
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#28a745';
    button.style.color = 'white';
    button.disabled = true;
    
    // Show notification
    showNotification(`${productName} (${productPrice}) added to cart!`, 'success');
    
    // Reset button after animation
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBg;
        button.style.color = '';
        button.disabled = false;
    }, 2000);
    
    // Update cart count (if cart counter exists)
    updateCartCounter();
}

// Update cart counter
function updateCartCounter() {
    let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    cartCount++;
    localStorage.setItem('cartCount', cartCount.toString());
    
    // Update cart counter in UI if it exists
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.style.animation = 'pulse 0.5s ease-out';
    }
}

// Search functionality for products
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('p:not(.product-price)').textContent.toLowerCase();
                
                if (productName.includes(query) || productDescription.includes(query)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide category sections based on results
            const categorySections = document.querySelectorAll('.category-section');
            categorySections.forEach(section => {
                const visibleCards = section.querySelectorAll('.product-card[style*="block"]');
                if (visibleCards.length === 0) {
                    section.style.display = 'none';
                } else {
                    section.style.display = 'block';
                }
            });
        });
    }
}

// Price filter functionality
function initPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            const maxPrice = parseFloat(this.value);
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const priceElement = card.querySelector('.product-price');
                if (priceElement) {
                    const price = parseFloat(priceElement.textContent.replace(/[$,]/g, ''));
                    
                    if (isNaN(price) || price <= maxPrice) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initProductSearch();
    initPriceFilter();
});