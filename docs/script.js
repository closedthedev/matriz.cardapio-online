let order = [];

function addItem(name, price) {
    const quantity = 1;
    order.push({ name, price, quantity });
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    let total = 0;

    order.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.quantity} x ${item.name}: R$ ${itemTotal.toFixed(2)}
            <button onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsElement.appendChild(listItem);
    });

    document.getElementById('cartTotal').textContent = `\nTotal: R$ ${total.toFixed(2)}`;
}

function openCartPopup() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'block';
    updateCart();
}

function closeCartPopup() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'none';
}

function removeItem(index) {
    order.splice(index, 1);
    updateCart();
}

function sendOrder() {
    if (order.length === 0) {
        alert("Seu pedido está vazio.");
        return;
    }

    let message = "Olá, gostaria de fazer o seguinte pedido:\n";
    let total = 0;

    order.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `- ${item.quantity} x ${item.name}: R$ ${itemTotal.toFixed(2)}\n`;
        total += itemTotal;
    });

    message += `\nTotal: R$ ${total.toFixed(2)}`;

    const whatsappNumber = "5521999999999";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
}

// Adicionando event listeners para abrir e fechar o popup do carrinho
document.getElementById('openCartButton').addEventListener('click', openCartPopup);
document.getElementById('closeCartPopup').addEventListener('click', closeCartPopup);

// Fechar o popup do carrinho quando clicar fora dele
window.onclick = function(event) {
    const cartPopup = document.getElementById('cartPopup');
    if (event.target === cartPopup) {
        closeCartPopup();
    }
};

// Função para abrir o popup
function openPopup() {
    document.getElementById('popup').style.display = "block";
}

// Função para fechar o popup
function closePopup() {
    document.getElementById('popup').style.display = "none";
}

// Adicionar event listener para fechar o popup ao clicar no botão "close"
document.getElementsByClassName('close')[0].onclick = function() {
    closePopup();
}

// Adicionar event listener para fechar o popup ao clicar fora do conteúdo do popup
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target == popup) {
        closePopup();
    }
}

// Seleciona todos os elementos com a classe 'gridProducts' e adiciona o evento de clique a cada um
var products = document.getElementsByClassName('gridProducts');

for (var i = 0; i < products.length; i++) {
    products[i].addEventListener('click', function(event) {
        // Verifica se o clique não foi no botão "Adicionar"
        if (!event.target.closest('.botaoAdicionar')) {
            var productName = this.getAttribute('data-name');
            var productDescription = this.getAttribute('data-description');
            var productImage = this.getAttribute('data-image');
            
            // Atualiza o conteúdo do popup
            document.getElementById('popup-title').textContent = productName;
            document.getElementById('popup-description').textContent = productDescription;
            document.getElementById('popup-image').src = productImage;

            // Abre o popup
            openPopup();
        }
    });
}

// Seleciona todos os botões "Adicionar" e adiciona o evento de clique a cada um
var buttons = document.getElementsByClassName('botaoAdicionar');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
        var button = this;
        button.textContent = 'Adicionado ao carrinho'; // Altera o texto do botão para "Adicionado"
        button.classList.add('changed'); // Adiciona a classe para alterar a cor do botão

        setTimeout(function() {
            button.textContent = 'Adicionar'; // Retorna o texto do botão para "Adicionar"
            button.classList.remove('changed'); // Remove a classe após 3 segundos
        }, 3000); // 3000 milissegundos = 3 segundos

        event.stopPropagation(); // Previne que o clique no botão feche o popup
    });
}
