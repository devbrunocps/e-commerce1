let cartItens = document.getElementById("cart-itens")
let emptyy = document.getElementById("emptyy")
let x = document.getElementById("close")
let cartContainer = document.getElementById("cart-container")
let amountCart = document.getElementById("amount-cart")
let text1 = 'GOSTARIA DE ADQUIRIR OS SEGUINTES PRODUTOS:\n'
let total = 0
let idsInCart = []
let itensInCart = []
let idItensInCart = []



let products = {
    name: [],
    code: [],
    amount: [],
    price: []
}

function getChildrensCart() {
    if (localStorage.getItem('iditensincart') != null) {
        let arr3 = JSON.parse(localStorage.getItem('iditensincart'))
        arr3.forEach(valor => {
            idItensInCart.push(valor)
            let card = document.getElementById(valor)
            let info = card.children[2]
            let inf = info.children[0]
            let buy = inf.children[2]
            let b = buy.children[0]
            b.classList.remove("bi")
            b.classList.remove("bi-bag-plus-fill")
            b.classList.add("fas")
            b.classList.add("fa-check")
        })
    }

    if (localStorage.getItem('idsincart') != null) {
        let arr = JSON.parse(localStorage.getItem('idsincart'))
        arr.forEach(value => {
            idsInCart.push(value)
        })

        let arr2 = JSON.parse(localStorage.getItem('itensincart'))
        arr2.forEach(value => {
            itensInCart.push(value)
        })

        for (let i = 0; i < itensInCart.length; i++) {
            let item2 = JSON.parse(localStorage.getItem(('item' + itensInCart[i])))
            let item = item2.replace('max="100"', 'max="100" value="1"')
            let cartItem = document.createElement("div")
            cartItem.classList.add("cart-item")
            cartItem.id = itensInCart[i]
            cartItem.innerHTML = item
            cartItens.appendChild(cartItem)
        }
    }

    products.amount = []
    products.code = []
    products.name = []
    products.price = []

    let next = document.getElementById("next")
    let title = document.getElementById("title")
    let childs = cartItens.childElementCount

    let itens = document.querySelectorAll('#cart-itens > *')
    console.log(itens)

    for (let i = 1; i < itens.length; i++) {
        let nameItem = itens[i].children[1].innerText
        products.name.push(nameItem)

        let amountItem1 = itens[i].children[2]
        let amountItem = amountItem1.children[1].value
        products.amount.push(amountItem)

        let priceItem4 = itens[i].children[2]
        let priceItem3 = priceItem4.children[0].innerText
        let priceItem2 = priceItem3.replace("R$ ", "").replace(",", ".")
        let priceItem1 = Number(priceItem2)
        let priceItemm = priceItem1 * amountItem
        let priceItem = priceItemm.toFixed(2)
        products.price.push(priceItem)

        let code1 = itens[i].children[2]
        let code = code1.children[3].innerText
        products.code.push(code)
    }
    console.log(products)

    amountCart.innerText = products.name.length

    if (childs > 1) {
        emptyy.style.display = "none"
        next.style.display = "flex"
        title.style.display = "flex"
        amountCart.style.display = "flex"
    } else {
        amountCart.style.display = "none"
        emptyy.style.display = "flex"
    }
}

getChildrensCart()


// ABRIR E FECHAR ABA DO CARRINHO

function openCart() {
    cartContainer.style.display = "block"
    let hidden = document.getElementById("hidden")
    hidden.style.display = "block"
    let body = document.getElementById("body")
    body.style.overflow = "hidden"
}

function closeCart() {
    cartContainer.style.display = "none"
    let hidden = document.getElementById("hidden")
    hidden.style.display = "none"
    let body = document.getElementById("body")
    body.style.overflow = "auto"
    cartContainer.classList.remove("payment")
    cartItens.classList.remove("cart-payment")
    let childs = cartItens.childElementCount
    if (childs > 1) {
        let next = document.getElementById("next")
        next.style.display = "flex"
    }

    let itens = document.querySelectorAll('#cart-itens > *')
    for (let i = 1; i < itens.length; i++) {
        let quantity1 = itens[i].children[2]
        let quantity = quantity1.children[1]
        quantity.removeAttribute("disabled")
    }

    let text = document.getElementById("copy-text")
    text.style.display = "none"

    products.amount = []
    products.code = []
    products.name = []
    products.price = []

    let copy = document.getElementById("copy")
    copy.innerText = "COPIAR"
}

