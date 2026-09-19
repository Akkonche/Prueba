document.addEventListener("DOMContentLoaded", ()=>{
    let menu_displayed = false;
    let hmb_button = document.querySelector(".hmb-button");
    let header_nav = document.querySelector("header nav");
    console.log("8", {hmb_button, header_nav, menu_displayed});
    hmb_button.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("8", {hmb_button, header_nav, menu_displayed});
        if (!menu_displayed) {
            header_nav.classList.remove("hidden");
            menu_displayed = true;
        } else {
            header_nav.classList.add("hidden");
            menu_displayed = false;
        }
    });
});