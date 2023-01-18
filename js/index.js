let categoriaCapas = [];
let categoriaColeiras = [];
let categoriaAcessorios = [];
let listaOrdemCateg = [];

function organizaTagCategorias(lista) {

    for (let i = 0; i < lista.length; i++) {

        let itemLista = lista[i];

        if (itemLista.tagCategoria == 'Capas Protetoras Pet para Carro') {
            categoriaCapas.push(itemLista);

        } else if (itemLista.tagCategoria == 'Coleiras, Peitorais e Guias para cães') {
            categoriaColeiras.push(itemLista);

        } else if (itemLista.tagCategoria == 'Acessórios Pet') {
            categoriaAcessorios.push(itemLista);
        }
    }
    listaOrdemCateg = [...categoriaCapas, ...categoriaColeiras, ...categoriaAcessorios];
    return listaOrdemCateg;
}

let resultListaPorCateg = organizaTagCategorias(produtos);
console.log(resultListaPorCateg);


function renderizaCardsVitrine(lista) {

    let itensUl = document.querySelector('.listaProdutosUl');       // Referenciar ul
    itensUl.innerHTML = '';                                         // Setando o valor da ul

    for (let i = 0; i < lista.length; i++) {

        let itemLista = lista[i];

        let li = document.createElement('li');
        let img = document.createElement('img');
        let smallCategoria = document.createElement('small');
        let h4 = document.createElement('h4');
        let p = document.createElement('p');
        let smallValor = document.createElement('small');
        let button = document.createElement('button');
        let imgButon = document.createElement('img');

        li.id = 'dogItem_' + itemLista.id;
        img.src = itemLista.img;
        img.alt = 'Produto'
        smallCategoria.setAttribute('class', 'tagCategoria');
        smallCategoria.innerHTML = itemLista.tagCategoria;
        h4.innerHTML = itemLista.nomeItem;
        p.innerHTML = itemLista.description;
        smallValor.innerHTML = `R$ ${(itemLista.valor).toFixed(2)}`;
        button.id = 'add_' + itemLista.id;
        button.type = 'button';
        button.setAttribute('class', 'itemButton');
        imgButon.src = 'img/sacola-carrinho.png';
        imgButon.alt = 'Icone';
        button.innerHTML = itemLista.addToCart;

        itensUl.appendChild(li);
        li.append(img, smallCategoria, h4, p, smallValor, button);
        button.appendChild(imgButon);

    }
    return itensUl;
}
let resultCardsVitrine = renderizaCardsVitrine(produtos);
// console.log(resultCardsVitrine);

function renderizaCardsPorCategoria() {

    let categTodos = document.querySelector('.categ-todos');
    let categCapas = document.querySelector('.categ-capas');
    let categColeiras = document.querySelector('.categ-coleiras');
    let categAcessorios = document.querySelector('.categ-acessorios');

    categTodos.addEventListener('click', function (e) {
        renderizaCardsVitrine(listaOrdemCateg);
        eventoBotoesComprar(listaOrdemCateg);
    })

    categCapas.addEventListener('click', function (e) {
        renderizaCardsVitrine(categoriaCapas);
        eventoBotoesComprar(categoriaCapas);
    });

    categColeiras.addEventListener('click', function (e) {
        renderizaCardsVitrine(categoriaColeiras);
        eventoBotoesComprar(categoriaColeiras);
    });

    categAcessorios.addEventListener('click', function (e) {
        renderizaCardsVitrine(categoriaAcessorios);
        eventoBotoesComprar(categoriaAcessorios);
    });
}
let result = renderizaCardsPorCategoria();

function createInputBusca() {

    let menuLateral = document.querySelector('aside');

    let section = document.createElement('section');
    let input = document.createElement('input');
    let button = document.createElement('button');
    let imgButton = document.createElement('img');

    section.setAttribute('class', 'search-itens');
    input.setAttribute('class', 'search-entry');
    input.type = 'text';
    input.placeholder = 'Digite aqui o que o seu DOG precisa...';
    button.id = 'button-search';
    imgButton.src = 'https://cdn-icons-png.flaticon.com/128/4044/4044476.png';
    imgButton.alt = 'Lupa de busca';

    menuLateral.appendChild(section);
    section.append(input, button);
    button.appendChild(imgButton);
}
createInputBusca();

let inputBusca = document.querySelector('.search-entry');
let btnBuscar = document.querySelector('#button-search');

