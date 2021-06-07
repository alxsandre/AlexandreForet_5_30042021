import './cart.js';

const anchorProduct = document.querySelector('article');

//get list of product and parse it to become an array
let listProduct = localStorage.getItem("listProduct");
listProduct = JSON.parse(listProduct);

//counts number of products for each
var counts = [];
listProduct.forEach( x => { counts[x] = (counts[x] || 0)+1; });

//get products id
let productsId = Object.keys(counts); 

//Put products Id in the URL to get data
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
                                                    <span class="checkout__price">${product.price}</span>
                                                    <div class="checkout__colors">${product.colors}</div>
                                                    <span>Quantité : ${counts[productsId[i]]}</span>
                                                </div>
                                            </article>`;
                
            })
            .catch(err => console.error(err));    
    }
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
            console.log(contact)
            let valid = true;
            for(let input of document.querySelectorAll("form input")) {
                valid &= input.reportValidity()
                if(!valid) break
            }
            if (valid) {
                fetch('http://localhost:3000/api/teddies/order', {
                    method: 'post',
                    body: contact
                })
                .then(res => res.text())
                .then(text => console.log(text))
                .catch(err => console.error(err))
            }
        })
}
