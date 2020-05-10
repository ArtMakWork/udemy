window.addEventListener("DOMContentLoaded",function(){
    
    let products    = document.querySelectorAll(".product");
    let buttons     = document.querySelectorAll("button");
    let openBtn     = document.querySelector(".open");

    function createCart(){
        let cart        = document.createElement("div");
        let field        = document.createElement("div");
        let heading     = document.createElement("h2");
        let closeBtn    = document.createElement("button");
        
        cart.classList.add("cart");
        field.classList.add("cart-field");
        closeBtn.classList.add("close");

        heading.textContent = "In our Cart:";
        closeBtn.textContent = "Close";

        document.body.appendChild(cart);
        cart.appendChild(heading);
        cart.appendChild(field);
        cart.appendChild(closeBtn);
    }

    createCart();

    let cart        = document.querySelector('.cart');
    let field       = document.querySelector('.cart-field');
    let closeBtn    = document.querySelector('.close');

    function openCart(){
        cart.style.display = "block";
    }
    
    function closeCart(){
        cart.style.display = "none";
    }

    openBtn.addEventListener("click", openCart);
    closeBtn.addEventListener("click", closeCart);

    /*for(let i = 0; buttons.length;i++){
        buttons[i].addEventListener('click',function(){
            let item = products[i].cloneNode(true);
            let btn = item.querySelector("button");
            
            btn.remove();
            field.appendChild(item);

            products[i].remove();
        });
    }*/

    buttons.forEach(function(item, i){
        item.addEventListener('click',function(){
            let item = products[i].cloneNode(true);
            let btn = item.querySelector("button");
            
            btn.remove();
            field.appendChild(item);

            products[i].remove();
        });
    });
});