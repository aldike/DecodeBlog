document.addEventListener("DOMContentLoaded", function(){
    let toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
    let contentDropdowns = document.querySelectorAll(".content-dropdown");

    toggleDropdowns.forEach((toggleDropdown, index) => {
        let contentDropdown = contentDropdowns[index];

        toggleDropdown.addEventListener("click", function(){
            contentDropdown.classList.toggle("show");
        });
    });
});