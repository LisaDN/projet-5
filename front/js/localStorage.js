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

    updateLocalStorage(items)
}