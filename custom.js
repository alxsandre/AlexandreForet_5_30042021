class thumnbailProduct extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = "Hello"
    }

    connectedCallback() {

    }
}

customElements.define('thumnbail-product', thumnbailProduct)