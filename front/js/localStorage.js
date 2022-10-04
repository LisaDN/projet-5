const accessToLocalStorage = localStorage

function getProductOfLocalStorage() {
    const products = accessToLocalStorage.getItem("kanapCart")
    if (!products) {
        return {}
    }
    return JSON.parse(products)

}

function updateLocalStorage(products) {
    accessToLocalStorage.setItem("kanapCart", JSON.stringify(products))

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

    if (!items[id]) {
        items[id] = {
            [color]: parseInt(quantity)
        }
    }
    //fonction de mise à jour
    updateLocalStorage(items)

}

/**
 * documentation js 
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

//gestion suppression
function removeProduct(id, color) {
    let products = getProductOfLocalStorage()
    if (products[id][color]) {
        if (Object.keys(products[id]).length > 1) {
            delete products[id][color]
        } else {
            delete products[id]
        }
    }
    updateLocalStorage(products)
    location.reload()
}