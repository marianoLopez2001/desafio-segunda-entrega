//CATALOGO - CONTIENE LOS PRODUCTOS A AGREGAR AL CARRITO

const Catalogo = [
    { id: 1, nombre: "Leche", img: "./images/leche.jpg", cantidad: 1, descripcion: "una remera...", categoria: "Bebible", precio: 200, stock: true },
    { id: 2, nombre: "Huevos", img: "./images/huevo.jpg", cantidad: 1, descripcion: "un pantalon...", categoria: "Comestible", precio: 250, stock: true },
    { id: 4, nombre: "Jamon", img: "./images/jamon.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Comestible", precio: 350, stock: true },
    { id: 5, nombre: "Queso", img: "./images/queso.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Comestible", precio: 400, stock: true },
    { id: 6, nombre: "Pan lactal", img: "./images/panlactal.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Comestible", precio: 250, stock: false },
    { id: 7, nombre: "Harina", img: "./images/harina.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Comestible", precio: 150, stock: true },
    { id: 8, nombre: "Mayonesa", img: "./images/mayonesa.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Aderezo", precio: 150, stock: true },
    { id: 9, nombre: "Agua", img: "./images/agua.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Bebible", precio: 100, stock: true },
    { id: 10, nombre: "Coca Cola", img: "./images/coca.png", cantidad: 1, descripcion: "un buzo...", categoria: "Bebible", precio: 300, stock: true },
    { id: 11, nombre: "Oreos", img: "./images/oreo.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Galletitas", precio: 300, stock: true },
    { id: 12, nombre: "Sprite", img: "./images/sprite.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Bebible", precio: 150, stock: false },
    { id: 13, nombre: "Sonrisas", img: "./images/sonrisas.jpg", cantidad: 1, descripcion: "un buzo...", categoria: "Galletitas", precio: 250, stock: true },
    { id: 14, nombre: "Rollo de cocina", img: "./images/rollodecocina.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Limpieza", precio: 400, stock: true },
    { id: 15, nombre: "Jabon liquido", img: "./images/jabonliquido.webp", cantidad: 1, descripcion: "un buzo...", categoria: "Limpieza", precio: 800, stock: true }
];

//CARRITO DE COMPRAS

const Carrito = [];

//CREADOR DE CARDS IF STOCK=TRUE

let cardContainer

for (const iterador of Catalogo) {
    if (iterador.stock) {
        cardContainer = document.querySelector("#card-container")
        const cardHTML = `
        <div class="card-container">
            <img src=${iterador.img} alt="">
              <p>${iterador.nombre}</p>
              <p>${iterador.descripcion}</p>
              <p>Precio: ${iterador.precio}</p>
              <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
        </div>
        `
        cardContainer.innerHTML += cardHTML
    }
}

//FUNCION AGREGAR AL CARRITO SI LA CONDICION "STOCK" SE CUMPLE

function agregarAlCarrito(id) {

    let buscarProductoEnCatalogo = Catalogo.find(buscarId => buscarId.id === id)

    let buscarProductoEnCarrito = Carrito.find(buscarId => buscarId.id === id)

    if (buscarProductoEnCarrito) {
        buscarProductoEnCarrito.cantidad++
        actualizarCarritoHTML()
    } else {
        buscarProductoEnCatalogo.cantidad = 1;
        Carrito.push(buscarProductoEnCatalogo);
        actualizarCarritoHTML()
    }

    operacionTotal()

    objetoStorageSet()
}

//______________________________________---

function objetoStorageSet() {
    localStorage.setItem("Carrito", JSON.stringify(Carrito))
}

//_________________________________

let objetoStorageGet = JSON.parse(localStorage.getItem("Carrito"))

document.addEventListener("DOMContentLoaded", sevieneee())

function sevieneee() {
    if (objetoStorageGet) {
        objetoStorageGet.forEach(i => {
            Carrito.push(i)
        });
    } else {
        console.log("no hay nada en el storage");
    }
    console.log(Carrito);
}


let carritoHTMLContainer

//CREADOR DE CARRITO EN HTML
function actualizarCarritoHTML() {

    let carritoHTML = ""
    carritoHTMLContainer = document.querySelector(".carrito-dropdown-container");

    Carrito.forEach((iterador, id) => {
        carritoHTML += `
        <div class="card-container">
            <img src=${iterador.img} alt="">
            <div class="inner-card-container">
              <p>${iterador.nombre}</p>
              <p>${iterador.descripcion}</p>
            </div>
            <p>${iterador.precio}</p>
            <p>${iterador.cantidad}</p>
            <button class="botonEliminarCarrito" onClick="eliminarDelCarrito(${id})">Eliminar</button>
        </div>
        `;
    })

    carritoHTMLContainer.innerHTML = carritoHTML
}

//FUNCION ELIMINAR DEL CARRITO

let botonEliminarCarrito = document.querySelector(".botonEliminarCarrito")

function eliminarDelCarrito(id) {

    Carrito[id].cantidad--;

    if (Carrito[id].cantidad === 0) {
        operacionTotal()
        Carrito.splice(id, 1)
    }
    else {
        operacionTotal()
    }
    actualizarCarritoHTML()
};

//FUNCION QUE CALCULA EL TOTAL DE LA COMPRA Y LO MUESTRA EN EL DOM
function operacionTotal() {

    let costoTotal = 0

    Carrito.forEach((p) => {
        costoTotal += p.precio * p.cantidad;
    })

    const precioDom = document.querySelector("#dom-precio")

    precioDom.innerHTML = `Costo total: ${costoTotal}`
}

//OPCION DE FILTRADO POR CATEGORIA MARCA

function filtrarPorCategoria() {
    let llamadoSelectFilter = document.querySelector("#btn-filter").value

    const Filtrado = Catalogo.filter(marca => marca.categoria == llamadoSelectFilter)

    cardContainer.innerHTML = ""

    for (const iterador of Filtrado) {
        if (iterador.stock === true) {

            cardContainer.innerHTML += `
            <div class="card-container">
                <img src=${iterador.img} alt="">
                  <p>${iterador.nombre}</p>
                  <p>${iterador.descripcion}</p>
                  <p>Precio: ${iterador.precio}</p>
                  <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
            </div>
            `
        }
    }

    if (llamadoSelectFilter === "No filtrar") {
        for (const iterador of Catalogo) {
            if (iterador.stock === true) {

                cardContainer.innerHTML += `
                <div class="card-container">
                    <img src=${iterador.img} alt="">
                      <p>${iterador.nombre}</p>
                      <p>${iterador.descripcion}</p>
                      <p>Precio: ${iterador.precio}</p>
                      <button class="btn btn-primary" onClick="agregarAlCarrito(${iterador.id})">Agregar al carrito</button>
                </div>
                `
            }
        }

    }
}



