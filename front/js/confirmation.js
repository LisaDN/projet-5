
//recherche id dans url
let urlParams = (new URL(location)).searchParams
let id = urlParams.get("id")
console.log(id)

//injection numero commande
let orderId = document.getElementById("orderId")

orderId.innerHTML = id

//efface le local storage
localStorage.clear()