
// Selectores DOM
const contenedorProductos = document.querySelector(".grillaProductos")
const grillaWrapper = document.querySelector(".grillaWrapper")
const btnContinuarCompra = document.querySelector(".btnContinuarCompra")
const alertaCompra = document.querySelector(".alertaCompra")
const btnAgregar = document.getElementsByClassName("btnAgregarProducto")
const DOMCarrito = document.querySelector(".carrito")
const prodCarrito = document.querySelector(".productosCarrito")
const nombreApellido = document.querySelector(".nombreApellido")
const email = document.querySelector(".email")
const btnFinalizarCompra = document.querySelector('.finCompra')
const accionesCarrito = document.querySelector('.accionesCarrito')
const totalCompra = document.querySelector('.totalCompra')
const btnQuitarProducto = document.getElementsByClassName('imgCesto')

// Objeto de DOM a exportar
export const domExport = {
    contenedorProductos,
    grillaWrapper,
    btnContinuarCompra,
    alertaCompra,
    btnAgregar,
    DOMCarrito,
    prodCarrito,
    nombreApellido,
    email,
    btnFinalizarCompra,
    accionesCarrito,
    totalCompra,
    btnQuitarProducto
}