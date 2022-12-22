
// Importando módulos functions, variables y DOM
import {domExport} from './DOM.js'
import {variablesExport} from './variables.js'
import {functionExport} from './functions.js'

// Pidiendo información desde json local
const traerDatos = () =>{
    fetch('https://www.mockachino.com/2db31ba0-0410-4e/users')
    .then((response) => response.json())
    .then((datos) => {
        // Volcando al array de productos el contenido del json
        variablesExport.stockCubiertas = datos.data
        // Llamado a la function para mostrar los productos en DOM
        mostrarCarrito()
    })
}

// Trayendo la información del carrito desde el storage
if (JSON.parse(sessionStorage.getItem('carrito')) == null || variablesExport.carrito.length == 0){
    // Si lo encuentra vacío (en storage o en la variable), pide ir a la página de compra
    functionExport.msjCarritoVacio()
} else{
    // Si hay datos, los carga del storage
    cargarCarritoStorage()
    // Fetch json local
    traerDatos()
}

function mostrarCarrito() {
    if (variablesExport.carrito.length !== 0){
        // Total precio carrito que viene del preview html ventacubiertas en 0, el total para el html carrito se maneja de forma independiente y se va actualizando en caso de continuar comprando
        variablesExport.totalPreviewCarrito = 0
        // Quitando los repetidos para no mostrar un producto adicional igual en el carrito cada vez que se hace click en agregar
        const productosRepetidos = [...new Set(variablesExport.carrito)]
        for (let idProducto of productosRepetidos){
            // Obtener producto del array que coincida con el id
            const productoPorId = variablesExport.stockCubiertas.filter(idStockCubiertas => idStockCubiertas.id == idProducto)
            // Ver en el array del carrito cuántos repetidos hay
            const unidadesProducto = variablesExport.carrito.reduce((total, id) => {
                // Si coinciden los id, los sumo al total
                return id === idProducto ? total += 1 : total
            }, 0)
            // Añadiendo vistas de cada producto comprado al html carrito
            domExport.prodCarrito.innerHTML += `<div class="producto">
                                                <p class="descripcionCubierta">${productoPorId[0].descripcion}</p>
                                                <div class="imgProducto"><img src="../img/catalogos/cubiertas/${productoPorId[0].descripcion}.png" alt="imagen-cubierta-${productoPorId[0].descripcion}"></div>
                                                <p class="medidaCubierta">${productoPorId[0].medida}</p>
                                                <p class="precioCubierta"><strong>$${productoPorId[0].precio}</strong><span class="btnQuitar"><img class="imgCesto ${productoPorId[0].id}" src="../img/cesto.png" alt="quitar item carrito"></span></p>
                                                <p class="cantidad">Cantidad: ${unidadesProducto}</p>
                                                <p class="subTotal"><strong>Subtotal: </strong>$${productoPorId[0].precio * unidadesProducto}
                                            </div>`
        // Subtotal x productos
        variablesExport.subTotal = productoPorId[0].precio * unidadesProducto
        // Actualizando total precio carrito 
        variablesExport.totalPreviewCarrito += variablesExport.subTotal
        // Guardando en storage total precio carrito para referencia en html ventacubiertas
        functionExport.guardarCarritoStorage()
        // Añandiendo al DOM carrito el precio total de la compra
        domExport.totalCompra.innerHTML = `<strong>Total de su compra: </strong>$${variablesExport.totalPreviewCarrito}`
        // Function para remover productos
        removerProducto()
        }
    } else{
        // Seteo total preview carrito a 0
        variablesExport.totalPreviewCarrito = 0
        sessionStorage.setItem('totalPreviewCarrito', JSON.stringify(variablesExport.totalPreviewCarrito))
        // Mostar msj carrito vacío
        functionExport.msjCarritoVacio()
    }
}

// Function remover producto
function removerProducto() {
        // Bucle para botones remover producto carrito
        for (let i=0; i < domExport.btnQuitarProducto.length; i++){
            domExport.btnQuitarProducto[i].addEventListener("click", function (){
                // Asignando el id del producto removido
                let idProductoRemovido = this.classList[1]
                // Generando array sin los productos removidos
                let productosRemovidos = variablesExport.carrito.filter(id => id !== idProductoRemovido)
                // Asignando el array resultante al carrito
                variablesExport.carrito = productosRemovidos
                // Guardando nuevo carrito en storage
                functionExport.guardarCarritoStorage()
                // Limpiar DOM carrito
                domExport.prodCarrito.innerHTML = ''
                // Volver a llenar DOM carrito sin los productos borrados
                mostrarCarrito()
            }, false)
        }
}

// Evento botón finalizar compra
domExport.btnFinalizarCompra.addEventListener('click', function() {
    finCompra()
})

// Function finalizar compra
function finCompra(){
    // Obtener datos email para msj final de carrito
    let emailSessionStorage = JSON.parse(sessionStorage.getItem('email'))
    swal({
        title: "¡Muchas gracias!",
        text: `Hemos enviado un mail a su casilla ${emailSessionStorage} con los datos para el pago`,
        icon: "success",
        button: "Cerrar",
    });
    // Vaciar carrito
    variablesExport.carrito = []
    // Vaciar storage
    sessionStorage.clear()
    // Ocultar botones acciones carrito
    domExport.accionesCarrito.style.display = 'none'
    // Mensaje DOM carrito compra finalizada
    domExport.prodCarrito.innerHTML = `<br><br><strong>¡MUCHAS GRACIAS POR SU COMPRA!</strong><br><br>DIRIJASE A LA <a href="./ventacubiertas.html">PAGINA DE VENTAS</a> PARA REALIZAR UNA NUEVA COMPRA`
    domExport.prodCarrito.style.textAlign = 'center'
}

// Function para cargar datos del storage si los hubiera
function cargarCarritoStorage () {
    sessionStorage.getItem('carrito') !== null ? variablesExport.carrito = JSON.parse(sessionStorage.getItem('carrito')) : false
}
