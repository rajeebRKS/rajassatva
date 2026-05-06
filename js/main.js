document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const popupBtn = document.getElementById("popupBtn");
  const submitBtn = document.getElementById("cfSubmit");
  const status = document.getElementById("formStatus");

  // DEBUG (important)
  console.log("JS Loaded");
  alert("JS is running"); // must show

  if (!form) {
    console.log("Form not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // STOP redirect

    console.log("Form submit intercepted");

    submitBtn.classList.add("is-loading");
    status.textContent = "";

    let data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      submitBtn.classList.remove("is-loading");

      if (response.ok) {
        console.log("Success");

        popup.style.display = "flex"; // SHOW POPUP
        form.reset();
      } else {
        status.textContent = "Something went wrong.";
      }
    })
    .catch(error => {
      console.log("Error:", error);
      submitBtn.classList.remove("is-loading");
      status.textContent = "Network error.";
    });
  });

  if (popupBtn) {
    popupBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });
  }

});
