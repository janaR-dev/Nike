function changeColor(direction) {

        body.classList.remove(
            colors[currentIndex]
        );
    

    slides[currentIndex]?.classList.remove(
        "active"
    );

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex =
            slides.length - 1;
    }

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    if (colors[currentIndex]) {
        body.classList.add(
            colors[currentIndex]
        );
    }

    
        brand.src =
            `./public/images/${currentIndex}-logo.png`;
    

        logoIcon.href =
            `./public/images/${currentIndex}-logo.png`;
    

    correctImg.forEach(img => {
        img.src =
            `./public/images/${currentIndex}-correct.png`;
    });

    slides[currentIndex]?.classList.add(
        "active"
    );
}

function updateNav() {
    window.addEventListener(
        "scroll",
        changeNavbarColor
    );

    window.addEventListener(
        "scroll",
        updateActiveSection
    );

    changeNavbarColor();
    updateActiveSection();
}

function changeNavbarColor() {

    navbar.classList.toggle(
        "colored",
        window.scrollY > 3
    );
}

function updateActiveSection() {

    let currentSectionId = "";

    sections.forEach(section => {
        let sectionTop =
            section.offsetTop;

        let sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop - 150 &&
            window.scrollY < sectionBottom - 150
        ) {
            currentSectionId =
                section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.sectionId ===
                currentSectionId
        );
    });
}





function showImg(element) {
    let product =
        element.closest(".product");


    let mainImage =
        product.querySelector(
            ".selected-image img"
        );


    mainImage.src =
        productImage(element.dataset.src);

    product
        .querySelectorAll(".latest-image")
        .forEach(image => {
            image.classList.remove("active");
        });

    element.classList.add("active");
     initializeEvents() 
}



function handleCartButton(event) {

    event.preventDefault();
    event.stopPropagation();

    const cartButton = event.currentTarget;

    const productId = cartButton.dataset.productId;

    if (cartButton.classList.contains("remove")) {
        removeProduct(productId);
    } else {
        addProduct(productId);
    }
}


function handleLatestImage(event) {

    const latestImage = event.currentTarget;

    showImg(latestImage);
}


function handleLatestSize(event) {

    const size = event.currentTarget;

    const product = size.closest(".product");

    if (product) {
        updateProduct(size, product);
    }
}


function handleFeaturedImage(event) {

    const featuredImage = event.currentTarget;

    showFeaturedImg(featuredImage);
}


function handleProductIcon(event) {

    event.preventDefault();
    event.stopPropagation();

    const productIcon = event.currentTarget;

    productPopupOpen(productIcon);
}


function handlePopupImage(event) {

    const popupImage = event.currentTarget;

    changePopupImage(popupImage);
}


function handlePopupSize(event) {

    const popupSize = event.currentTarget;

    const list = popupSize.parentElement.querySelectorAll(
        ".sizes"
    );

    list.forEach(item => {
        item.classList.remove("active");
    });

    popupSize.classList.add("active");
}


function productImage(image) {
    return `public/images/products/${image}`;
}

function getProductById(id) {
    return allProducts.find(
        product => Number(product.id) === Number(id)
    );
}

function getCart() {

        let cart = JSON.parse(
            localStorage.getItem("shoppingCart")
        );

        return Array.isArray(cart) ? cart : [];
    
}

function saveCart(cart) {
    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(cart)
    );
}

function isInCart(productId) {
    return getCart().some(
        product =>
            String(product.id) === String(productId)
    );
}



