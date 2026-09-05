function changeColor(direction) {

    body.classList.remove(colors[currentIndex]);
    slide[currentIndex].classList.remove("active");

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = colors.length - 1;
    }

    if (currentIndex >= colors.length) {
        currentIndex = 0;
    }

    body.classList.add(colors[currentIndex]);

    brand.src = `./public/images/${currentIndex}-logo.png`;
    logoIcon.href = `./public/images/${currentIndex+1}-logo.png`;
    correctImg.forEach(img =>{
        img.src = `./public/images/${currentIndex}-correct.png`
    })

    slide[currentIndex].classList.add("active");
}

function changeNavbarColor() {
    if (window.scrollY > 3) {
        navbar.classList.add("colored");
    } else {
        navbar.classList.remove("colored");
    }
}

function ActivatePopup(e) {
    let key = e.target.getAttribute("data-key-popup");
    popups.forEach(popup => {
        popup.classList.remove('active');
        if (popup.getAttribute("data-key-popup") === key) {
            popup.classList.add("active");

        }
    });
}

function toggle_popUp(popup_key) {
    let popup_ele = document.querySelector(`.popup[data-key-popup="${popup_key}"]`);
    popup_ele.classList.toggle("active");
}

function updateProduct(size, product) {
    let selectedSize = size.dataset.size
        , sizeList = size.parentElement.querySelectorAll('li')
        , productId = product.dataset.productId
        , selectedColor = product.dataset.selectedColor;

    product.dataset.selectedSize = selectedSize;

    sizeList.forEach(li => li.classList.remove('active'));
    size.classList.add('active');

    


}

function showImg(listEle) {
    let imgSrc = listEle.querySelector('img').getAttribute('src'),
        productCard = listEle.closest('.product'),
        mainImg = productCard.querySelector('.selected-image img');
    mainImg.setAttribute('src', imgSrc);

}



const CART_KEY = "shoppingCart";


function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}




function getProduct(btnEle) {

    let product = btnEle.closest('.product');

    let productData = {
        id: product.getAttribute('data-product-id'),
        size: product.getAttribute('data-selected-size'),
        color: product.getAttribute('data-selected-color'),
        name: product.querySelector('.product-content h3')?.innerText,
        price: product.querySelector('.price .after-discount')?.innerHTML,
        oldPrice: product.querySelector('.price .before-discount')?.innerHTML,
        imgSrc: product.querySelector('.selected-image img')?.getAttribute('src')
    };


    let cart = getCart();

    let exists = cart.some(item => item.id === productData.id);

    if (exists) {
        return;
    }


    cart.push(productData);

    saveCart(cart);


    addProductToCart(productData);


    changeButtonToRemove(btnEle);
}




function changeButtonToRemove(btn) {

    btn.innerText = "Remove From Cart";

    btn.classList.remove("add");
    btn.classList.add("remove");

    btn.onclick = function () {

        removeProduct(
            btn.closest('.product').getAttribute('data-product-id'),
            btn
        );

    };
}


function emptyCartMessage() {
    let cart = getCart();

    let emptyMessage = document.querySelector("#emptyCartMessage"),
        buyNow = document.querySelector('#BuyNowBtn');


    if (cart.length === 0) {
        emptyMessage.classList.remove("d-none");
        buyNow.classList.add('d-none')

    } else {
        emptyMessage.classList.add("d-none");       
         buyNow.classList.remove('d-none')

    }
}

function changeButtonToAdd(id) {
    let product = document.querySelector(` .product[data-product-id="${id}"]`),
    btn = product.querySelector('.mainButton')

    btn.innerText = "Add To Cart";

    btn.classList.remove("remove");
    btn.classList.add("add");

    btn.onclick = function () {
        getProduct(btn);
    };
}




function addProductToCart(data) {

    let productCart = document.querySelector(
        '.shoping-popup .body .row'
    );


    if (
        productCart.querySelector(
            `.product[data-product-id="${data.id}"]`
        )
    ) {
        return;
    }


    productCart.innerHTML += `
        <div class="col-sm-6 col-md-4 product mb-3"
             data-product-id="${data.id}">

            <div class="item">

                <div class="product-head">
                    <img src="${data.imgSrc}"
                         alt="${data.name}"
                         class="img-fluid">
                </div>


                <div class="product-body">

                    <h5>${data.name}</h5>


                    <h6 class="price my-3">

                        <strong class="me-3">
                            Price :
                        </strong>

                        <p class="mb-0">

                            ${
                                data.oldPrice
                                ?
                                `<span class="before-discount">
                                    ${data.oldPrice}
                                </span>`
                                :
                                ''
                            }

                            <span class="after-discount">
                                ${data.price}
                            </span>

                        </p>

                    </h6>


                    <h6 class="size my-3">

                        <strong class="me-3">
                            Size :
                        </strong>

                        <ul class="list-unstyled mb-0">

                            <li class="active">
                                ${data.size.toUpperCase()}
                            </li>

                        </ul>

                    </h6>


                    <h6 class="color my-3">

                        <strong class="me-3">
                            Color :
                        </strong>

                        <ul class="list-unstyled mb-0">

                            <li
                                class="active"
                                style="background-color: ${data.color};">
                            </li>

                        </ul>

                    </h6>


                    <button
                        class="btn mainButton remove btn-danger w-100"
                        onclick="removeProduct('${data.id}', this)">
                        Remove

                    </button>

                </div>

            </div>

        </div>
    `;
    emptyCartMessage();
}





function removeProduct(productId, originalBtn) {

   

    let cart = getCart();

    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);


    

    let cartProduct = document.querySelector(
        `.shoping-popup .body .product[data-product-id="${productId}"]`
    );

    if (cartProduct) {
        cartProduct.remove();
    }


    emptyCartMessage();

    changeButtonToAdd(productId);
}




function restoreCart() {

    let cart = getCart();
    


    cart.forEach(product => {

        
        addProductToCart(product);



        let productElement = document.querySelector(
            `.product[data-product-id="${product.id}"]`
        );


        if (!productElement) {
            return;
        }



        let btn = productElement.querySelector(
            '.product-content .mainButton'
        );

        
        changeButtonToRemove(btn);
    

    });
}




