let nameProduct = document.getElementById("name");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorProduct = document.getElementById("colors");
let imageProduct = document.getElementById("image");
 
 export function dynamicPDP(name, price, description, colors, image) {
    nameProduct.innerHTML = name;
    priceProduct.innerHTML = price;
    descriptionProduct.innerHTML = description;
    colorProduct.innerHTML = colors;
    imageProduct = imageProduct.setAttribute("src", image);
    //console.log(imageProduct.value)
    //imageProduct.value = image;
}