const cartItems = document.getElementById("cart__items")
const productsFromLocalStorage = getProductOfLocalStorage()
let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")
let totalOfProduct = 0
let totalCartPrice = 0

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

              // //gestion quantite total
              totalOfProduct += parseInt(quantity)

              totalQuantity.innerHTML = parseInt(totalOfProduct)
              // console.log(totalOfProduct)

              // //gestion prix total

              totalCartPrice += parseInt(productOfLsPrice)

              totalPrice.innerHTML = parseInt(totalCartPrice)

            })

        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

//gestion formulaire

let buttonForm = document.getElementById("order")
let form = document.getElementsByClassName("cart__order__form")
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")
//creation regexp validation form
let nameRegExp = /^[A-ZA-Za-z\é\è\ê\-]+/g
let addressRegExp = /^[a-zA-Z0-9\é\è\ê\-]+/g
let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
let messageError = "Veuillez remplir ce champ"


// verification formulaire rempli
buttonForm.addEventListener('click', function (e) {
  e.preventDefault()
  let verifTotalCount = 0
  // prénom vérif
  if (firstNameVerif(firstName) === true) {
    verifTotalCount = verifTotalCount + 1
  }
  // nom verif
  if (lastNameVerif(lastName) === true) {
    verifTotalCount = verifTotalCount + 1
  }
  // addresse verif
  if (addressVerif(address) === true) {
    verifTotalCount = verifTotalCount + 1
  }
  // ville vérif
  if (cityVerif(city) === true) {
    verifTotalCount = verifTotalCount + 1
  }
  // email vérif
  if (emailVerif(email) === true) {
    verifTotalCount = verifTotalCount + 1
  }

  // vérification les 5 champs remplis
  if (verifTotalCount === 5) {
    //condition envoi commande
    //mise en place objet contenant informations du formulaire de contact
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value
    }
    console.log(contact)
    //tableau contenant id des produits commandés
    let products = []
    for (let [id] of Object.entries(productsFromLocalStorage)) {
      products.push(id)
      console.log(products)
    }

    //Requête envoi commande à l'API

    fetch("http://localhost:3000/api/products/order", {
      method: "POST", //envoi des données 
      headers: {
        // 'Accept': 'application/json',
        'Content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ contact, products })
    })
      .then(function (response) {
        if (response.ok) {
          response.json()
            .then(function (data) {
              console.log(data)
              // redirection + mise en place id commande dans url
              location.replace("/front/html/confirmation.html?id=" + data.orderId)

            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
      .catch(function (error) {
        console.log(error)
      })

  } else {
    alert("vérifier que tous les champs soient bien remplis")
  }

})
//verification prénom
const firstNameVerif = function (firstName) {
  let firstNameError = document.getElementById("firstNameErrorMsg")

  if (firstName.value === "" || firstName.value < 3) {
    firstNameError.innerHTML = messageError
    firstName.style.border = "2px solid red"
  } else if (firstName.value.match(nameRegExp) === null) {
    console.log(firstName.value.match(nameRegExp))
    firstNameError.innerHTML = messageError
    firstName.style.border = "2px solid red"
  } else {
    firstNameError.innerHTML = ""
    firstName.style.border = "2px solid green"
    return true
  }
}
//verification nom
const lastNameVerif = function (lastName) {
  let lastNameError = document.getElementById("lastNameErrorMsg")
  if (lastName.value == "" || lastName.value < 3) {
    lastNameError.innerHTML = messageError
    lastName.style.border = "2px solid red"
  } else if (lastName.value.match(nameRegExp) === null) {
    lastNameError.innerHTML = messageError
    lastName.style.border = "2px solid red"
  }
  else {
    lastNameError.innerHTML = ""
    lastName.style.border = "2px solid green"
    return true
  }
}

// //verification adresse
const addressVerif = function (address) {
  let addressError = document.getElementById("addressErrorMsg")
  if (address.value == "" || address.value < 3) {
    addressError.innerHTML = messageError
    address.style.border = "2px solid red"
  } else if (address.value.match(addressRegExp) === null) {
    address.innerHTML = messageError
    address.style.border = "2px solid red"
  }
  else {
    addressError.innerHTML = ""
    address.style.border = "2px solid green"
    return true
  }
}

// //verification ville

const cityVerif = function (city) {
  let cityError = document.getElementById("cityErrorMsg")
  if (city.value == "" || city.value < 3) {
    cityError.innerHTML = messageError
    city.style.border = "2px solid red"
  } else if (city.value.match(addressRegExp) === null) {
    city.innerHTML = messageError
    city.style.border = "2px solid red"
  }
  else {
    cityError.innerHTML = ""
    city.style.border = "2px solid green"
    return true
  }
}

// //verification email

const emailVerif = function (email) {
  let emailError = document.getElementById("emailErrorMsg")
  if (email.value == "" || email.value < 3) {
    emailError.innerHTML = messageError
    email.style.border = "2px solid red"
  } else if (email.value.match(emailRegExp) === null) {
    email.innerHTML = messageError
    email.style.border = "2px solid red"
  }
  else {
    emailError.innerHTML = ""
    email.style.border = "2px solid green"
    return true
  }
}

//fin fonction formulaire




