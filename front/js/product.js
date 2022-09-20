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
                    let img = document.createElement("img")
                    img.src = product.imageUrl
                    img.alt = product.altTxt
                    itemImg[0].appendChild(img)
                    title.innerHTML = product.name

                    for (let color of product.colors) {
                        let option = document.createElement("option")
                        option.value = color
                        option.innerHTML = color
                        colors.appendChild(option)
                    }
                    //continuer injection prix description
                    //ajouter ecouteur evenement sur bouton ajouter au panier
                    //vérifier couleur et quantité bien sélectionner
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