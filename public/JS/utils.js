//take id in the URL parameter
//formating price
export let idUrl;
export { transformPrice };

if (document.URL.includes("productpage.html")) {
  const actualUrl = new URL(window.location.href);
  idUrl = actualUrl.search.substring(4);
}

function transformPrice(price) {
  let priceFloat = parseFloat(price);
  priceFloat = priceFloat * 0.01;
  priceFloat = priceFloat.toFixed(2) + " €";
  return priceFloat;
}