function showLatest() {


    let html = "";

    for (let i = 0; i < latestProducts.length; i++) {

        let product = latestProducts[i];

        let selectedSize =
            product.defaultSize ||
            product.sizes?.[0] ||
            "";

        let imagesHtml = "";

        for (let j = 0; j < product.images.length; j++) {

            let image = product.images[j];

            imagesHtml += `
                <li
                    class="latest-image me-2 me-md-0 mb-md-2 ${j === 0 ? "active" : ""}"
                    data-src="${image}"
                >
                    <img
                        src="${productImage(image)}"
                        alt="${product.name}"
                        class="img-fluid"
                    >
                </li>
            `;
        }


        let sizesHtml = "";

        if (product.sizes) {

            for (let j = 0; j < product.sizes.length; j++) {

                let size = product.sizes[j];

                sizesHtml += `
                    <li
                        class="sizes ${
                            size === selectedSize ? "active" : ""
                        }"
                        data-size="${size}"
                    >
                        ${size.toUpperCase()}
                    </li>
                `;
            }
        }


        let descriptionHtml = "";

        if (product.description) {
            descriptionHtml = `
                <p>${product.description}</p>
            `;
        }


        let oldPriceHtml = "";

        if (product.oldPrice) {
            oldPriceHtml = `
                <span class="before-discount">
                    ${product.oldPrice}
                    <sup>$</sup>
                </span>
            `;
        }


        let sizesSection = "";

        if (product.sizes) {
            sizesSection = `
                <h6 class="size my-3">
                    <strong class="me-3">
                        Size :
                    </strong>

                    <ul class="list-unstyled mb-0">
                        ${sizesHtml}
                    </ul>
                </h6>
            `;
        }


        html += `
            <div
                class="product mb-3"
                data-product-id="${product.id}"
                data-selected-size="${selectedSize}"
                data-selected-color="${product.color || ""}"
            >
                <div class="row">

                    <div class="col-lg-6 mb-md-4 mb-lg-0 product-images">
                        <div class="item">
                            <div class="row">

                                <div class="col-md-2 col-lg-3 col-xl-2 ">
                                    <div class="item">
                                        <ul class="list-unstyled">
                                            ${imagesHtml}
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-md-10 col-lg-9 col-xl-10 selected-image">
                                    <div class="item">
                                        <img
                                            src="${productImage(product.images[0])}"
                                            alt="${product.name}"
                                            class="img-fluid"
                                        >
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 product-content">
                        <div class="item">

                            <h3>${product.name}</h3>

                            ${descriptionHtml}

                            <h6 class="price">
                                <strong class="me-3">
                                    Price :
                                </strong>

                                <p class="mb-0">
                                    ${oldPriceHtml}

                                    <span class="after-discount">
                                        ${product.price}
                                        <sup>$</sup>
                                    </span>
                                </p>
                            </h6>

                            ${sizesSection}

                            <button
                                type="button"
                                class="btn mainButton cart-btn add"
                                data-product-id="${product.id}"
                            >
                                Add To Cart
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    latestContainer.innerHTML = html;

    updateCartButtons();
      initializeEvents()
}



function showFeatured() {

    if (!featuredContainer) return;

    let html = "";

    for (let i = 0; i < featuredProducts.length; i++) {

        let product = featuredProducts[i];

        let imagesHtml = "";

        for (let j = 0; j < product.images.length; j++) {

            let image = product.images[j];

            imagesHtml += `
                <li
                    class="${j === 0 ? "active" : ""}"
                    data-src="${image}"
                ></li>
            `;
        }


        let offerHtml = "";

        if (product.offer) {
            offerHtml = `
                <p class="offer">
                    ${product.offer}
                </p>
            `;
        } else {
            offerHtml = `
                <p class="offer d-none"></p>
            `;
        }


        let oldPriceHtml = "";

        if (product.oldPrice) {
            oldPriceHtml = `
                <span class="before-discount">
                    ${product.oldPrice}
                    <sup>$</sup>
                </span>
            `;
        }


        html += `
            <div
                class="col-sm-6 col-lg-3 mb-3 product"
                data-product-id="${product.id}"
            >
                <div class="item">

                    ${offerHtml}

                    <div class="head pb-5">

                        <img
                            src="${productImage(product.images[0])}"
                            alt="${product.name}"
                            class="img-fluid"
                        >

                        <i
                            class="fas fa-search key"
                            data-key-popup="productDet"
                            data-product-id="${product.id}"
                        ></i>

                        <div class="indicators">
                            <ul class="list-unstyled">
                                ${imagesHtml}
                            </ul>
                        </div>

                    </div>

                    <div class="body text-center">

                        <h6>${product.name}</h6>

                        <h6>
                            ${oldPriceHtml}

                            <span class="after-discount">
                                ${product.price}
                                <sup>$</sup>
                            </span>
                        </h6>

                    </div>

                </div>
            </div>
        `;
    }

    featuredContainer.innerHTML = html;
    initializeEvents()
}










function showFeaturedImg(element) {
    let product =
        element.closest(".product");

    if (!product) return;

    let mainImage =
        product.querySelector(".head > img");

    if (!mainImage) return;

    mainImage.src =
        productImage(element.dataset.src);

    product
        .querySelectorAll(".indicators li")
        .forEach(item => {
            item.classList.remove("active");
        });

    element.classList.add("active");
}


function updateProduct(size, product) {
    let selectedSize =
        size.dataset.size;

    product.dataset.selectedSize =
        selectedSize;

    product
        .querySelectorAll(".sizes")
        .forEach(item => {
            item.classList.remove("active");
        });

    size.classList.add("active");
}




function productPopupOpen(icon) {
    let product =
        getProductById(icon.dataset.productId);

    if (!product) return;

    productDet(product);
    openPopup("productDet");
     initializeEvents() 
}

function productDet(product) {
    let productPopup =
        document.querySelector(
            '.product-popup[data-key-popup="productDet"]'
        );


    let popupBody =
        productPopup.querySelector(".body .row");


    let images =
        product.images || [];

    let latestProduct =
        latestProducts.find(
            item =>
                Number(item.id) ===
                Number(product.id)
        );

    let mainProduct =
        document.querySelector(
            `#Latest .product[data-product-id="${product.id}"]`
        );

    
    let productColors =
        Array.isArray(product.color)
            ? product.color
            : product.color
                ? [product.color]
                : [];

    let selectedColor =
        mainProduct?.dataset.selectedColor ||
        product.selectedColor ||
        productColors[0] ||
        "";

    
    let productSizes =
        Array.isArray(product.sizes)
            ? product.sizes
            : [];

    let selectedSize =
        mainProduct?.dataset.selectedSize ||
        product.selectedSize ||
        latestProduct?.defaultSize ||
        productSizes[0] ||
        "";

    let exists =
        isInCart(product.id);

    popupBody.innerHTML = `
        <div class="col-md-6 ">

            <div class="selected-image">
                <img
                    src="${productImage(images[0] || "")}"
                    alt="${product.name}"
                    class="img-fluid"
                >
            </div>

            <div class="indicators mt-3">
                <ul class="list-unstyled d-flex">

                    ${images.map((image, index) => `
                        <li
                            class="popup-image me-2 ${
                                index === 0 ? "active" : ""
                            }"
                            data-src="${image}"
                        >
                            <img
                                src="${productImage(image)}"
                                alt="${product.name}"
                                class="img-fluid"
                            >
                        </li>
                    `).join("")}

                </ul>
            </div>

        </div>

        <div class="col-md-6">

            <div class="product-content">

        
                <h3>${product.name}</h3>
                <h5 class="price">

                    ${
                        product.oldPrice
                            ? `
                                <span class="before-discount">
                                    ${product.oldPrice}
                                    <sup>$</sup>
                                </span>
                            `
                            : ""
                    }

                    <span class="after-discount">
                        ${product.price}
                        <sup>$</sup>
                    </span>

                </h5>
                <hr>
                ${
                    product.description
                        ? `<p>${product.description}</p>`
                        : ""
                }

                

                ${
                    productSizes.length
                        ? `
                            <h6 class="size my-3">
                                <strong>Size :</strong>

                                <ul class="list-unstyled d-flex">

                                    ${productSizes.map(size => `
                                        <li
                                            class="sizes me-2 ${
                                                String(size).toLowerCase() ===
                                                String(selectedSize).toLowerCase()
                                                    ? "active"
                                                    : ""
                                            }"
                                            data-size="${size}"
                                        >
                                            ${String(size).toUpperCase()}
                                        </li>
                                    `).join("")}

                                </ul>
                            </h6>
                        `
                        : ""
                }

                ${
                    productColors.length
                        ? `
                            <h6 class="color my-3">
                                <strong>Color :</strong>

                                <ul class="list-unstyled d-flex">

                                    ${productColors.map(color => `
                                        <li
                                            class="product-color me-2 ${
                                                color === selectedColor
                                                    ? "active"
                                                    : ""
                                            }"
                                            data-color="${color}"
                                            style="background-color:${color};"
                                            title="${color}"
                                        ></li>
                                    `).join("")}

                                </ul>
                            </h6>
                        `
                        : ""
                }

                <button
                    type="button"
                    class="btn mainButton popup-cart-btn cart-btn ${
                        exists ? "remove" : "add"
                    }"
                    data-product-id="${product.id}"
                >
                    ${
                        exists
                            ? "Remove From Cart"
                            : "Add To Cart"
                    }
                </button>

            </div>

        </div>
    `;

   
    productPopup.dataset.selectedSize =
        selectedSize;

    productPopup.dataset.selectedColor =
        selectedColor;


   

    productPopup
        .querySelectorAll(".sizes")
        .forEach(sizeElement => {

            sizeElement.addEventListener(
                "click",
                function () {

                    productPopup
                        .querySelectorAll(".sizes")
                        .forEach(item =>
                            item.classList.remove("active")
                        );

                    this.classList.add("active");

                    selectedSize =
                        this.dataset.size;

                    productPopup.dataset.selectedSize =
                        selectedSize;

                    if (mainProduct) {
                        mainProduct.dataset.selectedSize =
                            selectedSize;
                    }

                    product.selectedSize =
                        selectedSize;
                }
            );
        });


   
    productPopup
        .querySelectorAll(".product-color")
        .forEach(colorElement => {

            colorElement.addEventListener(
                "click",
                function () {

                    productPopup
                        .querySelectorAll(".product-color")
                        .forEach(item =>
                            item.classList.remove("active")
                        );

                    this.classList.add("active");

                    selectedColor =
                        this.dataset.color;

                    productPopup.dataset.selectedColor =
                        selectedColor;

                    if (mainProduct) {
                        mainProduct.dataset.selectedColor =
                            selectedColor;
                    }

                    product.selectedColor =
                        selectedColor;
                }
            );
        });


    initializeEvents();

    updateCartButtons();
}


