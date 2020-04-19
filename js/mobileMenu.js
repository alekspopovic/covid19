let menuButton = document.getElementById("menuButton");
let menu = document.getElementById("menu");

menuButton.addEventListener("click", function() {
    if (menu.classList.contains("showMenuOptions")) {
        menu.classList.remove("showMenuOptions");
        menuButton.innerHTML = "Menu";
    } else {
        menu.classList.add("showMenuOptions");
        menuButton.innerHTML = "Close Menu";
    }
});