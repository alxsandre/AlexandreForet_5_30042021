import { idUrl } from './utils.js';

const numberCart = document.querySelector('.cart__number');

//Call when click we click on the button to add a product into the cart
if (document.URL.includes("productpage.html")) {
    const ctaAddArticle = document.querySelector('.productpage__calltoaction');
    
    ctaAddArticle.addEventListener('click', function () {
    addProduct(idUrl);
    });
}

//initialize the cart on Front
if(getCart().length === 0) {
    numberCart.innerHTML = '';
} else {
    numberCart.innerHTML = getCart().length;
}

/**
 * function to add the id product into the local storage
 * @param {string} product - Id product from URL of the page
 */
function addProduct(product) {
    let listProduct = getCart();
    listProduct.push(product);
    saveCart(listProduct);
    numberCart.innerHTML = listProduct.length; //update the cart
}

/**
 * Get empty array or id (products) list from the current local storage
 * @returns [] || {}
 */
function getCart() {
    let listProduct = localStorage.getItem("listProduct");
    if (listProduct == null) {
        return [];
    } else {
        return JSON.parse(listProduct);
    }
}

/**
 * Add the array with the new id product to the local storage
 * @param {object} listProduct 
 */
function saveCart(listProduct) {
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
}