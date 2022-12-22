
// Si hay datos en carrito localStorage los trae, sino declara el carrito vacío
const carrito = JSON.parse(sessionStorage.getItem('carrito')) !== null ? JSON.parse(sessionStorage.getItem('carrito')) : []
const stockCubiertas = []
const nombreUsuario = ''
const email = ''
const html = ''
// Si hay datos en el precio total del preview del carrito en html ventacubiertas, los trae.  Sino vacío
let totalPreviewCarrito = JSON.parse(sessionStorage.getItem('totalPreviewCarrito')) !== null ? JSON.parse(sessionStorage.getItem('totalPreviewCarrito')) : 0
let subTotal = 0

// Objeto de variables a exportar
export const variablesExport = {
    stockCubiertas,
    carrito,
    nombreUsuario,
    email,
    html,
    totalPreviewCarrito,
    subTotal
}