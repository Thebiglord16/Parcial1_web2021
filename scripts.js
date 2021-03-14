var cart = [];
var itemTotal = 0;
var totalPrice = 0;
var burgers = document.querySelector("#burgers");
var tacos = document.querySelector("#tacos");
var salads = document.querySelector("#salads");
var desserts = document.querySelector("#desserts");
var drinks = document.querySelector("#drinks");
var title = document.querySelector("#menuTitle");
var cartLogo = document.querySelector("#cartItem");
var cancel = document.querySelector("#cancelBtn");
var burgerList = [];
var tacosList = [];
var saladsList = [];
var dessertsList = [];
var drinksList = [];
var cartText = document.querySelector("#cart")
var listaMenu = document.querySelector("#listaMenu")
var menuLink = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

function request(url){
    return new Promise((resolve, reject)=>{
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = () =>{
          if(req.status == 200) resolve(req.response);    
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
    var count = 0;
    var total = 0;
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
})

cancel.addEventListener("click", ()=>{
    itemTotal = 0;
    cart = [];
    cartText.textContent = itemTotal + " items";
    removeChilds();
})

function setBillEvents(){
    for(let i = 0; i<cart.length; i++){
        const current = i+1;
        const currentItem = cart[i];
        const lessBtn = document.querySelector("#btnLess"+current);
        const addBtn = document.querySelector("#btnAdd"+current);
        addBtn.addEventListener("click", (e)=>{
            quantity = document.querySelector("#quantity"+current);
            amount = document.querySelector("#amount"+current);
            fin = document.querySelector("#fin");
            currentItem.quantity +=1;
            quantity.textContent = currentItem.quantity;
            amount.textContent = currentItem.quantity * currentItem.price;
            totalPrice += currentItem.price;
            fin.textContent ="Total: $" + totalPrice;
            itemTotal+=1;
            cartText.textContent = itemTotal + " Items"
        })
        lessBtn.addEventListener("click", (e)=>{
            quantity = document.querySelector("#quantity"+current);
            amount = document.querySelector("#amount"+current);
            fin = document.querySelector("#fin");
            if(currentItem.quantity > 0){
                currentItem.quantity -=1;
                quantity.textContent = currentItem.quantity;
                amount.textContent = currentItem.quantity * currentItem.price;
                totalPrice -= currentItem.price;
                fin.textContent ="Total: $" + totalPrice;
                itemTotal-=1;
                cartText.textContent = itemTotal + " Items"
            }
            
        })
    }
}

function removeChilds(){
    listaMenu.innerHTML='';
}

function confirmar(){
    console.log(cart);
}

function addMenuListener(component, list, componentName){
    component.addEventListener("click", ()=>{
        removeChilds();
        title = document.createElement("h1");
        title.classList.add("titulo-menu");
        title.textContent = componentName;
        titleHR1 = document.createElement("hr");
        titleHR2 = document.createElement("hr");
        items = document.createElement("div");
        items.classList.add("row")
        list.forEach(element =>{
            card = createCard(element);
            items.appendChild(card);
        })
        listaMenu.appendChild(titleHR1);
        listaMenu.appendChild(title);
        listaMenu.appendChild(titleHR2);
        listaMenu.appendChild(items);
    })
}

function createCard(product){
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
    cardDescription.classList.add("card-title");
    cardDescription.textContent = product.description;
    button = document.createElement("a");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("agregar")
    button.textContent = "Add to cart";
    button.addEventListener("click", ()=>{
        alreadyAdded = false; 
        cart.forEach(element=>{
            if(element.name===product.name){
                element.quantity +=1;
                itemTotal +=1;
                alreadyAdded = true;
            }
        });
        if(!alreadyAdded){
            item = product;
            item.quantity = 1;
            cart.push(item);
            itemTotal+=1;
        };
        cartText.textContent = itemTotal + " items";
    }, true);
    card.appendChild(cardPicture);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    container.appendChild(card);
    return container;
}
function startApp(){
    request(menuLink).then((response)=>{
        response = JSON.parse(response);
        response.forEach(element =>{
            if(element.name==="Burguers") burgerList = element.products;
            else if(element.name==="Tacos") tacosList = element.products;
            else if(element.name==="Salads") saladsList = element.products;
            else if(element.name==="Desserts") dessertsList = element.products;
            else if(element.name==="Drinks and Sides") drinksList = element.products;
        })
        console.log("carta:");
        console.log(burgerList);
        console.log(tacosList);
        console.log(saladsList);
        console.log(dessertsList);
        console.log(drinksList);
        addMenuListener(burgers, burgerList, "Burgers");
        addMenuListener(tacos, tacosList, "Tacos");
        addMenuListener(salads, saladsList, "Salads");
        addMenuListener(desserts, dessertsList, "Desserts");
        addMenuListener(drinks, drinksList, "Drinks and Sides");
    })
}

startApp();




