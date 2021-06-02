

//add article in the basket
const numberBasket = document.querySelector('.basket__number')
let number = 0;

function addArticle() {
    number = ++number;
    numberBasket.innerHTML = number;
}

if ( document.URL.includes("PDP.html") ) {
    const ctaAddArticle = document.querySelector('.PDP__CTA')
    ctaAddArticle.addEventListener("click", addArticle);
}

numberBasket.innerHTML = number;

 const createThumbnail = (productInfos) => {
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
        href.value = "./pages/PDP.html"
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
        let priceFloat = parseFloat(price);
        priceFloat = priceFloat * 0.01;
        priceFloat = priceFloat.toFixed(2) + ' €';
        link.appendChild(span).innerHTML = priceFloat;
        
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

        /*
        //create description for thumnbail
        const para = document.createElement('p');
        section.appendChild(para).innerHTML = productInfos.description;
        */
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
            console.log(product)
        }
    })
    .catch(err => console.log('fatal error!!'));




// Test home made framework

/*
// Vanilla JS
const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello",
    },
}

const container = document.getElementById("root");

const node = document.createElement(element.type);
node["title"] = element.props.title;
console.log(node);

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);
*/