let urlParams = (new URL(location)).searchParams
let id = urlParams.get("id")
let itemImg = document.getElementsByClassName("item__img")
let title = document.getElementById("title")
let price = document.getElementById("price")
let description = document.getElementById("description")
let colors = document.getElementById("colors")

fetch("http://localhost:3000/api/products/" + id)
    .then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (product) {
                    console.log(product)
                    //injection image
                    let img = document.createElement("img")
                    img.src = product.imageUrl
                    img.alt = product.altTxt
                    itemImg[0].appendChild(img)
                    title.innerHTML = product.name
                    //injection choix couleurs 
                    for (let color of product.colors) {
                        let option = document.createElement("option")
                        option.value = color
                        option.innerHTML = color
                        colors.appendChild(option)
                    }
                    //injection prix 
                    let prices = document.createElement("prices")
                    prices = product.price
                    price.innerHTML = product.price

                    //injection description
                    let descriptions = document.createElement("descriptions")
                    descriptions = product.description
                    description.innerHTML = product.description

                    //ajouter ecouteur evenement sur bouton ajouter au panier
                    let addButton = document.getElementById("addToCart")
                    addButton.addEventListener('click', valider)
                    //vérifier couleur et quantité bien sélectionner
                    let quantity = document.getElementById("quantity")
                    let buttonText = "ajouté !"
                    function valider() {
                        if (colors.value != "" && quantity.value != "0") {
                            //alert("Votre panier a été ajouté")
                            addButton.innerText = buttonText
                        } else {
                            alert("Merci de remplir tous les champs")
                        }
                    }

                    //créer un nouveau script + creer fonction (rajouter dans product.html) ne pas oublier :appeler dans script.js(add to cart)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    })
    .catch(function (error) {
        console.log(error)
    })