function search() {

    let arrResultadoBusca = [];

    let valorInput = inputBusca.value;

    for (let i = 0; i < listaOrdemCateg.length; i++) {

        let itemLista = listaOrdemCateg[i];
        let acessaNomeItem = itemLista.nomeItem.toUpperCase();

        if (acessaNomeItem.includes(valorInput.toUpperCase())) {
            arrResultadoBusca.push(itemLista);
        }
    }
    renderizaCardsVitrine(arrResultadoBusca);
    inputBusca.value = '';                                       //Limpar input ao término da busca  

    return arrResultadoBusca;
}
search();
btnBuscar.addEventListener('click', search);
btnBuscar.addEventListener('click', eventoBotoesComprar);

function createCartEmpty() {

    let menuLateral = document.querySelector('aside');

    let section = document.createElement('section');
    let divHeaderCart = document.createElement('div');
    let imgHeaderCart = document.createElement('img');
    let divTitleHeaderCart = document.createElement('div');
    let h3HeaderCart = document.createElement('h3');
    let divEmptyCart = document.createElement('div');
    // let h3EmptyCart = document.createElement('h3');
    // let pEmptyCart = document.createElement('p');

    let divAmountCart = document.createElement('div');
    let smallQuantAmountCart = document.createElement('small');
    let smallValorAmountCart = document.createElement('small');
    let divSubtotalCart = document.createElement('div');
    let h3SubtotalCart = document.createElement('h3');
    let pSubtotalCart = document.createElement('p');
    let divCheckoutCart = document.createElement('div');
    let buttonCheckoutCart = document.createElement('button');

    section.setAttribute('class', 'shopping-cart');
    divHeaderCart.setAttribute('class', 'header-cart');
    imgHeaderCart.setAttribute('class', 'img-titleCart');
    imgHeaderCart.src = 'img/sacola-carrinho.png';
    imgHeaderCart.alt = 'Logo';
    divTitleHeaderCart.setAttribute('class', 'titleCart');
    h3HeaderCart.innerHTML = 'MEU CARRINHO';
    divEmptyCart.id = 'empty-cart';
    // h3EmptyCart.innerHTML = 'Carrinho DOG Vazio';
    // pEmptyCart.innerHTML = 'Adicione itens';

    divAmountCart.setAttribute('class', 'amount-cart');
    smallQuantAmountCart.innerHTML = 'Quantidade';
    smallValorAmountCart.id = 'count';
    smallValorAmountCart.innerText = 0;
    divSubtotalCart.setAttribute('class', 'subtotal-cart');
    h3SubtotalCart.innerHTML = 'Total:';
    pSubtotalCart.id = 'soma';
    pSubtotalCart.innerHTML = 0;
    divCheckoutCart.setAttribute('class', 'buttonCheckout-cart');
    buttonCheckoutCart.setAttribute('class', 'button-checkout');
    buttonCheckoutCart.innerHTML = 'ESVAZIAR CARRINHO';

    menuLateral.appendChild(section);
    section.append(divHeaderCart, divEmptyCart, divAmountCart, divSubtotalCart, divCheckoutCart);
    divHeaderCart.append(imgHeaderCart, divTitleHeaderCart, h3HeaderCart);
    // divEmptyCart.appendChild(pEmptyCart);
    divAmountCart.append(smallQuantAmountCart, smallValorAmountCart);
    divSubtotalCart.append(h3SubtotalCart, pSubtotalCart);
    divCheckoutCart.appendChild(buttonCheckoutCart);
}
createCartEmpty();

function createSectionExtra() {

    let menuLateral = document.querySelector('aside');
    let sectionExtra = document.createElement('section');
    let imgSectionExtra = document.createElement('img');
    let imgSectionExtra1 = document.createElement('img');

    sectionExtra.id = 'extra';
    imgSectionExtra.setAttribute('class', 'slider');
    imgSectionExtra.src = 'img/Extra-Rosa.png';
    imgSectionExtra.alt = 'Dog';
    imgSectionExtra1.src = 'img/Extra-Adote.png';
    imgSectionExtra1.alt = 'Dog';

    menuLateral.appendChild(sectionExtra);
    sectionExtra.append(imgSectionExtra, imgSectionExtra1);

    return sectionExtra;
}
createSectionExtra();

// Aplicando evento button(comprar);

let emptyCartCount = 0;
let soma = 0;

function eventoBotoesComprar() {

    let botoesComprar = document.querySelectorAll('.itemButton');

    for (let i = 0; i < botoesComprar.length; i++) {
        let botaoComprar = botoesComprar[i];

        botaoComprar.addEventListener('click', function (e) {

            let idBotaoComprar = (e.target.id);
            let idSemPrefixo = parseInt(idBotaoComprar[4]);

            let itemLista = identificaItemLista(idSemPrefixo);

            let card = createCardToCart(itemLista);

            let emptyCart = document.querySelector('#empty-cart');                  // Anexando os cards ao campo (emptyCart);
            emptyCart.appendChild(card);

            emptyCartCount++;                                                       // Atualizando valor contador
            document.querySelector('#count').innerHTML = `${emptyCartCount}`;       // Atualizando qt no carrinho

            soma += itemLista.valor;                                                // Atualizando soma
            document.querySelector('#soma').innerHTML = `R$ ${soma.toFixed(2)}`;    // Atualizando valor no carrinho

        });
    }
}
eventoBotoesComprar();

