const accessToLocalStorage = localStorage

function getProductOfLocalStorage() {
    const products = accessToLocalStorage.getItem("kanapCart")
    if (!products) {
        return {}
    }
    return JSON.parse(products)

}

function updateLocalStorage(products) {
    accessToLocalStorage.setItem("kanapCart", JSON.stringify(products)) //set = définir 

}

function addToCart(id, color, quantity) {
    let items = getProductOfLocalStorage()

    if (items[id]) {
        if (items[id][color]) {
            items[id][color] = parseInt(items[id][color]) + parseInt(quantity)

        } else {
            items[id][color] = parseInt(quantity)
        }

    }
    // si n'existe pas on crée un nouveau
    if (!items[id]) {
        items[id] = {
            [color]: parseInt(quantity)
        }
    }
    //fonction de mise à jour
    updateLocalStorage(items)

}

/**
 * gestion quantite produit
 * @param {string} id 
 * @param {string} color 
 * @param {string} quantity 
 */

function changeProductQuantity(id, color, quantity) {
    let products = getProductOfLocalStorage()
    if (products[id][color]) {
        products[id][color] = quantity
    }
    updateLocalStorage(products)
    //permet de recharger la page
    location.reload()
}

//gestion suppression produit
function removeProduct(id, color) {
    let products = getProductOfLocalStorage()
    if (products[id][color]) {
        // si dans objet ID contient plusieurs couleurs
        if (Object.keys(products[id]).length > 1) {
            delete products[id][color]
        } else {
            delete products[id]
        }
    }
    updateLocalStorage(products)
    location.reload()
}