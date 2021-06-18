import './cart.js';
import { transformPrice } from './utils.js'

const anchorProduct = document.querySelector('section');
const mainCheckout = document.querySelector('.checkout');
const anchorTotalPrice = document.querySelector('.checkout__totalprice');
let totalPriceProduct = [];
let totalPrice;

//get list of product and parse it to become an array
let listProduct = localStorage.getItem("listProduct");
listProduct = JSON.parse(listProduct);

//counts number of products for each
var counts = [];
if(listProduct) {
    listProduct.forEach( x => { counts[x] = (counts[x] || 0)+1; });
}

//get products id
let productsId = Object.keys(counts);

//Put products Id in the URL API to get data
for (let i = 0; i < productsId.length; i++) {
    if (document.URL.includes("checkout.html")) {
        fetch('http://localhost:3000/api/teddies/' + productsId[i])
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('Dommage !')
            })
            .then(product => {
                anchorProduct.innerHTML += `<article class="containernospace">
                                                <div class="img__container">
                                                    <img src="${product.imageUrl}" alt="${product.description}">
                                                </div>
                                                <div class="checkout__container">
                                                    <h2>${product.name}</h2>
                                                    <span class="checkout__price">${transformPrice(product.price)}</span>
                                                    <div class="checkout__colors">${product.colors}</div>
                                                    <span>Quantité : ${counts[productsId[i]]}</span>
                                                </div>
                                            </article>`;
                totalPriceProduct.push(parseInt(transformPrice(product.price)) * counts[productsId[i]])
                if (totalPriceProduct.length === Object.values(counts).length) {
                    const reducer = (accumulator, currentValue) => accumulator + currentValue; 
                    totalPrice = totalPriceProduct.reduce(reducer);
                    totalPrice = transformPrice(totalPrice * 100);
                    anchorTotalPrice.innerHTML = totalPrice;
                }
            })
            .catch(err => console.error(err));    
    }
}

//Set confirmation when all informations are post to server
function confirmation(firstName, lastName, orderId) {
    mainCheckout.removeChild(mainCheckout.firstChild);
    mainCheckout.innerHTML = `<h1>Merci ${firstName} ${lastName}, votre commande a bien été enregistrée !</h1>
                              <ul>
                                <li>Numéro de commande : ${orderId}</li>
                                <li>Prix total : ${totalPrice} </li>
                              </ul>
                              `;
                              
    
}

if (document.URL.includes("checkout.html")) {
    document.querySelector('.form')
        .addEventListener("submit",function(e) {
            e.preventDefault();
            console.log(this)
            let formData;
            formData = new FormData(this);
            let contact = {};
            formData.forEach(function(value, key){
                contact[key] = value;
            });
            let valid = true;
            for(let input of document.querySelectorAll("form input")) {
                valid &= input.reportValidity()
                if(!valid) break
            }
            let products = Object.values(listProduct);
            localStorage.clear();
            const numberBasket = document.querySelector('.basket__number');
            numberBasket.innerHTML = '';
            if (valid) {
                fetch('http://localhost:3000/api/teddies/order', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({contact, products})
                })
                .then(res => res.text())
                .then(informations => { 
                    let clientInformations = JSON.parse(informations);
                    confirmation(clientInformations.contact.firstName, clientInformations.contact.lastName, clientInformations.orderId);
                })
                .catch(err => console.error(err))
            }
        })
}
