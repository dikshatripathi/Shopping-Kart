// Sample product data (you can replace this with actual product data)
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 19.99,
        image: "product1.jpg"
    },
    // Add more products as needed
];

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cartCount');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartCount();


    //button
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });


    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
        const productImage = productCard.querySelector('img').src;
    
        const existingItem = cartItems.find(item => item.name === productName);
    
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
    
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
        updateCart();
    }
    

    function updateCart() {
        const cartItemsElement = document.getElementById("cartItems");
        const cartTotalElement = document.getElementById("cartTotal");
    
        cartItemsElement.innerHTML = ""; // Clear existing cart items
    
        let total = 0;
    
        cartItems.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    
                    <p>Price: ₹${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                    <div class="quantity-selector">
                        <button class="quantity-decrease" data-name="${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase" data-name="${item.name}">+</button>
                    </div>
                    <button class="remove-button" data-name="${item.name}">Remove</button>
                </div>
            `;
            cartItemsElement.appendChild(cartItem);
            if (item.price) {
                total += item.price * item.quantity;
            }
        });
    
        cartTotalElement.textContent = "Total: ₹" + total.toFixed(2);
    
        // Attach event listeners for quantity and remove buttons
        const quantityDecreaseButtons = document.querySelectorAll('.quantity-decrease');
        const quantityIncreaseButtons = document.querySelectorAll('.quantity-increase');
        const removeButtons = document.querySelectorAll('.remove-button');
    
        quantityDecreaseButtons.forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
    
        quantityIncreaseButtons.forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
    
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    
   function decreaseQuantity(event) {
    const productName = event.target.getAttribute('data-name');
    const cartItem = cartItems.find(item => item.name === productName);

    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        updateCart();
        updateCartCount();
        saveCartToLocalStorage();
    }
}
    
function increaseQuantity(event) {
    const productName = event.target.getAttribute('data-name');
    const cartItem = cartItems.find(item => item.name === productName);

    if (cartItem) {
        cartItem.quantity++;
        updateCart();
        updateCartCount();
        saveCartToLocalStorage();
    }
}
    
function removeFromCart(event) {
    const productName = event.target.getAttribute('data-name');
    const cartItemIndex = cartItems.findIndex(item => item.name === productName);

    if (cartItemIndex !== -1) {
        cartItems.splice(cartItemIndex, 1);
        updateCart();
        updateCartCount();
        saveCartToLocalStorage();
    }
}
    
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    
    // Attach event listener for "Proceed to Checkout" button
    const checkoutButton = document.getElementById('checkoutBtn');
    checkoutButton.addEventListener('click', () => {
        // Add your logic for proceeding to checkout
    });
    // Update the cart display
    updateCart();
    
    function updateCartCount() {
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }

    updateCartCount();
});
