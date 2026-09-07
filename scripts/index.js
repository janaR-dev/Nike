
document.addEventListener("DOMContentLoaded", () => {

    updateNav();

    showLatest();

    showFeatured();

    activatePopups();

    restoreCart();

    body.classList.add(
        colors[currentIndex]
    );

    slides[currentIndex]?.classList.add(
        "active"
    );

    prev?.addEventListener(
        "click",
        () => changeColor(-1)
    );

    next?.addEventListener(
        "click",
        () => changeColor(1)
    );

    initializeEvents();
});





window.addEventListener("load", () => {

    let loadingScreen =
        document.querySelector(".loadingScreen");

    loadingScreen.classList.remove("d-none", "hide");
    loadingScreen.classList.add("d-flex", "show");

    setTimeout(() => {
        loadingScreen.classList.remove("d-flex", "show");
        loadingScreen.classList.add("d-none", "hide");
    }, 3000);

});