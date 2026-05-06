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

  // AJAX submit for Netlify Form
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('cfSubmit');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      status.className = 'form-status';
      status.textContent = '';

      var data = new FormData(form);
      var body = new URLSearchParams(data).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Network error');
          form.reset();
          status.className = 'form-status is-success';
          status.textContent = 'Thanks — your enquiry is in. We will reply within one working day.';
        })
        .catch(function () {
          status.className = 'form-status is-error';
          status.textContent = 'Something went wrong. Please email sc@rajassatva.in or WhatsApp us.';
        })
        .finally(function () {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        });
    });
  }

  // Show success state if returning from non-JS submit
  if (window.location.search.indexOf('submitted=true') > -1 && status) {
    status.className = 'form-status is-success';
    status.textContent = 'Thanks — your enquiry is in. We will reply within one working day.';
  }
})();
