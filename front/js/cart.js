const cartItems = document.getElementById("cart__items")
console.log(cartItems)
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (productCart) {
                    console.log(productCart)
                    for (let product of products) {
                        console.log(product)
                        cartItems.innerHTML += `<div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${product.colors}</p>
                      <p>${product.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>`
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    })
    .catch(function (error) {
        console.log(error)
    })