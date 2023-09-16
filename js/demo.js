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
