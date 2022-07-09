const Catalogo = [
    { id: 1, nombre: "remera", img: "./images/remera.jpg", cantidad: 1, descripcion: "jorgelin22", precio: 200},
    { id: 2, nombre: "pantalon", img: "./images/pantalon.webp", cantidad: 1, descripcion: "jorgelin23", precio: 200},
    { id: 3, nombre: "buzo", img: "./images/buzo.webp", cantidad: 1, descripcion: "jorgelin24", precio: 200}
];

const Carrito = [];

for (const producto of Catalogo) {
    let cardContainer = document.getElementById(`card-container`)
    cardContainer.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src=${producto.img} class="card-img" alt="...">
    <div class="card-body">
      <h2 class="card-title">${producto.nombre}</h2>
      <p class="card-desc">${producto.descripcion}</p>
      <p class="card-precio">${producto.precio}</p>
      <p>${producto.id}</p>
      <button id="botonAgregarCarrito" class="btn btn-primary" onClick="clickAgregarCarrito(${producto.id})">Agregar al carrito</button>
    </div>
  </div>
    `
}

const agregarCarrito = () => {
console.log("click");
}

// const botonAgregarCarrito = document.querySelectorAll("#botonAgregarCarrito")
// botonAgregarCarrito.forEach((e)=>{
//     e.addEventListener("click", clickAgregarCarrito)
// })

function clickAgregarCarrito(id) {
    let producto = Catalogo.find(producto => producto.id === id);

    let productoEnCarrito = Carrito.find(productoEnCarrito => productoEnCarrito.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        console.log(Carrito);
    } else {
        producto.cantidad = 1;
        Carrito.push(producto);
        console.log(Carrito);
    }
}

// function clickAgregarCarrito(event) {
//     const boton = event.target;
//     const item = boton.closest(".card")
//     const itemTitle = item.querySelector(".card-title").textContent;
//     const itemImg = item.querySelector(".card-img").src;
//     const itemDesc = item.querySelector(".card-desc").textContent;
//     const itemPrice = item.querySelector(".card-precio").textContent;
// }
