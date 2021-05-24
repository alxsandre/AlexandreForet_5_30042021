 
 const createThumbnail = (productInfos) => {
        //create thumnbail
        const main = document.querySelector('main');
        const section = document.createElement('section');
        main.appendChild(section);
        const thumnbailStyle = document.createAttribute('class');
        thumnbailStyle.value = "thumnbail";
        section.setAttributeNode(thumnbailStyle);

        //create img for thumnbail
        const img = document.createElement('img');
        section.appendChild(img);

        const imgUrl = document.createAttribute('src');
        imgUrl.value = productInfos.imageUrl;
        img.setAttributeNode(imgUrl);

        const imgDescription = document.createAttribute('alt');
        imgDescription.value = productInfos.description;
        img.setAttributeNode(imgDescription);

        //create title for thumnbail
        const h2 = document.createElement('h2');
        section.appendChild(h2).innerHTML = productInfos.name;

        //create price for thumnbail
        const span = document.createElement('span');
        section.appendChild(span).innerHTML = productInfos.price;

        //create description for thumnbail
        const para = document.createElement('p');
        section.appendChild(para).innerHTML = productInfos.description;
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