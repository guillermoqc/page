// Lista de productos simulada
const products = [
    { id: 1, name: "Balon No.5 Champions League 2024-2025", price: 399.99,image: "ball.png"  },
    { id: 2, name: "Nike Zoom Mercurial Superfly 10 Elite FG Firm Ground Soccer Cleat", price: 3000.00,image: "mercurialsuperfli10elitefg.png"  },
    { id: 3, name: "Nike VaporGrip 3 Dynamic Fit Goalkeeper Gloves - Black/White", price: 1500,image: "NikeVaporGrip3DynamicFit.png"}
  ];
  
  // Variables de referencia
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountDisplay = document.getElementById('cart-count');
  const cartItemsDisplay = document.getElementById('cart-items');
  const cartTotalDisplay = document.getElementById('cart-total');
  
  // Renderizar productos en la página
  function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpia cualquier contenido existente
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col-md-4');
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Q${product.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }
  
  
  // Añadir producto al carrito
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
  }
  
  // Actualizar carrito en pantalla y localStorage
  function updateCart() {
    cartCountDisplay.textContent = cart.length;
    cartItemsDisplay.innerHTML = '';
  
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const cartItem = document.createElement('li');
      cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      cartItem.innerHTML = `
        ${item.name} - Q${item.price.toFixed(2)}
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsDisplay.appendChild(cartItem);
    });
  
    cartTotalDisplay.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Eliminar producto del carrito
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  // Limpiar carrito
  document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
  });
  
  // Renderizar productos y actualizar carrito al cargar la página
  renderProducts();
  updateCart();
  