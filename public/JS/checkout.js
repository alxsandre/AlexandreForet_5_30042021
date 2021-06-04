import './cart.js';

const anchorProduct = document.querySelector('article');

let listProduct = localStorage.getItem("listProduct");
listProduct = JSON.parse(listProduct);

for(const idProduct of listProduct) {
   // console.log(idProduct);

    
}

var counts = [];
listProduct.forEach( x => { counts[x] = (counts[x] || 0)+1; });


console.log(counts);

let nameProductIntoCart = Array.from(new Set(listProduct));
console.table(nameProductIntoCart);


const iterator = counts.keys();
for (const key of iterator) {
  console.log(key);
}


anchorProduct.innerHTML = `<article class="containernospace">
    <div class="img__container">
        <img src="http://localhost:3000/images/teddy_1.jpg" alt="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
    </div>
    <div class="checkout__container">
        <h2>Norbert</h2>
        <span class="checkout__price">29.00 €</span>
        <div class="checkout__colors">colors</div>
    </div>
</article>`
