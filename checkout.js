function calculateTotal() {
  var quantity = parseInt(document.getElementById("quantity").value);
  var price = parseFloat(document.getElementById("product-price").textContent);
  var total = quantity * price;
  document.getElementById("total-price").textContent = total.toFixed(2);
}

function decreaseQuantity() {
  var quantityInput = document.getElementById("quantity");
  var currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
    calculateTotal();
  }
}

function increaseQuantity() {
  var quantityInput = document.getElementById("quantity");
  var currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
  calculateTotal();
}

function validateCheckout() {
  var nameInput = document.getElementById("name");
  var name = nameInput.value.trim();

  var isNameValid = validateName(name);

  if (isNameValid) {
    showNotification(name);
    clearErrors();
  } else {
    hideNotification();
    clearErrors();
    if (!isNameValid) {
      displayError("name-error", "Please enter a valid name.");
    }
  }
}

function validateName(name) {
  return name !== "";
}

function showNotification(name) {
  var total = document.getElementById("total-price").textContent;
  alert("Thank you for your purchase, " + name + "!\nTotal: $" + total);
}

function hideNotification() {
  document.getElementById("thank-you-message").style.display = "none";
}

function displayError(elementId, errorMessage) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = errorMessage;
  errorElement.style.display = "block";
}

function clearErrors() {
  var errorElements = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
    errorElements[i].style.display = "none";
  }
}
