// ======================== start slider ============================
var imgs = [
  "../imgs/slider/slider1.webp",
  "../imgs/slider/slider2.webp",
  "../imgs/slider/slider3.webp",
  "../imgs/slider/slider4.webp",
  "../imgs/slider/slider5.webp",
  "../imgs/slider/slider6.webp",
  "../imgs/slider/slider7.webp",
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

// ==================== start floating span ==========================
document.getElementById("up-span").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

// ==================== start category ==========================
var product_container = document.getElementById("product-container");
for (let index = 1; index <= 12; index++) {
  product_container.innerHTML += `
  <div class="box">
  <img src="./imgs/category/${index}.png" alt="category image" />
</div>
  `;
}

// ====================== start products ========================

function getAllProducts() {
  fetch("../js/products.json")
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
  fetch("../js/products.json")
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
    cardsContainer.innerHTML += `
    <div class="card">
    <div class="img-wrapper">
      <img src="${product.image}" alt="product-image" loading="lazy" />
      <div class="content">
        <p class="title">
         ${product.title}
        </p>
        <p class="price">
          <span>EGP</span>
          <span>${product.price}</span>
        </p>
        <span class="addToCart"
          ><i class="fa-solid fa-cart-plus"></i
        ></span>
      </div>
    </div>
  </div>
    `;
  });
}

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

// ================== cart click =================
var cart = document.getElementById("cart");
var cart_container = document.getElementById("cart-container");
cart.addEventListener("click", () => {
  cart_container.style.display = "block";
});

var closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", () => {
  cart_container.style.display = "none";
});
