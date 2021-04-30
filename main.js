 /*
 let createThumbnail = (productInfos) => {
        //create thumnbail
        const main = document.querySelector('main');
        const section = document.createElement("section");
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

*/



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

// React style
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    :createTextElement(child)
            ),
        },
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

function render(element, container) {
    const dom =
        element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

    const isProperty = key => key !== "children";
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        });
    
    element.props.children.forEach(child =>
            render(child, dom)
        );

    container.appendChild(dom);
}

let nextUnitOfWork = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork) {
    // TODO
}

const Didact = {
    createElement,
    render
}



//peut être traduit en JSX
const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
)
const container = document.getElementById("root");
Didact.render(element, container);

