// ================= PRODUCTS =================

const products = [
    {
        id: 1,
        name: "Generic Smart phone | 4GB RAM | ",
        price: 5999,
        image:
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    },

    {
        id: 2,
        name: "Pepsi 500ml|Energy drink",
        price:39,
        image:
            "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },

    {
        id: 3,
        name: "Wireless Bluetooth Headphones | Noise Cancellation | Long Battery Life",
        price: 1999 ,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },

    {
        id: 4,
        name: "Smart Watch | Fitness Tracker | Heart Rate Monitor | Waterproof",
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },

    {
        id: 5,
        name: "Laptop Computer | 8GB RAM | 512GB SSD | Full HD Display",
        price: 42999,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    },

    {
        id: 6,
        name: "Gaming Mouse | RGB Lighting | High Precision Sensor",
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    },
];


// CART 

let cart = JSON.parse(localStorage.getItem("shopingCart")) || [];


// ================= DISPLAY PRODUCTS =================

function displayProducts(productList = products) {

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    productList.forEach((product) => {

        container.innerHTML += `
            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

                <div class="product-info">

                    <p class="sponsored">
                        Featured Product
                    </p>

                    <h2 class="product-name">
                        ${product.name}
                    </h2>

                    <div class="rating">
                        ★★★★☆
                        <span>
                            (25)
                        </span>
                    </div>

                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <p class="delivery">
                        FREE delivery
                    </p>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        class="buy-now"
                        onclick="buyNow(${product.id})"
                    >
                        Buy Now 
                    </button>

                </div>

            </div>
        `;
    });
}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product =
        products.find((item) => item.id === productId);

    if (!product) return;

    const existingProduct =
        cart.find((item) => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1,
        });
    }

    saveCart();
    updateCart();
    openCart();
}


// ================= REMOVE PRODUCT =================

function removeFromCart(productId) {

    cart =
        cart.filter((item) => item.id !== productId);

    saveCart();
    updateCart();
}


// ================= INCREASE QUANTITY =================

function increaseQuantity(productId) {

    const product =
        cart.find((item) => item.id === productId);

    if (!product) return;

    product.quantity++;

    saveCart();
    updateCart();
}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(productId) {

    const product =
        cart.find((item) => item.id === productId);

    if (!product) return;

    product.quantity--;

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    saveCart();
    updateCart();
}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "shopingCart",
        JSON.stringify(cart)
    );
}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const totalPrice =
        document.getElementById("totalPrice");

    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>
                    🛒
                </h2>

                <p>
                    Your cart is empty.
                </p>

            </div>
        `;

        cartCount.innerText = "0";

        totalPrice.innerText = "₹0";

        return;
    }


    let totalItems = 0;
    let total = 0;


    // DISPLAY CART ITEMS

    cart.forEach((item) => {

        totalItems += item.quantity;

        total +=
            item.price * item.quantity;


        cartItems.innerHTML += `
            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div class="cart-item-info">

                    <h3 class="cart-item-name">
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${item.id})"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="increaseQuantity(${item.id})"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="delete-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            </div>
        `;
    });


    // UPDATE CART COUNT

    cartCount.innerText =
        totalItems;


    // UPDATE TOTAL

    totalPrice.innerText =
        "₹" + total.toLocaleString("en-IN");
}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// ================= BUY NOW =================

function buyNow(productId) {

    const product =
        products.find((item) => item.id === productId);

    if (!product) return;

    const newTab =
        window.open("", "_blank");

    newTab.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Order Confirmation
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {

                    margin: 0;

                    font-family: Arial;

                    background: #eaeded;

                    display: flex;

                    justify-content: center;

                    align-items: center;

                    min-height: 100vh;
                }

                .order-box {

                    background: white;

                    width: 500px;

                    max-width: 90%;

                    padding: 40px;

                    border-radius: 10px;

                    text-align: center;

                    box-shadow:
                        0 4px 20px
                        rgba(0,0,0,0.15);
                }

                .success {

                    font-size: 65px;

                    margin-bottom: 15px;
                }

                h1 {

                    color: #067d62;
                }

                .product {

                    background: #f7f7f7;

                    padding: 20px;

                    margin: 25px 0;

                    text-align: left;

                    border-radius: 8px;
                }

                .price {

                    font-size: 25px;

                    font-weight: bold;
                }

                button {

                    background: #ffd814;

                    border: none;

                    padding: 12px 30px;

                    border-radius: 25px;

                    cursor: pointer;

                    font-weight: bold;
                }

            </style>

        </head>


        <body>

            <div class="order-box">

                <div class="success">
                    🎉
                </div>

                <h1>
                    Order placed successfully!
                </h1>

                <p>
                    Thank you for shopping with us.
                </p>

                <div class="product">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                </div>

                <button onclick="window.close()">
                    Continue Shopping
                </button>

            </div>

        </body>

        </html>

    `);

    newTab.document.close();
}


// ================= SEARCH =================

function searchProducts() {

    const input =
        document.querySelector(".search-input");

    const searchText =
        input.value.trim();


    // EMPTY SEARCH

    if (searchText === "") {

        const newTab =
            window.open("", "_blank");

        newTab.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    Shoping Search
                </title>

                <style>

                    body {

                        font-family: Arial;

                        background: #eaeded;

                        display: flex;

                        justify-content: center;

                        align-items: center;

                        height: 100vh;
                    }

                    .box {

                        background: white;

                        padding: 40px;

                        border-radius: 10px;

                        text-align: center;

                        box-shadow:
                            0 3px 15px
                            rgba(0,0,0,0.2);
                    }

                    button {

                        background: #ffd814;

                        border: none;

                        padding: 12px 30px;

                        border-radius: 20px;

                        cursor: pointer;
                    }

                </style>

            </head>


            <body>

                <div class="box">

                    <h1>
                        🔍 Search Shoping
                    </h1>

                    <p>
                        Please enter something to search.
                    </p>

                    <button onclick="window.close()">
                        Close
                    </button>

                </div>

            </body>

            </html>

        `);

        newTab.document.close();

        return;
    }


    // FIND PRODUCTS

    const results =
        products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(
                    searchText.toLowerCase()
                )
        );


    // DISPLAY RESULTS

    displayProducts(results);
}


// ================= SEARCH ICON =================

document
    .querySelector(".search-icon")
    .addEventListener(
        "click",
        searchProducts
    );


// ================= ENTER KEY SEARCH =================

document
    .querySelector(".search-input")
    .addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );


// ================= SCROLL TO PRODUCTS =================

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth",
        });
}


// ================= BACK TO TOP =================

function backToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth",

    });
}


// ================= INITIAL LOAD =================

displayProducts();

updateCart();