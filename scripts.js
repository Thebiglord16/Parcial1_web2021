let cart = [];
let itemTotal = 0;
let totalPrice = 0;
let burgers = document.querySelector("#burgers");
let tacos = document.querySelector("#tacos");
let salads = document.querySelector("#salads");
let desserts = document.querySelector("#desserts");
let drinks = document.querySelector("#drinks");
let title = document.querySelector("#menuTitle");
let cartLogo = document.querySelector("#cartItem");
let cancel = document.querySelector("#cancelBtn");
let burgerList = [];
let tacosList = [];
let saladsList = [];
let dessertsList = [];
let drinksList = [];
let cartText = document.querySelector("#cart");
let listaMenu = document.querySelector("#listaMenu");
let menuLink = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

function request(url) {
    return new Promise((resolve) => {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = () =>{
            if(req.status == 200) {
                resolve(req.response);
            }   
        };
        req.send();
    });
}

cartLogo.addEventListener("click", ()=>{
    removeChilds();
    title = document.createElement("h1");
    table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-striped");
    tableTitle = document.createElement("thead");
    titleTR = document.createElement("tr");
    itemTh = document.createElement("th");
    itemTh.textContent = "Item";
    quantityTh = document.createElement("th");
    quantityTh.textContent = "Qty.";
    descriptionTh = document.createElement("th");
    descriptionTh.textContent = "Description";
    priceTh = document.createElement("th");
    priceTh.textContent = "Price";
    amountTh = document.createElement("th");
    amountTh.textContent = "amount";
    modifyTh = document.createElement("th");
    modifyTh.textContent = "Modify";
    titleTR.appendChild(itemTh);
    titleTR.appendChild(quantityTh);
    titleTR.appendChild(descriptionTh);
    titleTR.appendChild(priceTh);
    titleTR.appendChild(amountTh);
    titleTR.appendChild(modifyTh);

    title.classList.add("titulo-menu");
    title.textContent = "Order detail";
    titleHR1 = document.createElement("hr");
    titleHR2 = document.createElement("hr");
    tableTitle.appendChild(titleTR);
    table.appendChild(tableTitle);
    tableBody = document.createElement("tbody");
    let count = 0;
    let total = 0;
    cart.forEach(element =>{
        count +=1;
        currentTR = document.createElement("tr");
        currentItemTh = document.createElement("th");
        currentItemTh.textContent = count;
        currentQuantityTd = document.createElement("td");
        currentQuantityTd.id = "quantity" + count;
        currentQuantityTd.textContent = element.quantity;
        currentDescriptionTd = document.createElement("td");
        currentDescriptionTd.textContent = element.name;
        currentPriceTd = document.createElement("td");
        currentPriceTd.textContent = element.price;
        currentAmountTd = document.createElement("td");
        currentAmountTd.textContent = element.price * element.quantity;
        currentAmountTd.id= "amount" + count;
        currentModifyTd = document.createElement("td");
        addButton = document.createElement("button");
        addButton.classList.add("btn");
        addButton.classList.add("btn-secondary");
        addButton.textContent = "+";
        addButton.id = "btnAdd" +count;
        lessButton = document.createElement("button");
        lessButton.classList.add("btn");
        lessButton.classList.add("btn-secondary");
        lessButton.textContent = "-";
        lessButton.id = "btnLess" +count;
        currentModifyTd.appendChild(addButton);
        currentModifyTd.appendChild(lessButton);
        currentTR.appendChild(currentItemTh);
        currentTR.appendChild(currentQuantityTd);
        currentTR.appendChild(currentDescriptionTd);
        currentTR.appendChild(currentPriceTd);
        currentTR.appendChild(currentAmountTd);
        currentTR.appendChild(currentModifyTd);
        tableBody.appendChild(currentTR);
        total += element.quantity * element.price;
    });
    table.appendChild(tableBody);
    listaMenu.appendChild(titleHR1);
    listaMenu.appendChild(title);
    listaMenu.appendChild(titleHR2);
    listaMenu.appendChild(table);
    finOrden = document.createElement("div");
    fin = document.createElement("p");
    fin.id = "fin";
    finOrden.classList.add("row");
    fin.textContent = "Total: $" + total;
    finOrden.appendChild(fin);
    totalPrice = total;
    buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-orden");
    cancelButton = document.createElement("button");
    cancelButton.classList.add("btn");
    cancelButton.classList.add("btn-danger");
    cancelButton.type = "button";
    cancelButton.dataset.toggle = "modal";
    cancelButton.dataset.target ="#cancelModal";
    cancelButton.textContent = "cancel";
    confirmButton = document.createElement("button");
    confirmButton.classList.add("btn");
    confirmButton.classList.add("btn-succes");
    confirmButton.textContent = "Confirm Order";
    confirmButton.addEventListener("click", confirmar);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    finOrden.appendChild(buttonContainer);
    listaMenu.appendChild(finOrden);
    setBillEvents();
});

