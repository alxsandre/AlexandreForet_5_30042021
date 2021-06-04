import { idUrl } from './utils.js';

//add article in the basket
const numberBasket = document.querySelector('.basket__number')
let number = 0;


//Call when click on the call to action
if (document.URL.includes("productpage.html")) {
    const ctaAddArticle = document.querySelector('.productpage__calltoaction');
    
    ctaAddArticle.addEventListener('click', function () {
    addProductCart(idUrl)
    });
}

function addProductCart(idUrl) {
    addNumberBasket();
    addProduct(idUrl);
 }

 //function to update the basket's number
function addNumberBasket() {
    number = Number(localStorage.getItem("numberInBasket"));
    ++number;
    localStorage.setItem("numberInBasket", number);
    numberBasket.innerHTML = localStorage.getItem("numberInBasket");
}

if (localStorage.getItem("numberInBasket")) {
    numberBasket.innerHTML = localStorage.getItem("numberInBasket");
}


//function to add the id product into the local storage
function addProduct(product) {
    let listProduct = getBasket();
    listProduct.push(product);
    saveBasket(listProduct);
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