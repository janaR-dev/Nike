document.addEventListener("DOMContentLoaded", function () {

    restoreCart();
    emptyCartMessage();

});
body.classList.add(colors[currentIndex]);
slide[currentIndex].classList.add("active");

prev.addEventListener("click", () => changeColor(-1));
next.addEventListener("click", () => changeColor(1));
    

window.addEventListener("scroll",changeNavbarColor);

btns.forEach(btn => {
  btn.addEventListener('click', ActivatePopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', () => {
    let key = popup.dataset.keyPopup;
    toggle_popUp(key);
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let key = btn.dataset.keyPopup ;
    toggle_popUp(key);
  });
});

popupContainer.forEach(container => {
  container.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});


window.addEventListener('scroll', () => {
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop - 150 &&
      window.scrollY < sectionBottom - 150
    ) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.dataset.sectionId === currentSectionId) {
        link.classList.add('active');
    }
  });
});


products.forEach(product =>{
    let sizes = product.querySelectorAll('li.sizes');
    sizes.forEach(size=>{
        size.addEventListener('click', (e)=> {
        let selectedSize = e.currentTarget
        , selectedProduct = size.closest('.product')

        updateProduct(selectedSize, selectedProduct)
    } )})
})