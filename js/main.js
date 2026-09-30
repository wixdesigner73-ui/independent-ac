(function () {
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("site-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
    });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  // Contact form: no backend is configured, so this opens the visitor's email client.
  var form = document.getElementById("service-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = "Name: " + d.get("name") + "\nPhone: " + d.get("phone") + "\nEmail: " + d.get("email") +
        "\nService: " + d.get("service") + "\n\n" + d.get("message");
      var to = form.getAttribute("data-mailto");
      if (to) { window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Service request: " + d.get("service")) + "&body=" + encodeURIComponent(body); }
      var ok = document.getElementById("form-ok");
      if (ok) ok.classList.add("show");
    });
  }
})();