function changePopupImage(element) {
    let popup =
        element.closest(".product-popup");

    if (!popup) return;

    let mainImage =
        popup.querySelector(
            ".selected-image img"
        );

    if (!mainImage) return;

    mainImage.src =
        productImage(element.dataset.src);

    popup
        .querySelectorAll(".popup-image")
        .forEach(image => {
            image.classList.remove("active");
        });

    element.classList.add("active");
}



function activatePopups() {
    let popupIcons =
        document.querySelectorAll(
            '[data-key-popup]:not(.popup):not(.exit):not(.key)'
        );

    let popups =
        document.querySelectorAll(
            ".popup[data-key-popup]"
        );

    let closeButtons =
        document.querySelectorAll(
            ".popup .exit"
        );

    popupIcons.forEach(Icon => {
        Icon.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            openPopup(
                Icon.dataset.keyPopup
            );
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            closePopup(
                button.dataset.keyPopup
            );
        });
    });

    popups.forEach(popup => {
        popup.addEventListener("click", event => {
        
                closePopup(
                    popup.dataset.keyPopup
                );
            
        });
    });
    popupBox.forEach(box=>{ box.addEventListener('click',event=>{
                event.stopPropagation();

    })
    })
}

function openPopup(key) {
    let popup =
        document.querySelector(
            `.popup[data-key-popup="${key}"]`
        );

    if (!popup) return;

    document
        .querySelectorAll(".popup.active")
        .forEach(activePopup => {
            if (activePopup !== popup) {
                activePopup.classList.remove("active");
            }
        });

    popup.classList.add("active");
}