function setChildrensCart(cartItem, id4, id3, id) {
    if (idsInCart.includes(id4) == false) {
        idsInCart.push(id4)
    }

    if (idItensInCart.includes(id3) == false) {
        idItensInCart.push(id3)
    }

    if (itensInCart.includes(id) == false) {
        itensInCart.push(id)
    }

    localStorage.setItem(("item" + id), JSON.stringify(cartItem.innerHTML))
    localStorage.setItem('idsincart', JSON.stringify(idsInCart))
    localStorage.setItem('itensincart', JSON.stringify(itensInCart))
    localStorage.setItem('iditensincart', JSON.stringify(idItensInCart))
}

function remChildrensCart(id4, id3, id) {
    let indice4 = idsInCart.indexOf(id4)
    idsInCart.splice(indice4, 1)

    let indice3 = idItensInCart.indexOf(id3)
    idItensInCart.splice(indice3, 1)

    let indice = itensInCart.indexOf(id)
    itensInCart.splice(indice, 1)

    localStorage.removeItem(("item" + id))
    localStorage.setItem('idsincart', JSON.stringify(idsInCart))
    localStorage.setItem('itensincart', JSON.stringify(itensInCart))
    localStorage.setItem('iditensincart', JSON.stringify(idItensInCart))
}

// ADICIONAR PRODUTOS

class AddProducts {
    constructor(img, id, id2, id3, id4, name2, price1, code1) {

        this.id = id
        this.id2 = id2
        this.id3 = id3
        this.id4 = id4

        let image = document.createElement("div")
        image.classList.add("picture")
        let imgclone = img.cloneNode(true);
        image.appendChild(imgclone)
        this.image = image

        let name1 = name2.cloneNode(true)
        this.name1 = name1

        let price = price1.cloneNode(true)
        this.price = price
        this.price1 = price1

        let code = code1.cloneNode(true)
        this.code = code

        let amount = document.createElement("input")
        amount.type = "number"
        amount.name = "amount"
        amount.classList.add("col-2")
        amount.classList.add("btn")
        amount.classList.add("amount")
        amount.id = "amount"
        amount.value = "1"
        amount.min = "1"
        amount.max = "100"
        this.amount = amount

        let removeButton = document.createElement("button")
        removeButton.setAttribute("onclick", "removeItem(this)")
        removeButton.classList.add("btn")
        removeButton.classList.add("buy")
        removeButton.classList.add("col-2")
        removeButton.id = this.id2
        removeButton.innerHTML = '<i class="fas fa-trash"></i>'
        this.removeButton = removeButton

        let inf = document.createElement("div")
        inf.classList.add("inf")
        inf.append(this.price, this.amount, this.removeButton, this.code)
        this.inf = inf
    }
    insertItem() {
        let cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")
        cartItem.id = this.id
        cartItem.append(this.image, this.name1, this.inf)
        console.log(cartItem)

        let parentPrice = this.price1.parentNode
        let btnBuy = parentPrice.children[2]
        let icon = btnBuy.children[0]
        icon.classList.remove("bi")
        icon.classList.remove("bi-bag-plus-fill")
        icon.classList.add("fas")
        icon.classList.add("fa-check")

        function notifyAdd() {
            let not = document.getElementById("notificationAdd")
            not.style.display = "flex"

            setTimeout(() => {
                not.style.display = "none"
            }, 3000)
        }

        // VERIFICANDO SE O ITEM JÁ ESTÁ NO CARRINHO, SE ESTIVER NADA OCORRE, CASO NAO ESTEJA, ELE ADICIONA O ITEM AO CARRINHO E CHAMA A FUNÇÃO PARA EXIBIR A NOTIFICAÇÃO

        if (itensInCart.includes(this.id) == false) {
            cartItens.append(cartItem)
            setChildrensCart(cartItem, this.id4, this.id3, this.id)
            notifyAdd()
        }
    }
    checkEmpty() {
        let next = document.getElementById("next")
        let title = document.getElementById("title")
        let childs = cartItens.childElementCount

        amountCart.innerText = (childs - 1)

        if (childs > 1) {
            emptyy.style.display = "none"
            next.style.display = "flex"
            title.style.display = "flex"
            amountCart.style.display = "flex"
        } else {
            amountCart.style.display = "none"
            emptyy.style.display = "flex"
        }
    }
}