cancel.addEventListener("click", ()=>{
    itemTotal = 0;
    cart = [];
    cartText.textContent = itemTotal + " items";
    removeChilds();
});

function addItem(currentItem) {
    const fin = document.querySelector("#fin");
    totalPrice += currentItem.price;
    itemTotal+=1;
    fin.textContent ="Total: $" + totalPrice;
    cartText.textContent = itemTotal + " Items";
}

function reduceItem(currentItem) {
    const fin = document.querySelector("#fin");
    totalPrice -= currentItem.price;
    itemTotal-=1;
    fin.textContent ="Total: $" + totalPrice;
    cartText.textContent = itemTotal + " Items";
}

function setBillEvents() {
    for(let i = 0; i<cart.length; i++) {
        const current = i+1;
        const currentItem = cart[i];
        const lessBtn = document.querySelector("#btnLess"+current);
        const addBtn = document.querySelector("#btnAdd"+current);
        addBtn.addEventListener("click", ()=> {
            const quantity = document.querySelector("#quantity"+current);
            const amount = document.querySelector("#amount"+current);       
            currentItem.quantity +=1;
            quantity.textContent = currentItem.quantity;
            amount.textContent = currentItem.quantity * currentItem.price;           
            addItem(currentItem);
        });

        lessBtn.addEventListener("click", () => {
            const quantity = document.querySelector("#quantity"+current);
            const amount = document.querySelector("#amount"+current);
            if(currentItem.quantity > 0) {
                currentItem.quantity -= 1;
                quantity.textContent = currentItem.quantity;
                amount.textContent = currentItem.quantity * currentItem.price;
                reduceItem(currentItem);
            }
            
        });
    }
}

function removeChilds() {
    listaMenu.innerHTML= "";
}

function confirmar() {
    // eslint-disable-next-line no-console
    console.log(cart);
}

function addMenuListener(component, list, componentName) {
    component.addEventListener( "click", ()=> {
        removeChilds();
        title = document.createElement("h1");
        title.classList.add("titulo-menu");
        title.textContent = componentName;
        titleHR1 = document.createElement("hr");
        titleHR2 = document.createElement("hr");
        items = document.createElement("div");
        items.classList.add("row");
        list.forEach(element =>{
            card = createCard(element);
            items.appendChild(card);
        });
        listaMenu.appendChild(titleHR1);
        listaMenu.appendChild(title);
        listaMenu.appendChild(titleHR2);
        listaMenu.appendChild(items);
    });
}

function createCard(product) {
    container = document.createElement("div");
    container.classList.add("col-sm-4");
    card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("h-100");
    cardPicture = document.createElement("img");
    cardPicture.classList.add("card-img-top");
    cardPicture.classList.add("h-60");
    cardPicture.src = product.image;
    cardPicture.alt = product.name;
    cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.name;
    cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.textContent = product.description;
    cardPrice = document.createElement("p");
    cardPrice.id = "price";
    cardPrice.classList.add("card-text");
    cardPrice.textContent = "$" + product.price;
    button = document.createElement("a");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("agregar");
    button.textContent = "Add to cart";
    button.addEventListener("click", ()=>{
        alreadyAdded = false; 
        cart.forEach(element=>{
            if(element.name===product.name) {
                element.quantity +=1;
                itemTotal +=1;
                alreadyAdded = true;
            }
        });
        if(!alreadyAdded) {
            item = product;
            item.quantity = 1;
            cart.push(item);
            itemTotal+=1;
        }
        cartText.textContent = itemTotal + " items";
    }, true);
    card.appendChild(cardPicture);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    container.appendChild(card);
    return container;
}
function startApp() {
    request(menuLink).then((response)=>{
        response = JSON.parse(response);
        response.forEach(element =>{
            if(element.name==="Burguers") {
                burgerList = element.products;
            }
            else if(element.name==="Tacos") { 
                tacosList = element.products;
            }
            else if(element.name==="Salads") {
                saladsList = element.products;
            }
            else if(element.name==="Desserts") {
                dessertsList = element.products;
            }
            else if(element.name==="Drinks and Sides") {
                drinksList = element.products;
            }
        });
        addMenuListener(burgers, burgerList, "Burgers");
        addMenuListener(tacos, tacosList, "Tacos");
        addMenuListener(salads, saladsList, "Salads");
        addMenuListener(desserts, dessertsList, "Desserts");
        addMenuListener(drinks, drinksList, "Drinks and Sides");
    });
}

startApp();




