export let idUrl;
export { transformPrice };

//take id in the URL parameter
if (document.URL.includes("productpage.html")) {
  const actualUrl = new URL(window.location.href);
  idUrl = actualUrl.search.substring(4);
}

/**
 * formating price
 * @param {number} price 
 * @returns {string} priceFloat
 */
function transformPrice(price) {
  let priceFloat = parseFloat(price);
  priceFloat = priceFloat * 0.01;
  priceFloat = priceFloat.toFixed(2) + " €";
  return priceFloat;
}
