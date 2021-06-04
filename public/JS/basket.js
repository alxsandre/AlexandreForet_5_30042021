function basket() {
    //add article in the basket
    const numberBasket = document.querySelector('.basket__number')
    let number = 0;

    function addNumberBasket() {
        number = Number(localStorage.getItem("numberInBasket"));
        ++number;
        localStorage.setItem("numberInBasket", number);
        numberBasket.innerHTML = localStorage.getItem("numberInBasket");
    }

    if (document.URL.includes("PDP.html")) {
        const ctaAddArticle = document.querySelector('.PDP__CTA')
        ctaAddArticle.addEventListener("click", addNumberBasket);
    }

    if (localStorage.getItem("numberInBasket")) {
        numberBasket.innerHTML = localStorage.getItem("numberInBasket");
    }
};

export default basket;



/*class Article {
    constructor(listArticles){
        listArticles && Object.assign(this, listArticles)
    }

    getFormatedPrice() {
        let priceFloat = parseFloat(this.price);
        priceFloat = priceFloat * 0.01;
        priceFloat = priceFloat.toFixed(2) + ' €';
        return priceFloat;
    }
}

class ArticleManager {
    constructor(listArticle){
        this.listArticle = listArticle;
    }
}*/

/*
function addBasket(number) {
    let listBasket = getBasket();
    listBasket.push(number);
    saveBasket(listBasket);
}

function getBasket() {
    let listBasket = localStorage.getItem("listBasket");
    if (listBasket == null) {
        return [];
    } else {
        return JSON.parse(listBasket);
    }
}

function saveBasket(listBasket) {
    localStorage.setItem("listBasket", JSON.stringify(listBasket));
}
*/