function closePopup(key) {
    let popup =
        document.querySelector(
            `.popup[data-key-popup="${key}"]`
        );

    if (!popup) return;

    popup.classList.remove("active");
}




function addProduct(productId) {

    let product =
        getProductById(productId);

    if (!product) return;

    let cart =
        getCart();

    if (
        cart.some(
            item =>
                String(item.id) ===
                String(product.id)
        )
    ) {
        updateCartButtons();
        return;
    }

    let latestElement =
        document.querySelector(
            `#Latest .product[data-product-id="${product.id}"]`
        );

    let productPopup =
        document.querySelector(
            '.product-popup[data-key-popup="productDet"]'
        );

    let colors =
        Array.isArray(product.color)
            ? product.color
            : product.color;

    let selectedSize =
        productPopup?.dataset.selectedSize ||
        latestElement?.dataset.selectedSize ||
        product.selectedSize ||
        product.defaultSize ||
        product.sizes?.[0] ||
        null;

    let selectedColor =
        productPopup?.dataset.selectedColor ||
        latestElement?.dataset.selectedColor ||
        product.selectedColor ||
        colors[0] ||
        null;

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        imgSrc: productImage(product.images[0]),
        size: selectedSize,
        color: selectedColor
    });

    saveCart(cart);

    renderCart();
    updateCartButtons();

    if (
        productPopup?.classList.contains("active")
    ) {
        updatePopupCartButton(product.id);
    }

    initializeEvents();
}


function removeProduct(productId) {
    let cart =
        getCart().filter(
            item =>
                String(item.id) !==
                String(productId)
        );

    saveCart(cart);

    renderCart();
    updateCartButtons();
    updatePopupCartButton(productId);
     initializeEvents() 
}

function restoreCart() {
    renderCart();
    updateCartButtons();
}

