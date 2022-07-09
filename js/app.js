const Catalogo = [
    { id: 1, nombre: "remera", img: "./images/remera.jpg", cantidad: 1, descripcion: "una remera...", precio: 200, stock: true },
    { id: 2, nombre: "pantalon", img: "./images/pantalon.webp", cantidad: 1, descripcion: "un pantalon...", precio: 200, stock: true },
    { id: 3, nombre: "buzo", img: "./images/buzo.webp", cantidad: 1, descripcion: "un buzo...", precio: 200, stock: false }
];

const Carrito = [];

//CREADOR DE CARDS IF STOCK=TRUE

for (const iterador of Catalogo) {
    if (iterador.stock) {
        const cardContainer = document.querySelector("#card-container")
        const cardHTML = `
        <div class="card-container">
            <img src=${iterador.img} alt="">
            <div class="inner-card-container">
              <p>${iterador.nombre}</p>
              <p>${iterador.descripcion}</p>
            </div>
            <p>${iterador.precio}</p>
            <button class="btn-agregarCarrito" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
        </div>
        `
        cardContainer.innerHTML += cardHTML
    }
}

//Funcion agregar al carrito
function agregarAlCarrito(id) {
    
    let buscarProductoEnCatalogo = Catalogo.find(buscarId => buscarId.id ===id)
    
    let buscarProductoEnCarrito = Carrito.find(buscarId => buscarId.id ===id)

    if (buscarProductoEnCarrito) {
        buscarProductoEnCarrito.cantidad++
        console.log(Carrito);
        actualizarCarritoHTML()
    } else {
        buscarProductoEnCatalogo.cantidad = 1;
        Carrito.push(buscarProductoEnCatalogo);
        console.log(Carrito);
        actualizarCarritoHTML()
    }
}

//CREADOR DE CARRITO EN HTML
function actualizarCarritoHTML() {
    
    let carritoHTML = ""
    const carritoHTMLContainer = document.querySelector(".carrito-dropdown-container");

for (const iterador of Carrito) {
        carritoHTML += `
        <div class="card-container">
            <img src=${iterador.img} alt="">
            <div class="inner-card-container">
              <p>${iterador.nombre}</p>
              <p>${iterador.descripcion}</p>
            </div>
            <p>${iterador.precio}</p>
            <p>${iterador.cantidad}</p>
        </div>
        `;
        carritoHTMLContainer.innerHTML = carritoHTML
    }
}