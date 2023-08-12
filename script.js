
document.addEventListener('DOMContentLoaded', function () {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cartCount');
    const productsPerPage = 6; // Number of products per page
    let currentPage = 1;


    //for button
   // Add this script in your script.js file


    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });






    // Initialize cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Apply filters functionality
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Search functionality
    searchBtn.addEventListener('click', performSearch);

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Pagination logic
    const totalProducts = document.querySelectorAll(".product-card").length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Function to update cart count
    function updateCartCount() {
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }

    // ... (rest of the addToCart function)

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
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
        updateCartCount(); // Call the updateCartCount function here
    }

    // ... (rest of the applyFilters function)




    // Existing code

    // Filter products based on selected options
    function applyFilters() {
        const checkedFilters = document.querySelectorAll('.filter-checkbox:checked');
        const selectedPriceRange = document.querySelector('.filter-radio:checked[data-filter="price"]');

        // Apply color filter
        const selectedColors = Array.from(checkedFilters)
            .filter(filter => filter.getAttribute('data-filter') === 'color')
            .map(filter => filter.getAttribute('data-value'));

        // Apply review filter
        const selectedReviews = Array.from(checkedFilters)
            .filter(filter => filter.getAttribute('data-filter') === 'review')
            .map(filter => parseInt(filter.getAttribute('data-value')));

        // Apply occasion filter
        const selectedOccasions = Array.from(checkedFilters)
            .filter(filter => filter.getAttribute('data-filter') === 'occasion')
            .map(filter => filter.getAttribute('data-value'));

        // Apply price range filter
        let minPrice = 0;
        let maxPrice = Number.MAX_SAFE_INTEGER;

        if (selectedPriceRange) {
            const priceRange = selectedPriceRange.getAttribute('data-value').split('-');
            minPrice = parseInt(priceRange[0].replace('₹', '').replace(/,/g, ''));
            maxPrice = parseInt(priceRange[1].replace('₹', '').replace(/,/g, ''));
        }

        // Filter and display products
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const priceElement = product.querySelector('.price');
            const priceText = priceElement ? priceElement.textContent : '₹0';
            const price = parseInt(priceText.replace('₹', '').replace(/,/g, ''));

            const reviewElement = product.querySelector('.review');
            const review = reviewElement ? parseInt(reviewElement.textContent) : 0;

            const color = product.getAttribute('data-color');
            const occasion = product.getAttribute('data-occasion');

            const shouldShow =
                (selectedColors.length === 0 || selectedColors.includes(color)) &&
                (selectedReviews.length === 0 || selectedReviews.includes(review)) &&
                (selectedOccasions.length === 0 || selectedOccasions.includes(occasion)) &&
                price >= minPrice && price <= maxPrice;

            product.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Event listener for "Apply Filters" button
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);






    // ... (rest of the performSearch function)

    searchBtn.addEventListener('click', performSearch);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h2').textContent.toLowerCase();

            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }



    // ... (rest of the decreaseQuantity, increaseQuantity, removeFromCart functions)


    const updatePageButtons = () => {
        const pageButtons = document.querySelectorAll(".page-btn");

        pageButtons.forEach(button => {
            button.classList.remove("active");
        });

        document.getElementById(`page${currentPage}`).classList.add("active");
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePageButtons();
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageButtons();
        }
    });

    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page${i}`).addEventListener("click", () => {
            currentPage = i;
            updatePageButtons();
        });
    }






});






































