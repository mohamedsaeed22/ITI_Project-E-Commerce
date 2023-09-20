// ========================  slider section============================
var imgs = [
  "./imgs/slider/slider1.webp",
  "./imgs/slider/slider2.webp",
  "./imgs/slider/slider3.webp",
  "./imgs/slider/slider4.webp",
  "./imgs/slider/slider5.webp",
  "./imgs/slider/slider6.webp",
  "./imgs/slider/slider7.webp",
];
var img = document.getElementById("img-slider");
var btnNext = document.getElementById("nextBtn");
var btnPrev = document.getElementById("prevBtn");
var index = 0;
img.src = imgs[index];

function onNextClick() {
  index++;
  if (index === imgs.length) index = 0;
  img.src = imgs[index];
}
function onPrevClick() {
  index--;
  if (index < 0) index = 2;
  img.src = imgs[index];
}

btnNext.addEventListener("click", () => {
  onNextClick();
});
btnPrev.addEventListener("click", () => {
  onPrevClick();
});
var loop;
function onPlay() {
  loop = setInterval(() => {
    onNextClick();
  }, 3000);
}
function onStop() {
  clearInterval(loop);
}

onPlay();

// ==================== floating span ==========================
document.getElementById("up-span").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
  // window.scrollTo({ top: 0, behavior: 'smooth' });

});

// ====================  category section ==========================
var product_container = document.getElementById("product-container");
for (let index = 1; index <= 12; index++) {
  product_container.innerHTML += `
  <div class="box">
  <img src="./imgs/category/${index}.png" alt="category image" />
</div>
  `;
}

// ======================  products section ========================

function getAllProducts() {
  fetch("./js/products.json")
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      renderProducts(products);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
}
getAllProducts();

function getProductsByCategory(category) {
  fetch("./js/products.json")
    .then((res) => {
      return res.json();
    })
    .then((products) => {
      var filteredArr = products.filter((product) => {
        return product.category === category;
      });
      renderProducts(filteredArr);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
}

var cardsContainer = document.getElementById("cards-container");

function renderProducts(products) {
  cardsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    cardsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("img-wrapper");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = "product-image";
  img.setAttribute("loading", "lazy");

  const content = document.createElement("div");
  content.classList.add("content");

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.classList.add("price");
  price.innerHTML = `<span>EGP</span><span>${product.price}</span>`;

  const addToCart = document.createElement("span");
  addToCart.classList.add("addToCart");

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("fa-solid", "fa-cart-plus");
  cartIcon.addEventListener("click", () => {
    addToCartFun(product);
  });

  addToCart.appendChild(cartIcon);

  content.appendChild(title);
  content.appendChild(price);
  content.appendChild(addToCart);

  imageWrapper.appendChild(img);
  imageWrapper.appendChild(content);

  card.appendChild(imageWrapper);

  return card;
}

// ================= add to cart process ===========================
const cartIcon = document.querySelector("header .cart i");

var cartProducts = [];
function addToCartFun(productId) {
  cartProducts.push(productId);
  updateCartCount(cartProducts.length);
  console.log(cartProducts);
}
updateCartCount(cartProducts.length);

function updateCartCount(count) {
  cartIcon.setAttribute("data-count", count);
}

// ============== filter products section =============================

var filters = document.querySelectorAll(".filter span");
filters.forEach((el) => {
  el.addEventListener("click", () => {
    filters.forEach((span) => {
      span.classList.remove("active");
    });
    el.classList.add("active");
    filterCards(el);
  });
});

function filterCards(el) {
  if (el.id == "phone") {
    getProductsByCategory("phone");
  } else if (el.id == "sneaker") {
    getProductsByCategory("sneaker");
  } else if (el.id == "laptop") {
    getProductsByCategory("laptop");
  } else if (el.id == "makeup") {
    getProductsByCategory("makeup");
  } else if (el.id == "all") {
    getAllProducts();
  }
}

// ================== cart section============================
var cart = document.getElementById("cart");
var cart_container = document.getElementById("cart-container");
var cart_items = document.getElementById("cart-item");
var empty_cart = document.getElementById("empty-cart");
var checkout = document.getElementById("checkout");
var totalPrice = document.getElementById("totalPrice");


cart.addEventListener("click", () => {
  cart_container.style.display = "block";
  if (cartProducts.length > 0) {
    renderProductsCart(cartProducts);
  } else {
    showEmptyCart();
  }
});

function showEmptyCart() {
  empty_cart.style.display = "block";
  checkout.style.display = "none";
}
function hideEmptyCart() {
  empty_cart.style.display = "none";
  checkout.style.display = "flex";
}

function renderProductsCart(productsArray) {
  cart_items.innerHTML = "";
  productsArray.forEach((product) => {
    const productCart = createCartItem(product);
    cart_items.appendChild(productCart);
    calculateTotalPrice()
  });
  hideEmptyCart();
}

function createCartItem(product) {
  product.count = 1;
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const imgWrapperDiv = document.createElement("div");
  imgWrapperDiv.classList.add("img-wrapper");

  const imgElement = document.createElement("img");
  imgElement.src = product.image;
  imgElement.alt = "product-image";
  imgElement.setAttribute("loading", "lazy");

  imgWrapperDiv.appendChild(imgElement);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const titleP = document.createElement("p");
  titleP.classList.add("title");
  titleP.textContent = product.title;

  var priceP = document.createElement("p");
  priceP.classList.add("price");
  var span_egp = document.createElement("span");
  span_egp.textContent = "EGP";
  var span_price = document.createElement("span");
  span_price.textContent = product.price;
  priceP.append(span_egp, span_price);

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");

  span1.textContent = product.count;
  span2.innerHTML = '<i class="fa-solid fa-plus"></i>';
  span3.innerHTML = '<i class="fa-solid fa-minus"></i>';

  span2.addEventListener("click", () => {
    span1.textContent = ++product.count;
    span_price.innerHTML = product.price * product.count;
    calculateTotalPrice();
  });

  span3.addEventListener("click", () => {
    if (product.count > 1) {
      span1.textContent = --product.count;
      span_price.innerHTML = product.price * product.count;
      calculateTotalPrice();
    }
  });

  totalDiv.append(span2, span1, span3);

  const removeFromCartDiv = document.createElement("div");
  removeFromCartDiv.classList.add("removeFromCart");
  removeFromCartDiv.innerHTML = '<i class="fa-solid fa-trash"></i>';

  removeFromCartDiv.addEventListener("click", () => {
    cartProducts = cartProducts.filter((p) => p.id !== product.id);
    renderProductsCart(cartProducts);
    updateCartCount(cartProducts.length);
    if (cartProducts.length == 0) {
      showEmptyCart();
    }
  });

  contentDiv.appendChild(titleP);
  contentDiv.appendChild(priceP);
  contentDiv.appendChild(totalDiv);

  cardDiv.appendChild(imgWrapperDiv);
  cardDiv.appendChild(contentDiv);
  cardDiv.appendChild(removeFromCartDiv);

  return cardDiv;
}

function calculateTotalPrice() {
  var total = 0;
  cartProducts.forEach((product) => {
    total += product.price * product.count;
  });
  totalPrice.innerHTML = total;
}
var closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", () => {
  tot = 0;
  cart_container.style.display = "none";
});
