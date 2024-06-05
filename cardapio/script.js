let order = [];

function addItem(name, price) {
    const quantity = 1;
    order.push({ name, price, quantity });
    
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

    const whatsappNumber = "5521966454694";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
}

// Adicionando event listeners para abrir e fechar o popup
document.getElementById('openCartButton').addEventListener('click', openCartPopup);
document.getElementById('closeCartPopup').addEventListener('click', closeCartPopup);

// Fechar o popup quando clicar fora dele
window.onclick = function(event) {
    const cartPopup = document.getElementById('cartPopup');
    if (event.target === cartPopup) {
        closeCartPopup();
    }
};

// Seleciona todos os elementos com a classe 'botaoAdicionar' e adiciona o evento de clique a cada um
var buttons = document.getElementsByClassName('botaoAdicionar');

// Itera sobre todos os elementos com a classe 'botaoAdicionar'
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var button = this;
        button.textContent = 'Adicionado ao carrinho'; // Altera o texto do botão para "Adicionado"
        button.classList.add('changed'); // Adiciona a classe para alterar a cor do botão

        setTimeout(function() {
            button.textContent = 'Adicionar'; // Retorna o texto do botão para "Clique aqui"
            button.classList.remove('changed'); // Remove a classe após 3 segundos
        }, 3000); // 3000 milissegundos = 3 segundos
    });
}
var botoesAdicionar = document.getElementsByClassName('botaoAdicionar');
for(var i = 0; i < botoesAdicionar.length; i++) {
    botoesAdicionar[i].addEventListener('click', function(event) {
        event.stopPropagation();
    });
}



window.addEventListener('scroll', function() {
    var stickyElement = document.getElementById('stickyElement');
    var stickyContainer = document.querySelector('.sticky-container');
    var stickyContainerOffset = stickyContainer.offsetTop;
    
    if (window.pageYOffset >= stickyContainerOffset) {
        stickyElement.classList.add('sticky');
    } else {
        stickyElement.classList.remove('sticky');
    }
});





function openItemDetails(name, price, image, description) {
    var modal = document.getElementById("itemModal");
    document.getElementById("itemName").innerText = name;
    document.getElementById("itemPrice").innerText = price;
    document.getElementById("itemImage").src = image; // Adiciona a imagem ao modal
    document.getElementById("itemDescription").innerText = description; // Adiciona a descrição ao modal
    document.getElementById("addToCartButton").onclick = function() {
        addItem(name, price);
        modal.style.display = "none";
    };
    modal.style.display = "block";
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}