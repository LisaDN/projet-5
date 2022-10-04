const cartItems = document.getElementById("cart__items")
const productsFromLocalStorage = getProductOfLocalStorage()
let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")
//transformation objet en tableau + récuperation id
for (let [id, colors] of Object.entries(productsFromLocalStorage)) {
  console.log(id)
  //tour des couleurs utilisées
  for (let [color, quantity] of Object.entries(colors)) {

    console.log(color, quantity)
    // mise en place appel API     
    fetch("http://localhost:3000/api/products/" + id)
      .then(function (response) {
        if (response.ok) {
          response.json()
            .then(function (productOfLs) {
              //calcul prix quantite
              const productOfLsPrice = productOfLs.price * quantity
              //injection html 
              cartItems.innerHTML += `<article class="cart__item" data-id="${productOfLs._id}" data-color="${color}">
                        <div class="cart__item__img">
                          <img src="${productOfLs.imageUrl}" alt="${productOfLs.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${productOfLs.name}</h2>
                            <p>${color}</p>
                            <p>${productOfLsPrice}</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`



              //gestion modification quantite

              let addQuantity = document.getElementsByClassName("itemQuantity")

              Object.values(addQuantity).forEach(element => {
                element.addEventListener("change", function () {
                  let article = element.closest("article")
                  let elementId = article.getAttribute("data-id")
                  let elementColor = article.getAttribute("data-color")
                  let elementQuantity = element.value
                  changeProductQuantity(elementId, elementColor, elementQuantity)
                  console.log(element)
                })
              })


              //gestion suppression quantite
              let deleteItems = document.getElementsByClassName("deleteItem")

              Object.values(deleteItems).forEach(deleteItem => {
                deleteItem.addEventListener("click", function () {
                  let article = deleteItem.closest("article")
                  let elementId = article.getAttribute("data-id")
                  let elementColor = article.getAttribute("data-color")
                  removeProduct(elementId, elementColor)

                })
              })

              //gestion quantite total et prix total

            })

        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}




