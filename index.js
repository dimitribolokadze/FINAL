async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // პროდუქტების დახარისხება კლებადობის მიხედვით
    const sortedProducts = data.sort((a, b) => b.rating - a.rating);

    // top 10 products
    const topProducts = sortedProducts.slice(0, 8);

    // არენდერებს HTML-ში
    const productList = document.getElementById("productList");
    topProducts.forEach((product) => {
      const productElement = createProductElement(product);
      productList.appendChild(productElement);
    });
  } catch (error) {
    // Error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error: " + error.message;
    document.body.appendChild(errorMessage);
  }
}

// ქმნის
function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const imageElement = document.createElement("img");
  imageElement.src = product.image;
  imageElement.alt = product.title;

  const titleElement = document.createElement("h3");
  titleElement.textContent = product.title;

  const priceElement = document.createElement("p");
  priceElement.textContent = `$${product.price}`;

  productElement.appendChild(imageElement);
  productElement.appendChild(titleElement);
  productElement.appendChild(priceElement);

  productElement.addEventListener("click", function () {
    // Redirect to a new HTML page
    window.location.href = "product.html?id=" + product.id;
  });
  return productElement;
}

fetchProducts();

const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // ბაბლის გამოჩენა/დამალვა
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //  მაქსიმალური სქროლვის სიგანე
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  // თუ ფოტოები აღარ არის სქროლისთვის
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // თუ იუზერი მარჯვნივ სქროლავს
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // მარცხნივ
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
