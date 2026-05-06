document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const popupBtn = document.getElementById("popupBtn");
  const submitBtn = document.getElementById("cfSubmit");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop redirect

    // ✅ Prevent double click
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    status.textContent = "";
    status.className = "form-status";

    let data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");

      if (response.ok) {
        // ✅ Show popup
        popup.style.display = "flex";

        // ✅ Fallback success message
        status.textContent = "Thanks! We’ll contact you soon.";
        status.classList.add("is-success");

        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again.";
        status.classList.add("is-error");
      }
    })
    .catch(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");

      status.textContent = "Network error. Please try again.";
      status.classList.add("is-error");
    });
  });

  // ✅ Close popup (UX improvement)
  if (popupBtn) {
    popupBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });
  }

  // ✅ Optional: click outside popup to close
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }

});
