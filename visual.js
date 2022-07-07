setTimeout(function () {
  const active = document.querySelector(".h1-slide");
  active.classList.add("slider-active");
  const h2s = active.querySelectorAll("h1");
  h2s[0].classList.add("top-active");
  h2s[1].classList.add("left-active");
}, 500);

$(".btn-wrapper").click(function () {
  $("html,body").animate(
    {
      scrollTop: $("#valuation-header").offset().top,
    },
    "1500"
  );
});
