let $ = document;
let btn = $.querySelectorAll(".card .btn");
let sampleProductRow = $.querySelector(".product_row");
let totalPriceElement = $.querySelector(".total_price--number");
let tbody = $.querySelector("tbody");
let allProducts = [
  { id: 1, name: "eager", cost: 12.54, imgSource: "./images/1.jpg" },
  { id: 2, name: "put", cost: 23.8, imgSource: "./images/2.jpg" },
  { id: 3, name: "will", cost: 14.12, imgSource: "./images/3.jpg" },
  { id: 4, name: "though", cost: 46.2, imgSource: "./images/4.jpg" },
  { id: 5, name: "fair", cost: 59.43, imgSource: "./images/5.jpg" },
  { id: 6, name: "part", cost: 68.78, imgSource: "./images/6.jpg" },
  { id: 7, name: "frighten", cost: 64.13, imgSource: "./images/7.jpg" },
  { id: 8, name: "useful", cost: 88.78, imgSource: "./images/8.jpg" },
];
let allInCartProducts = [];
function findProductIndexByName(name) {
  let currentProduct = allInCartProducts.find(function (prod) {
    return prod["name"] === name;
  });
  return allInCartProducts.indexOf(currentProduct);
}
function findProductObjectByName(name) {
  let currentProduct = allProducts.find(function (prod) {
    return prod["name"] === name;
  });
  return currentProduct;
}
function refreshTable() {
  tbody.innerHTML = "";
  allInCartProducts.forEach(function (prod) {
    let tableRow = sampleProductRow.cloneNode(true);
    tableRow.classList.remove("u-hidden");
    tableRow.children[1].children[0].innerHTML = prod["cost"];
    tableRow.children[0].children[0].src = prod["imgSource"];
    tableRow.children[0].children[1].innerHTML = prod["name"];
    tbody.append(tableRow);
    let removeBtn = tableRow.children[2].children[1];
    removeBtn.addEventListener("click", function () {
      let currentIndex = allInCartProducts.indexOf(prod);
      allInCartProducts.splice(currentIndex, 1);
      refreshTable();
      calculateTotalPrice();
    });
    let qInput = tableRow.children[2].children[0];
    qInput.addEventListener("input", function () {
      let currentProductName =
        qInput.parentElement.parentElement.children[0].children[1].innerHTML;
      let currentIndex = findProductIndexByName(currentProductName);
      allInCartProducts[currentIndex]["qty"] = qInput.value;
      calculateTotalPrice();
    });
  });
}
function calculateTotalPrice() {
  let totalPrice = 0;
  allInCartProducts.forEach(function (prod) {
    totalPrice += prod["cost"] * prod["qty"];
  });
  totalPriceElement.innerHTML = totalPrice.toFixed(2);
}

btn.forEach(function (currentButton) {
  currentButton.addEventListener("click", function (event) {
    event.preventDefault();
    let addedProductId =
      event.target.parentElement.parentElement.children[0].dataset.id;
    event.target.parentElement.parentElement.children[0].dataset.id;
    let currentProduct = allProducts.find(function (prod) {
      return prod["id"] == addedProductId;
    });
    if (!allInCartProducts.includes(currentProduct)) {
      currentProduct.qty = 1;
      allInCartProducts.push(currentProduct);
      refreshTable();
      calculateTotalPrice();
    }
  });
});
