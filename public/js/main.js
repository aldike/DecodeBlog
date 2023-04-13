document.addEventListener("DOMContentLoaded", function(){
    let toggleDropdown = document.querySelector(".toggle-dropdown");
    let contentDropdown = document.querySelector(".content-dropdown");

    toggleDropdown.addEventListener("click", function(){
        contentDropdown.classList.toggle("show");
    });
});