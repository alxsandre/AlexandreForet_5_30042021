import { idUrl } from './utils.js';

const numberBasket = document.querySelector('.basket__number');

//Call when click we click on the button to add a product into the cart
if (document.URL.includes("productpage.html")) {
    const ctaAddArticle = document.querySelector('.productpage__calltoaction');
    
    ctaAddArticle.addEventListener('click', function () {
    addProduct(idUrl);
    });
}

//initialize the cart on Front
if(getBasket().length === 0) {
    numberBasket.innerHTML = '';
} else {
    numberBasket.innerHTML = getBasket().length;
}

//function to add the id product into the local storage
function addProduct(product) {
    let listProduct = getBasket();
    listProduct.push(product);
    saveBasket(listProduct);
    numberBasket.innerHTML = listProduct.length; //update the cart
}

function getBasket() {
    let listProduct = localStorage.getItem("listProduct");
    if (listProduct == null) {
        return [];
    } else {
        return JSON.parse(listProduct);
    }
}

function saveBasket(listProduct) {
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
}