// script.js
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");

  // Fetch products from the API
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      // Generate product list
      products.forEach((product) => {
        const productWrapper = document.createElement("div");
        productWrapper.classList.add("products-wrapper");

        const productImage = document.createElement("div");
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;
        productImage.appendChild(image);
        productWrapper.appendChild(productImage);

        const details = document.createElement("div");
        details.classList.add("details");
        const title = document.createElement("h2");
        title.textContent = product.title;
        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = `$${product.price}`;

        details.appendChild(title);
        details.appendChild(price);

        productWrapper.appendChild(details);

        productWrapper.addEventListener("click", function () {
          window.location.href = `product.html?id=${product.id}`;
        });

        productList.appendChild(productWrapper);
      });
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
});
