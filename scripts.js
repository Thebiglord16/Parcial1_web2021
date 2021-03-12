var cart = 0;
var menu = document.querySelector("#menu");
var title = document.querySelector("#menuTitle");
var menuList = document.querySelector("#menuList");
var cartText = document.querySelector("#cart")
var menuLink = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

function agregar(){
    cart +=1;
    cartText.textContent= "items :" + cart
};

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

menu.addEventListener("click" ,function(){
    title.textContent="Menu";
    request(menuLink).then((response)=>{
        response= JSON.parse(response);
        response.forEach(element => {
            console.log(element)
            element.products.forEach(product =>{
                let menuItem = document.createElement("li");
                let cartButton = document.createElement("button")
                cartButton.textContent = "agregar al carrito"
                cartButton.addEventListener("click", agregar)
                menuItem.textContent = "name: " + product.name + "description: " + product.description;
                menuItem.appendChild(cartButton);
                menuList.appendChild(menuItem);
            })
        })
    })
})



