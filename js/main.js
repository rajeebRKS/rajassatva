(function () {
  // Year
  var yEl = document.getElementById('year');
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  // Header scroll state
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const popupBtn = document.getElementById("popupBtn");
const submitBtn = document.getElementById("cfSubmit");
const status = document.getElementById("formStatus");

if (!form) return;

form.addEventListener("submit", function (e) {
e.preventDefault();

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

popupBtn.addEventListener("click", function () {
window.location.href = "/";
});

});


  // Show success state if returning from non-JS submit
  if (window.location.search.indexOf('submitted=true') > -1 && status) {
    status.className = 'form-status is-success';
    status.textContent = 'Thanks — your enquiry is in. We will reply within one working day.';
  }
})();
