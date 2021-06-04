//take id in the URL parameter
export let idUrl;

if (document.URL.includes("productpage.html")) {
    const actualUrl = new URL(window.location.href);
    idUrl = actualUrl.search.substring(4);
}
