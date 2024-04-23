const menu = document.getElementById("menu")
const cartModal = document.getElementById("cart-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const cartBtn = document.getElementById("cart-btn");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("btn-checkout");
const address = document.getElementById("address");
const addressError = document.getElementById("address-error");
const cartCounter = document.getElementById("cart-count");


let cart = [];

// Abrir modal 
cartBtn.addEventListener("click", () => {
  updateCartModal();

  cartModal.style.display = "flex";
});

// Fechar modal
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

btnCloseModal.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Adicionar ao carrinho
menu.addEventListener("click", (event) => {
  let parentBtn = event.target.closest(".btn-add-to-cart");
  if (parentBtn) {
    const name = parentBtn.getAttribute("data-name");
    const price = parseFloat(parentBtn.getAttribute("data-price"));
    addToCart(name, price);
  }

});

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    existingItem.quantity++;
  }
  else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
  updateCartModal();
}

function updateCartModal() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium">${item.name}</p>  
        <p>Qtde: ${item.quantity}</p>  
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>    
      </div>

      <button class="btn-remove-item" data-name="${item.name}">Remover</button>

    </div>
    `

    total += item.price * item.quantity;

    cartItems.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerText = cart.length;
}

// Remover do carrinho
cartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove-item")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity--;
      updateCartModal();
      return
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}

address.addEventListener("input", (event) => {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    address.classList.remove("border-red-500");
    addressError.classList.add("hidden");
  }
})

checkoutBtn.addEventListener("click", () => {
  const isOpen = checkRestaurantAvailability();

  if (!isOpen) {
    Toastify({
      text: "O restaurate está fechado!",
      duaration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,

      style: {
        background: "#ef4444",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) return;

  if (address.value === "") {
    addressError.classList.remove("hidden");
    address.classList.add("border-red-500");
    return;
  }

  const cartItems = cart.map((item) => {
    return (
      `${item.name} Quantidade: (${item.quantity}) Preço R$${item.price} \n `
    )
  }).join("");

  const message = encodeURIComponent(cartItems);
  const phone = "31986482092";

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${address.value} Total: ${cartTotal.textContent}`, "_blank");

  cart = [];
  address.value = "";
  updateCartModal();
});

function checkRestaurantAvailability() {
  const data = new Date();
  const hour = data.getHours();
  return hour >= 18;
}

const workingHours = document.getElementById("date-span");
const isOpen = checkRestaurantAvailability();

if (isOpen) {
  workingHours.classList.remove("bg-red-500");
  workingHours.classList.add("bg-green-500");
} else {
  workingHours.classList.remove("bg-green-500");
  workingHours.classList.add("bg-red-500");
}