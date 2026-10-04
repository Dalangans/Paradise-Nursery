// Sample Plant Data
const plants = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        price: 35.99,
        image: "/images/monstera-deliciosa.jpg",
        description: "A stunning tropical plant with split leaves",
        shortDesc: "Tropical vine with split leaves"
    },
    {
        id: 2,
        name: "Snake Plant",
        price: 24.99,
        image: "/images/snake-plant.jpg",
        description: "Low maintenance air purifying plant",
        shortDesc: "Air purifying indoor plant"
    },
    {
        id: 3,
        name: "Pothos",
        price: 19.99,
        image: "/images/pothos.jpg",
        description: "Trailing vine perfect for hanging baskets",
        shortDesc: "Trailing vine plant"
    },
    {
        id: 4,
        name: "Spider Plant",
        price: 22.99,
        image: "/images/spider-plant.jpg",
        description: "Easy to grow plant with variegated leaves",
        shortDesc: "Variegated foliage plant"
    },
    {
        id: 5,
        name: "Fiddle Leaf Fig",
        price: 45.99,
        image: "/images/fiddle-leaf-fig.jpg",
        description: "Large statement plant with big leaves",
        shortDesc: "Large statement indoor plant"
    },
    {
        id: 6,
        name: "Peace Lily",
        price: 28.99,
        image: "/images/peace-lily.jpg",
        description: "Beautiful flowering plant, air purifying",
        shortDesc: "Flowering air purifier"
    },
    {
        id: 7,
        name: "Rubber Plant",
        price: 32.99,
        image: "/images/rubber-plant.jpg",
        description: "Dark glossy leaves, grows tall",
        shortDesc: "Tall plant with glossy leaves"
    },
    {
        id: 8,
        name: "Philodendron",
        price: 29.99,
        image: "/images/philodendron.jpg",
        description: "Heart-shaped leaves, easy to grow",
        shortDesc: "Heart-shaped foliage"
    }
];

// Shopping Cart Array
let cart = [];
let currentProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    document.getElementById('closeProductBtn').addEventListener('click', closeProductDetails);
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cartModal');
        const productModal = document.getElementById('productModal');

        if (e.target === cartModal) closeCart();
        if (e.target === productModal) closeProductDetails();
    });
}

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    plants.forEach(plant => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="product-image">
            <div class="product-card-body">
                <div class="product-name">${plant.name}</div>
                <div class="product-price">$${plant.price}</div>
                <div class="product-short-desc">${plant.shortDesc}</div>
                <button class="view-details-btn" onclick="openProductDetails(${plant.id})">
                    View Details
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Open Product Details Modal
function openProductDetails(productId) {
    currentProduct = plants.find(p => p.id === productId);
    if (!currentProduct) return;

    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productImage').src = currentProduct.image;
    document.getElementById('productPrice').textContent = currentProduct.price;
    document.getElementById('productDesc').textContent = currentProduct.description;
    document.getElementById('quantityInput').value = 1;

    document.getElementById('productModal').classList.remove('hidden');
}

// Close Product Details Modal
function closeProductDetails() {
    document.getElementById('productModal').classList.add('hidden');
    currentProduct = null;
}

// Add to Cart
function addToCart() {
    if (!currentProduct) return;

    const quantity = parseInt(document.getElementById('quantityInput').value);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    closeProductDetails();

    // Show confirmation
    alert(`${currentProduct.name} added to cart!`);
}

// Open Cart Modal
function openCart() {
    displayCartItems();
    document.getElementById('cartModal').classList.remove('hidden');
}

// Close Cart Modal
function closeCart() {
    document.getElementById('cartModal').classList.add('hidden');
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                <div class="qty-display">${item.quantity}</div>
                <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Increase Quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        displayCartItems();
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        displayCartItems();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems();
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\n\nYour order has been placed.`);

    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
    loadProducts();
}

// LocalStorage Functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}