function identificaItemLista(id) {

    for (let i = 0; i < produtos.length; i++) {

        let item = produtos[i];

        if (id == item.id) {
            return item;
        }
    }

    return `Erro`;
}

function createCardToCart(itemLista) {

    let menuLateral = document.querySelector('aside');

    let sectionAddItens = document.createElement('section');
    let ul = document.createElement('ul');

    let liItensToCart = document.createElement('li');
    let divMainCart = document.createElement('div');
    let divImgMainCart = document.createElement('div');
    let imgMainCart = document.createElement('img');
    let divTextsMainCart = document.createElement('div');
    let h4MainCart = document.createElement('h4');
    let smallMainCart = document.createElement('small');
    let buttonMainCart = document.createElement('button');

    sectionAddItens.setAttribute('class', 'add-itens');
    ul.setAttribute('class', 'add-itensToCart');

    liItensToCart.id = 'cart_' + itemLista.id;
    divMainCart.setAttribute('class', 'main-cart');
    divImgMainCart.setAttribute('class', 'img_main-cart');
    imgMainCart.src = itemLista.img;
    imgMainCart.alt = 'Produto'
    divTextsMainCart.setAttribute('class', 'texts_main-cart');
    h4MainCart.innerHTML = itemLista.nomeItem;
    smallMainCart.innerHTML = `R$ ${itemLista.valor.toFixed(2)}`;

    buttonMainCart.id = 'remove_' + itemLista.id;
    buttonMainCart.setAttribute('class', 'removeItemCart');
    buttonMainCart.innerHTML = 'Remover Dog Item';

    menuLateral.appendChild(sectionAddItens);
    sectionAddItens.appendChild(ul);
    ul.appendChild(liItensToCart);

    liItensToCart.appendChild(divMainCart);
    divMainCart.append(divImgMainCart, divTextsMainCart);
    divImgMainCart.appendChild(imgMainCart);
    divTextsMainCart.append(h4MainCart, smallMainCart, buttonMainCart);


    // Remover elemento do carrinho (individualmente):

    buttonMainCart.addEventListener('click', function (e) {

        if (listaOrdemCateg.length == 0) {
            textoCarrinho.style.display = 'flex';
        }

        liItensToCart.remove();

        emptyCartCount--;                                                        // Atualizando valor contador
        document.querySelector('#count').innerHTML = `${emptyCartCount}`;       // Atualizando qt no carrinho

        soma -= itemLista.valor;                                                 // Atualizando valor total
        document.querySelector('#soma').innerHTML = `R$ ${soma.toFixed(2)}`;    // Printando valor total no carrinho

        if (emptyCartCount < 1) {
            soma = 0;
            document.querySelector('#soma').innerHTML = 0;

        }
    });

    return sectionAddItens;
}
// createCardToCart();


// Ezvaziar todos itens do Carrinho (elemento button):

function esvaziarCarrinho() {

    let buttonEsvaziarCarrinho = document.querySelector('.button-checkout');
    let divEmptyCar = document.querySelector('#empty-cart');

    buttonEsvaziarCarrinho.addEventListener('click', function (event) {

        divEmptyCar.innerHTML = '';
        // let h3 = document.createElement('h3');
        // let p = document.createElement('p');
        // h3.innerHTML = 'Carrinho DOG Vazio';
        // p.innerHTML = 'Adicione itens';
        // divEmptyCar.append(h3, p);

        emptyCartCount = 0;
        document.querySelector('#count').innerHTML = `${emptyCartCount}`;

        soma = 0;
        document.querySelector('#soma').innerHTML = `${soma}`;
    });

}
esvaziarCarrinho();

//Imagem rotativa - Seção Extra:

let tempoRotacao = 2000;
let indexImagem = 0;
let imagens = document.querySelectorAll('#extra img');
let maximo = imagens.length;

function trocaImagem() {

    imagens[indexImagem].classList.remove('selecionado');

    indexImagem++;

    if (indexImagem >= maximo) {
        indexImagem = 0;
    }

    imagens[indexImagem].classList.add('selecionado');
}

function start() {
    setInterval(function (event) {                                  // Método que faz com que a função seja reexecutada com um intervalo de tempo definido a cada execução.
        trocaImagem();
    }, tempoRotacao);
}
window.addEventListener('load', start);




