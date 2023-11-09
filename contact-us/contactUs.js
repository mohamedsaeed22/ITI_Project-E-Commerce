var form = document.getElementById("contactus-form");
var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var submit = document.getElementById("submit-form");

var flagName = false,
  flagEmail = false,
  flagPhone = false;
fullName.addEventListener("input", (e) => {
  var fullNameValue = fullName.value;
  const fullNameRegex = /^[a-zA-Z\s]+$/;
  flagName = validateInput(fullNameValue, fullNameRegex, 1);
});

email.addEventListener("input", (e) => {
  var emailValue = email.value;
  const emailRegex = /\w+@\w+\.com$/gi;
  flagEmail = validateInput(emailValue, emailRegex, 2);
});

phone.addEventListener("input", (e) => {
  var phoneValue = phone.value;
  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  flagPhone = validateInput(phoneValue, phoneRegex, 3);
});

function validateInput(inputValue, inputRgx, spanIndex) {
  if (inputRgx.test(inputValue)) {
    displayErrorMessage(spanIndex, "none");
    return true;
  } else {
    displayErrorMessage(spanIndex, "block");
    return false;
  }
}

function displayErrorMessage(spanIndex, displayValue) {
  document.querySelectorAll("form span")[spanIndex].style.display =
    displayValue;
}

form.addEventListener("input", (e) => {
  if (flagName && flagEmail && flagPhone) {
    submit.disable = false;
    submit.classList.remove("hide");
    submit.style.cursor = "pointer";
  } else {
    submit.disable = true;
    submit.classList.add("hide");
    submit.style.cursor = "not-allowed";
  }
});

submit.addEventListener("click", (e) => {
  if (!(flagName && flagEmail && flagPhone)) {
    e.preventDefault();
  }
});

document.getElementById("up-span").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
