icecreamSection.innerHTML += `
        <div class="relative flex p-2 gap-2 rounded-md justify-between items-center bg-white/50 md:bg-white/0 md:flex-col md:justify-between md:p-0"
            style={{backgroundColor:${colors[i]}}}>

            <h3 class="font-semibold rounded-lg text-purple-900 md:max-w-[11rem] md:text-center md:absolute md:w-full md:bg-white/70">${item.name}</h3>
            <div class="hidden md:block">
              <img class="w-44 h-48 rounded-lg " src=${item.image} alt=${item.name} />
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