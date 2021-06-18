import './cart.js';
import { transformPrice } from './utils.js'

//Function to display all products on the home page
function createThumbnail(productInfos) {
    const main = document.querySelector('.main__accueil');

    //create thumnbail
    const section = document.createElement('section');
    main.appendChild(section);
    const thumnbailStyle = document.createAttribute('class');
    thumnbailStyle.value = "thumnbail";
    section.setAttributeNode(thumnbailStyle);
    
    //create link thumnbail
    const link = document.createElement('a');
    section.appendChild(link);
    const href = document.createAttribute('href');
    href.value = "./pages/productpage.html?id=" + productInfos._id;
    link.setAttributeNode(href);

    //create title for thumnbail
    const h2 = document.createElement('h2');
    link.appendChild(h2).innerHTML = productInfos.name;

    //create price for thumnbail
    const span = document.createElement('span');
    const priceStyle = document.createAttribute('class');
    priceStyle.value = "price";
    span.setAttributeNode(priceStyle);
    let price = productInfos.price;
    // Set the price with the good writting
    link.appendChild(span).innerHTML = transformPrice(price);
    
    //create img for thumnbail
    const div = document.createElement('div');
    link.appendChild(div);
    const imgContainer = document.createAttribute('class');
    imgContainer.value = "img__container";
    div.setAttributeNode(imgContainer);

    const img = document.createElement('img');
    div.appendChild(img);

    const imgUrl = document.createAttribute('src');
    imgUrl.value = productInfos.imageUrl;
    img.setAttributeNode(imgUrl);

    const imgDescription = document.createAttribute('alt');
    imgDescription.value = productInfos.description;
    img.setAttributeNode(imgDescription);
};


 
fetch('http://localhost:3000/api/teddies')
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(products => {
        for (const product of products) {
            createThumbnail(product);
        }
    })
    .catch(err => console.log('erreur!'));

