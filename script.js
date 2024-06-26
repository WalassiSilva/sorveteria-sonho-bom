const menu = document.getElementById("menu")
const cartModal = document.getElementById("cart-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const cartBtn = document.getElementById("cart-btn");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("btn-checkout");
const payment = document.getElementById("payment");
const cartCounter = document.getElementById("cart-count");

const waterBaseSection = document.getElementById("water-base-section");
const specialSection = document.getElementById("special-section");
const coversSection = document.getElementById("covers-section");
const customerName = document.getElementById("customer-name");
const icecreamSection = document.getElementById("icecream-section");
const dropdownList = document.getElementById("dropdown-list");
const acaiBtn = document.getElementById("acai-btn");


let cart = [];

// Mostrar dropdown
dropdownList.addEventListener("click", () => {
  dropdownList.classList.toggle("group");
})

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

  const existingItem = cart.find(item => item.name === name && item.price === price);

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


// Listar picoles de cobertura
fetch("data.json").then((response) => {
  response.json().then((data) => {
    data.covers.map((item) => {
      coversSection.innerHTML += `
        <div class="flex flex-col items-center justify-center gap-2 py-2 rounded-lg">
        <div class="relative">
        <h3 class="font-bold z-10 lg:text-xl text-md text-purple-800 bg-white/70 w-full max-w-[11rem] text-center rounded-lg absolute">${item.name}</h3>
        <img src=${item.image} alt=${item.name}
          class="w-44 h-64 rounded-lg hover:scale-110 hover:-rotate-2 duration-300 object-cover" />
        </div>

        <div class="h-full flex flex-col justify-between ">

        <button class="bg-purple-900 w-10 h-10 rounded-full btn-add-to-cart active:bg-purple-700 hover:scale-110 tranform -translate-y-5 z-10"

            data-name="Picolé: ${item.name}" data-price=${item.price}>

            <i class="fa fa-cart-plus text-white"></i>
          </button>
          </div>
        </div>
        `;
    })
  })
})

// Listar picoles especiais
fetch("data.json").then((response) => {
  response.json().then((data) => {
    data.specials.map((item) => {
      specialSection.innerHTML += `
        <div class="flex flex-col items-center justify-center gap-2 py-2 rounded-lg">
        <div class="relative">
        <h3 class="font-bold z-10 lg:text-xl text-md text-purple-800 bg-white/70 w-full max-w-[11rem] text-center rounded-lg absolute">${item.name}</h3>
        <img src=${item.image} alt=${item.name}
          class="w-44 h-48 rounded-lg hover:scale-110 hover:-rotate-2 duration-300" />
        </div>

        <div class="h-full flex flex-col justify-between ">

          <button class="bg-purple-900 w-10 h-10 rounded-full btn-add-to-cart active:bg-purple-700 hover:scale-110 transform -translate-y-5"

            data-name="Picolé: ${item.name}" data-price=${item.price}>

            <i class="fa fa-cart-plus text-white"></i>
          </button>
          </div>
        </div>
        `;
    })
  })
})
// Listar picoles a base de agua
fetch("data.json").then((response) => {
  response.json().then((data) => {
    data.water_bases.map((item) => {
      waterBaseSection.innerHTML += `
        <div class="flex flex-col items-center justify-center gap-2 py-2 rounded-lg">
        <div class="relative">
        <h3 class="font-bold z-10 lg:text-xl text-md text-purple-800 bg-white/70 w-full max-w-[11rem] text-center rounded-lg absolute">${item.name}</h3>
        <img src=${item.image} alt=${item.name}
          class="w-44 h-48 rounded-lg hover:scale-110 hover:-rotate-2 duration-300" />
        </div>

        <div class="h-full flex flex-col justify-between ">

          <button class="bg-purple-900 w-10 h-10 rounded-full btn-add-to-cart active:bg-purple-700 hover:scale-110 transform -translate-y-5"

            data-name="Picolé: ${item.name}" data-price=${item.price}>

            <i class="fa fa-cart-plus text-white"></i>
          </button>
          </div>
        </div>
        `;
    })
  })
})

// Listar sorvetes
fetch("data.json").then((response) => {
  response.json().then((data) => {
    let colors = [];
    data.icecreams.map((item, i) => {
      colors.push(item.bg_color);

      icecreamSection.innerHTML += `
      <div class="flex flex-col items-center justify-center gap-2 py-2 rounded-lg">
      <div class="relative">
        <h3 class="font-bold z-10 lg:text-xl text-md text-purple-800 bg-white/70 w-full max-w-[11rem] text-center rounded-lg absolute">${item.name}</h3>
        <img src=${item.image} alt=${item.name}
          class="w-44 h-48 rounded-lg hover:scale-110 hover:-rotate-2 duration-300" />
        </div>

            <div class="flex gap-2 md:justify-between md:m-2 md:my-0">
              <button class="btn-add-to-cart w-14 h-10 text-sm shadow-md font-semibold text-white bg-pink-800 hover:bg-pink-600 active:bg-purple-700 rounded-md transform hover:scale-105"  
              data-name="Sorvete: ${item.name}" data-price="${item.prices[0]}"
              >
                140ml
              </button>

              <button class="w-14 h-10 text-sm shadow-md btn-add-to-cart font-semibold text-white bg-purple-900 hover:bg-pink-600 active:bg-purple-700 rounded-md transform hover:scale-105"
                  data-name="Sorvete: ${item.name}" 
                  data-price="${item.prices[1]}">1L</button>
            </div>
        </div>
      `;


    })
  })
})

acaiBtn.innerHTML = `
  <button class="bg-purple-900 w-10 h-10 rounded-full btn-add-to-cart active:bg-purple-700 hover:scale-110 tranform -translate-y-5 z-10"

            data-name="Creme Açaí" data-price="20">

            <i class="fa fa-cart-plus text-white"></i>
          </button>
`;
function updateCartModal() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between border shadow-lg p-2">
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

  // cartCounter.innerText = cart.length;
  cartCounter.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
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

payment.addEventListener("input", (event) => {
  let inputValue = event.target.value;
  console.log(inputValue);
})

customerName.addEventListener("input", (event) => {
  let inputValue = event.target.value;
  console.log(inputValue);

})

checkoutBtn.addEventListener("click", () => {
  const isOpen = checkRestaurantAvailability();

  if (cart.length === 0) return;

  const cartItems = cart.map((item) => {
    return (
      `\n*${item.name}* Qtde: (${item.quantity}) Preço R$${item.price}`
    )
  }).join("");

  const message = encodeURIComponent(cartItems);
  const phone = "31985515747";//31984413076

  window.open(`https://wa.me/${phone}?text= *Nome: ${customerName.value}* ${message} \n Pagamento: ${payment.value}. *Total: ${cartTotal.textContent}*`, "_blank");

  cart = [];
  address.value = "";
  updateCartModal();
});

function checkRestaurantAvailability() {
  const data = new Date();
  const hour = data.getHours();
  return hour <= 20;
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
