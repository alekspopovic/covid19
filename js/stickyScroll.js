window.onscroll = function() {glue()};
var navbar = document.getElementById("menu");
var sticky = navbar.offsetTop;

function glue() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}