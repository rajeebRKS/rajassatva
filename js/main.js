(function () {

const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const popupBtn = document.getElementById("popupBtn");
const submitBtn = document.getElementById("cfSubmit");
const status = document.getElementById("formStatus");

if (!form) return;

form.addEventListener("submit", function (e) {
e.preventDefault(); // ✅ STOP REDIRECT

```
submitBtn.classList.add("is-loading");
status.textContent = "";

let data = new FormData(form);

fetch(form.action, {
  method: "POST",
  body: data,
  headers: { "Accept": "application/json" }
})
.then(response => {
  submitBtn.classList.remove("is-loading");

  if (response.ok) {
    popup.style.display = "flex";
    form.reset();
  } else {
    status.textContent = "Something went wrong. Please try again.";
    status.classList.add("is-error");
  }
})
.catch(() => {
  submitBtn.classList.remove("is-loading");
  status.textContent = "Network error. Please try again.";
  status.classList.add("is-error");
});
```

});

if (popupBtn) {
popupBtn.addEventListener("click", function () {
window.location.href = "/";
});
}

})();
