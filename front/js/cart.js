const cartItems = document.getElementById("cart__items")
const productsFromLocalStorage = getProductOfLocalStorage()


//transformation objet en tableau + récuperation id
for (let [id] of Object.entries(productsFromLocalStorage)) {
  console.log(id)
  //tour des couleurs utilisées
  for (let [color] of Object.entries(productsFromLocalStorage)) {
    console.log(color)
    // mise en place appel API     
    fetch("http://localhost:3000/api/products/" + id)
      .then(function (response) {
        if (response.ok) {
          response.json()
            .then(function (productOfLs) {
              cartItems.innerHTML += `<article class="cart__item" data-id="${productOfLs._id}" data-color="${color}">
                        <div class="cart__item__img">
                          <img src="${productOfLs.imageUrl}" alt="${productOfLs.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${productOfLs.name}</h2>
                            <p>${color}</p>
                            <p>${productOfLs.price}</p>
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
                        </div>
                      </article>`

            })
            .catch(function (err) {
              console.log(err)
            })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}




