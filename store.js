
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    //console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
	var button = removeCartItemButtons[i]
	button.addEventListener('click', removeCartItem)
    }

    var qtyInputs = document.getElementsByClassName('cart-qty-input')
    for (var i = 0; i < qtyInputs.length; i++) {
	var input = qtyInputs[i]
	input.addEventListener('change', qtyChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
	var button = addToCartButtons[i]
	button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(event) {
    alert('Thank you for your purchase.')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()) {
	cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var src   = shopItem.getElementsByClassName('shop-item-img')[0].src
    console.log(title, price, src)
    addItemToCart(title, price, src)
    updateCartTotal()
}

function addItemToCart (title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i< cartItemNames.length; i++) {
	if (cartItemNames[i].innerText == title) {
	    alert('This item is already in your cart.')
	    return
	}
    }

    var cartRowContents = `
	  <div class="cart-item cart-col">
	    <img class="cart-item-img" src="${imgSrc}" width="100" 100= height="100">
	    <span class="cart-item-title">${title}</span>
	  </div>
	  <span class="cart-price cart-col">${price}</span>
	  <div class="cart-qty cart-col">
	    <input class="cart-qty-input" type="number" min="1" value="1">
	    <button class="btn btn-danger" role="button">REMOVE</button>
	  </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-qty-input')[0].addEventListener('change', qtyChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function qtyChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
	input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var qtyElement = cartRow.getElementsByClassName('cart-qty-input')[0]
        var price  = parseFloat(priceElement.innerText.replace('$', ''))
        var qty = qtyElement.value
        total = total + (price * qty)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