//  INSTANCIAR A CLASSE PRINCIPAL PASSANDO OS ITENS DO PRODUTO CLICADO COMO PARÂMETRO

let btn1 = document.getElementById("buy1")
btn1.addEventListener("click", function () {
    let id = "item1"
    let id2 = "remove1"
    let id3 = "product1"
    let id4 = "1"
    let img = document.querySelector("#product1 .picture").children[0]
    let name2 = document.querySelector("#product1").children[1]
    let price1 = document.querySelector("#product1 .info .inf").children[0]
    let code1 = document.querySelector("#product1 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn2 = document.getElementById("buy2")
btn2.addEventListener("click", function () {
    let id = "item2"
    let id2 = "remove2"
    let id3 = "product2"
    let id4 = "2"
    let img = document.querySelector("#product2 .picture").children[0]
    let name2 = document.querySelector("#product2").children[1]
    let price1 = document.querySelector("#product2 .info .inf").children[0]
    let code1 = document.querySelector("#product2 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn3 = document.getElementById("buy3")
btn3.addEventListener("click", function () {
    let id = "item3"
    let id2 = "remove3"
    let id3 = "product3"
    let id4 = "3"
    let img = document.querySelector("#product3 .picture").children[0]
    let name2 = document.querySelector("#product3").children[1]
    let price1 = document.querySelector("#product3 .info .inf").children[0]
    let code1 = document.querySelector("#product3 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn4 = document.getElementById("buy4")
btn4.addEventListener("click", function () {
    let id = "item4"
    let id2 = "remove4"
    let id3 = "product4"
    let id4 = "4"
    let img = document.querySelector("#product4 .picture").children[0]
    let name2 = document.querySelector("#product4").children[1]
    let price1 = document.querySelector("#product4 .info .inf").children[0]
    let code1 = document.querySelector("#product4 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn5 = document.getElementById("buy5")
btn5.addEventListener("click", function () {
    let id = "item5"
    let id2 = "remove5"
    let id3 = "product5"
    let id4 = "5"
    let img = document.querySelector("#product5 .picture").children[0]
    let name2 = document.querySelector("#product5").children[1]
    let price1 = document.querySelector("#product5 .info .inf").children[0]
    let code1 = document.querySelector("#product5 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn6 = document.getElementById("buy6")
btn6.addEventListener("click", function () {
    let id = "item6"
    let id2 = "remove6"
    let id3 = "product6"
    let id4 = "6"
    let img = document.querySelector("#product6 .picture").children[0]
    let name2 = document.querySelector("#product6").children[1]
    let price1 = document.querySelector("#product6 .info .inf").children[0]
    let code1 = document.querySelector("#product6 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn7 = document.getElementById("buy7")
btn7.addEventListener("click", function () {
    let id = "item7"
    let id2 = "remove7"
    let id3 = "product7"
    let id4 = "7"
    let img = document.querySelector("#product7 .picture").children[0]
    let name2 = document.querySelector("#product7").children[1]
    let price1 = document.querySelector("#product7 .info .inf").children[0]
    let code1 = document.querySelector("#product7 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn8 = document.getElementById("buy8")
btn8.addEventListener("click", function () {
    let id = "item8"
    let id2 = "remove8"
    let id3 = "product8"
    let id4 = "8"
    let img = document.querySelector("#product8 .picture").children[0]
    let name2 = document.querySelector("#product8").children[1]
    let price1 = document.querySelector("#product8 .info .inf").children[0]
    let code1 = document.querySelector("#product8 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn9 = document.getElementById("buy9")
btn9.addEventListener("click", function () {
    let id = "item9"
    let id2 = "remove9"
    let id3 = "product9"
    let id4 = "9"
    let img = document.querySelector("#product9 .picture").children[0]
    let name2 = document.querySelector("#product9").children[1]
    let price1 = document.querySelector("#product9 .info .inf").children[0]
    let code1 = document.querySelector("#product9 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn10 = document.getElementById("buy10")
btn10.addEventListener("click", function () {
    let id = "item10"
    let id2 = "remove10"
    let id3 = "product10"
    let id4 = "10"
    let img = document.querySelector("#product10 .picture").children[0]
    let name2 = document.querySelector("#product10").children[1]
    let price1 = document.querySelector("#product10 .info .inf").children[0]
    let code1 = document.querySelector("#product10 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn11 = document.getElementById("buy11")
btn11.addEventListener("click", function () {
    let id = "item11"
    let id2 = "remove11"
    let id3 = "product11"
    let id4 = "11"
    let img = document.querySelector("#product11 .picture").children[0]
    let name2 = document.querySelector("#product11").children[1]
    let price1 = document.querySelector("#product11 .info .inf").children[0]
    let code1 = document.querySelector("#product11 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});

let btn12 = document.getElementById("buy12")
btn12.addEventListener("click", function () {
    let id = "item12"
    let id2 = "remove12"
    let id3 = "product12"
    let id4 = "12"
    let img = document.querySelector("#product12 .picture").children[0]
    let name2 = document.querySelector("#product12").children[1]
    let price1 = document.querySelector("#product12 .info .inf").children[0]
    let code1 = document.querySelector("#product12 .info .inf").children[3]
    let add = new AddProducts(img, id, id2, id3, id4, name2, price1, code1)
    add.insertItem()
    add.checkEmpty()
});


//  HABILITAR E DESABILITAR DESCRIÇÃO DOS PRODUTOS

function descOn(button) {
    let inf = button.parentNode
    let inf1 = inf.parentNode
    let inf2 = inf1.parentNode
    let pic = inf2.children[0]
    let pic2 = pic.children[1]
    pic2.style.display = "flex"
}

function descOff(button) {
    let inf = button.parentNode
    let inf1 = inf.parentNode
    let inf2 = inf1.parentNode
    let pic = inf2.children[0]
    let pic2 = pic.children[1]
    pic2.style.display = "none"
}

//  REMOVER ITENS DO CARRINHO

function removeItem(button) {
    if (button.id == "remove1") {
        let btn1 = document.getElementById("buy1").children[0]
        btn1.classList.remove("bi-check")
        btn1.classList.add("bi-bag-plus-fill")
        let id = "item1"
        let id4 = "1"
        let id3 = "product1"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove2") {
        let btn2 = document.getElementById("buy2").children[0]
        btn2.classList.remove("bi-check")
        btn2.classList.add("bi-bag-plus-fill")
        let id = "item2"
        let id4 = "2"
        let id3 = "product2"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove3") {
        let btn3 = document.getElementById("buy3").children[0]
        btn3.classList.remove("bi-check")
        btn3.classList.add("bi-bag-plus-fill")
        let id = "item3"
        let id4 = "3"
        let id3 = "product3"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove4") {
        let btn4 = document.getElementById("buy4").children[0]
        btn4.classList.remove("bi-check")
        btn4.classList.add("bi-bag-plus-fill")
        let id = "item4"
        let id4 = "4"
        let id3 = "product4"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove5") {
        let btn5 = document.getElementById("buy5").children[0]
        btn5.classList.remove("bi-check")
        btn5.classList.add("bi-bag-plus-fill")
        let id = "item5"
        let id4 = "5"
        let id3 = "product5"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove6") {
        let btn6 = document.getElementById("buy6").children[0]
        btn6.classList.remove("bi-check")
        btn6.classList.add("bi-bag-plus-fill")
        let id = "item6"
        let id4 = "6"
        let id3 = "product6"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove7") {
        let btn7 = document.getElementById("buy7").children[0]
        btn7.classList.remove("bi-check")
        btn7.classList.add("bi-bag-plus-fill")
        let id = "item7"
        let id4 = "7"
        let id3 = "product7"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove8") {
        let btn8 = document.getElementById("buy8").children[0]
        btn8.classList.remove("bi-check")
        btn8.classList.add("bi-bag-plus-fill")
        let id = "item8"
        let id4 = "8"
        let id3 = "product8"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove9") {
        let btn9 = document.getElementById("buy9").children[0]
        btn9.classList.remove("bi-check")
        btn9.classList.add("bi-bag-plus-fill")
        let id = "item9"
        let id4 = "9"
        let id3 = "product9"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove10") {
        let btn10 = document.getElementById("buy10").children[0]
        btn10.classList.remove("bi-check")
        btn10.classList.add("bi-bag-plus-fill")
        let id = "item10"
        let id4 = "10"
        let id3 = "product10"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove11") {
        let btn11 = document.getElementById("buy11").children[0]
        btn11.classList.remove("bi-check")
        btn11.classList.add("bi-bag-plus-fill")
        let id = "item11"
        let id4 = "11"
        let id3 = "product11"
        remChildrensCart(id4, id3, id)
    } else if (button.id == "remove12") {
        let btn12 = document.getElementById("buy12").children[0]
        btn12.classList.remove("bi-check")
        btn12.classList.add("bi-bag-plus-fill")
        let id = "item12"
        let id4 = "12"
        let id3 = "product12"
        remChildrensCart(id4, id3, id)
    }

    function notifyRem() {
        let not = document.getElementById("notificationRem")
        not.style.display = "flex"

        setTimeout(() => {
            not.style.display = "none"
        }, 3000)
    }

    let remove = button.parentNode
    let remove1 = remove.parentNode
    document.getElementById("cart-itens").removeChild(remove1)
    notifyRem()
    let next = document.getElementById("next")
    let title = document.getElementById("title")
    let text = document.getElementById("copy-text")
    let childs = cartItens.childElementCount
    if (childs > 1) {
        emptyy.style.display = "none"
        amountCart.style.display = "flex"
    } else {
        amountCart.style.display = "none"
        cartContainer.classList.remove("payment")
        cartItens.classList.remove("cart-payment")
        emptyy.style.display = "flex"
        next.style.display = "none"
        title.style.display = "none"
        text.style.display = "none"
    }

    products.amount = []
    products.code = []
    products.name = []
    products.price = []

    let itens = document.querySelectorAll('#cart-itens > *')
    console.log(itens)

    for (let i = 1; i < itens.length; i++) {
        let nameItem = itens[i].children[1].innerText
        products.name.push(nameItem)

        let amountItem1 = itens[i].children[2]
        let amountItem = amountItem1.children[1].value
        products.amount.push(amountItem)

        let priceItem4 = itens[i].children[2]
        let priceItem3 = priceItem4.children[0].innerText
        let priceItem2 = priceItem3.replace("R$ ", "").replace(",", ".")
        let priceItem1 = Number(priceItem2)
        let priceItemm = priceItem1 * amountItem
        let priceItem = priceItemm.toFixed(2)
        products.price.push(priceItem)

        let code1 = itens[i].children[2]
        let code = code1.children[3].innerText
        products.code.push(code)
    }
    let copy = document.getElementById("copy")
    copy.innerText = "COPIAR"
    console.log(products)

    amountCart.innerText = products.name.length
}

function payment() {
    products.amount = []
    products.code = []
    products.name = []
    products.price = []
    let next = document.getElementById("next")
    let itens = document.querySelectorAll('#cart-itens > *')
    console.log(itens)
    next.style.display = "none"
    cartContainer.classList.add("payment")
    cartItens.classList.add("cart-payment")
    let title = document.getElementById("title")
    title.style.marginTop = "14vh"
    cartContainer.style.overflow = "hidden"

    for (let i = 1; i < itens.length; i++) {
        let nameItem = itens[i].children[1].innerText
        products.name.push(nameItem)

        let amountItem1 = itens[i].children[2]
        let amountItem = amountItem1.children[1].value
        products.amount.push(amountItem)

        let priceItem4 = itens[i].children[2]
        let priceItem3 = priceItem4.children[0].innerText
        let priceItem2 = priceItem3.replace("R$ ", "").replace(",", ".")
        let priceItem1 = Number(priceItem2)
        let priceItemm = priceItem1 * amountItem
        let priceItem = Number(priceItemm.toFixed(2))
        products.price.push(priceItem)

        let code1 = itens[i].children[2]
        let code = code1.children[3].innerText
        products.code.push(code)

        let quantity1 = itens[i].children[2]
        let quantity = quantity1.children[1]
        quantity.setAttribute("disabled", "disabled")
    }

    console.log(products)

    function copyText() {
        let text = document.getElementById("copy-text")
        text.style.display = "flex"
        title.style.marginTop = "2vh"

        setTimeout(() => {
            cartContainer.style.overflow = "auto"
        }, 1100)
    }
    copyText()
}



function copiarTexto(button) {
    button.innerText = "COPIADO"
    total = +0
    text1 = 'Olá Cláudia, gostaria de adquirir os seguintes produtos:\n'
    for (let i = 0; i < products.name.length; i++) {
        text1 += products.amount[i] + " produto(s) de código #" + products.code[i] + "\n"
        let price = +products.price[i]
        total += price
    }
    let total1 = total.toFixed(2)
    total1 += ''
    text1 += "Totalizando R$" + total1.replace(".", ",")
    console.log(text1)
    navigator.clipboard.writeText(text1)
}