function renderCart() {
    let productCart =
        document.querySelector(
            ".shoping-popup .body .row"
        );

    if (!productCart) return;

    let cart =
        getCart();

    productCart.innerHTML = "";

    if (cart.length > 0) {
        productCart.innerHTML =
            cart.map(product => `
                <div
                    class="col-sm-6 col-md-4 product mb-3"
                    data-product-id="${product.id}"
                >
                    <div class="item">

                        <div class="head">
                            <img
                                src="${product.imgSrc}"
                                alt="${product.name}"
                                class="img-fluid"
                            >
                        </div>

                        <div class="product-content">

                            <h3>${product.name}</h3>

                            <div class="price">

                                ${
                                    product.oldPrice
                                        ? `
                                            <span class="before-discount">
                                                ${product.oldPrice}
                                                <sup>$</sup>
                                            </span>
                                        `
                                        : ""
                                }

                                <span class="after-discount">
                                    ${product.price}
                                    <sup>$</sup>
                                </span>

                            </div>

                            ${
                                product.size
                                    ? `
                                        <h6 class="size my-3">
                                            <strong>
                                                Size :
                                            </strong>

                                            <ul class="list-unstyled mb-0">
                                                <li class="active">
                                                    ${String(product.size).toUpperCase()}
                                                </li>
                                            </ul>
                                        </h6>
                                    `
                                    : ""
                            }

                            ${
                                product.color
                                    ? `
                                        <h6 class="color my-3">
                                            <strong>
                                                Color :
                                            </strong>

                                            <ul class="list-unstyled mb-0">
                                                <li
                                                    class="active"
                                                    style="background-color:${product.color}"
                                                ></li>
                                            </ul>
                                        </h6>
                                    `
                                    : ""
                            }

                            <button
                                type="button"
                                class="btn mainButton cart-btn remove btn-danger w-100"
                                data-product-id="${product.id}"
                            >
                                Remove From Cart
                            </button>

                        </div>

                    </div>
                </div>
            `).join("");
    }

    emptyCartMessage();
     initializeEvents() 
}

function updateCartButtons() {
    let cart = getCart();

    let cartIds = cart.map(
        product => String(product.id)
    );

    document
        .querySelectorAll(
            ".cart-btn[data-product-id]"
        )
        .forEach(button => {

            let id =
                String(button.dataset.productId);

            let exists =
                cartIds.includes(id);

            button.textContent =
                exists
                    ? "Remove From Cart"
                    : "Add To Cart";

            button.classList.toggle(
                "remove",
                exists
            );

            button.classList.toggle(
                "add",
                !exists
            );
        });

    initializeEvents();
}

function updatePopupCartButton(productId) {
    document
        .querySelectorAll(
            `.product-popup .popup-cart-btn[data-product-id="${productId}"]`
        )
        .forEach(button => {

            let exists =
                isInCart(productId);

            button.textContent =
                exists
                    ? "Remove From Cart"
                    : "Add To Cart";

            button.classList.toggle(
                "remove",
                exists
            );

            button.classList.toggle(
                "add",
                !exists
            );
        });

         initializeEvents() 
}

function emptyCartMessage() {
    let cart =
        getCart();

    let emptyMessage =
        document.querySelector(
            "#emptyCartMessage"
        );

    let buyNow =
        document.querySelector(
            "#BuyNowBtn"
        );

    if (emptyMessage) {
        emptyMessage.classList.toggle(
            "d-none",
            cart.length !== 0
        );
    }

    if (buyNow) {
        buyNow.classList.toggle(
            "d-none",
            cart.length === 0
        );
    }
}









function initializeEvents() {

 let cartButtons = document.querySelectorAll(
        ".cart-btn[data-product-id]"
    )

    , latestImages = document.querySelectorAll(
        "#Latest .latest-image"
    )

    , latestSizes = document.querySelectorAll(
        "#Latest .sizes"
    )

    , featuredImages = document.querySelectorAll(
        "#Featured .indicators li"
    )

    , productIcons = document.querySelectorAll(
        "#Featured .key[data-product-id]"
    )

    , popupImages = document.querySelectorAll(
        ".product-popup .popup-image"
    )

    , popupSizes = document.querySelectorAll(
        ".product-popup .sizes"
    );

    cartButtons.forEach(button => {
        button.addEventListener("click", handleCartButton);
    });

    latestImages.forEach(image => {
        image.addEventListener("click", handleLatestImage);
    });

    latestSizes.forEach(size => {
        size.addEventListener("click", handleLatestSize);
    });

    featuredImages.forEach(image => {
        image.addEventListener("click", handleFeaturedImage);
    });

    productIcons.forEach(icon => {
        icon.addEventListener("click", handleProductIcon);
    });

    popupImages.forEach(image => {
        image.addEventListener("click", handlePopupImage);
    });

    popupSizes.forEach(size => {
        size.addEventListener("click", handlePopupSize);
    });
}