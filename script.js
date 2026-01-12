 
//============To fetch All Data ========================
fetchData();
function fetchData() {

    fetch('https://fakestoreapi.com/products/')
        .then(response => response.json()) // convert to JS object
        .then(data => {
            displayProducts(data);
            // console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

//======================= Filter Functionality ============================
let fetchedData = [];
function filter(filterDta) {
    fetch("https://fakestoreapi.com/products/category/" + filterDta)
        .then(response => response.json()) // convert to JS object
        .then(data => {
            fetchedData = data;
            displayProducts(data);
            // console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

//==================== Display the Carts ====================================
const newArray = [];
const cartItemsArray = [];
function displayProducts(productsData) {
    let cart = document.getElementById("products");
     cart.innerHTML = "";

    productsData.forEach(element => {
        newArray.push(element);
        cart.innerHTML += `
<div class="border border-stone-300 p-3  rounded-base shadow rounded-xl my-3 w-90">
    <a href="#" class=" flex justify-center image-cover">
        <img class="w-64 h-50 object-fill" src="${element.image}" alt="product1" />
    </a>
     
    <div class=" text-center">  
        <a href="#">
            <h5 class="mt-3 mb-6 text-xl font-semibold tracking-tight text-heading truncate">${element.title}</h5>
        </a>
         <p class="line-clamp-3 text-sm text-stone-500">${element.description}</p>
         <hr class="text-stone-400 my-3">
         <p class="line-clamp-3 text-sm font-semibold">$${element.price}</p>
         <hr class="text-stone-400 my-3">
         <div flex justify-center>
         <button class="bg-black text-white py-2 px-2 rounded">Details</button>
         <button onclick=addToCart(${element.id}) class="bg-black text-white py-2 px-2 rounded cursor-pointer">Add to Cart</button>
         </div>

    </div>
</div>  `;
    });

    console.log("The new Array Values: ");
    console.log(newArray)
}

// =========================== Add to Cart Functionality =========================
 
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const product = newArray.find(item => item.id === id);
    if (!product) return;

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    updateCartCount();
}


// ==================== show added-Carts ==============================
 
document.addEventListener("DOMContentLoaded", showAddedProducts);
const items= document.getElementById("cart-count");

function showAddedProducts() {
    const table = document.getElementById("added-products");
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    table.innerHTML = `
        <tr class="bg-stone-100 border">
            <th>Item List</th>
            <th></th>
            <th></th>
        </tr>
    `;

    let totalBill = 0;
    let totalQty = 0;

    if (cart.length === 0) {
        table.innerHTML += `
            <tr>
                <td colspan="3" class="text-center py-4">Cart is empty</td>
            </tr>
        `;
        updateSummary(0, 0);
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalBill += itemTotal;
        totalQty += item.quantity;
        
        table.innerHTML += `
            <tr class="border">
                <td><img class="w-32 h-32 p-2" src="${item.image}" /></td>
                <td class="font-bold">${item.title}</td>
                <td class="text-center font-bold">
                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span class="px-2">${item.quantity}</span>
                    <button onclick="increaseQty(${item.id})">+</button>
                    <br>
                    ${item.quantity} × $${item.price}
                    <br>
                    $${itemTotal.toFixed(2)}
                </td>
            </tr>
        `;
        
    });
    document.getElementById("cart-count").innerText=`${totalQty}`
    updateSummary(totalBill, totalQty);
}



//========================= quantity Controls==================
function increaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    cart = cart.map(item => {
        if (item.id === id) {
            item.quantity += 1;
        }
        return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(cart));
    showAddedProducts();
}


// ================== Decrease Qauntity ======================
function decreaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    cart = cart.filter(item => {
        if (item.id === id) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                return true;
            }
            // quantity === 1  remove item
            return false;
        }
        return true;
    });

    localStorage.setItem("cartItems", JSON.stringify(cart));
    showAddedProducts();
    updateCartCount();
}


// ================= Order Summery =================

function updateSummary(subtotal, totalQty) {
    const shippingCost = 30;

    document.getElementById("cartProducts").innerText = `Products (${totalQty})`;
    document.getElementById("totalBill").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("shopping").innerText = `$${shippingCost}`;
    document.getElementById("totalAmount").innerText =
        `$${(subtotal + shippingCost).toFixed(2)}`;
}

  