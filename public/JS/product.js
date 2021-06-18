import { idUrl, transformPrice } from './utils.js';

let nameProduct = document.getElementById("name");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorProduct = document.getElementById("colors");
let imageProduct = document.getElementById("image");
 
 export function dynamicRenderProduct(name, price, description, colors, image) {
    nameProduct.innerHTML = name;
    priceProduct.innerHTML = transformPrice(price);
    descriptionProduct.innerHTML = description;
    colorProduct.innerHTML = colors;
    imageProduct = imageProduct.setAttribute("src", image);
}


if (document.URL.includes("productpage.html")) {

    fetch('http://localhost:3000/api/teddies/' + idUrl)
        .then(res => {
            if (res.ok) return res.json()
            throw new Error('Dommage !')
        })
        .then(product => {
            console.log(product);
            dynamicRenderProduct(product.name, product.price, product.description, product.colors, product.imageUrl);  
        })
        .catch(err => console.error(err));
        
}
