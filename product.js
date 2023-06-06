const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// ID
fetch("https://fakestoreapi.com/products/" + productId)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    return response.json();
  })
  .then((product) => {
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
        <div class="product-wrapper">
            <div>
                <img src="${product.image}" alt="${product.title}" />
            </div>
            
            <div class="details">
                <h2>${product.title}</h2>
                <p class="price"> $${product.price}</p>
                <p> ${product.description}</p>
            </div>
            
        </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching product details:", error);
  });
