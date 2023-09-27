function obtenerNombreUsuario() {
    let nombre = prompt("Por favor, ingresa tu nombre:");
    return nombre || "Usuario"; 
}

function mostrarSaludo(nombreUsuario) {
    console.log(`Hola, ${nombreUsuario}! La página se ha cargado.`);
}

let nombreUsuario = obtenerNombreUsuario();
mostrarSaludo(nombreUsuario);

let productosSeleccionados = [];

function agregarProducto(producto, localidad, cantidad) {
    productosSeleccionados.push({ producto, localidad, cantidad });
}

function buscarProductoPorNombre(nombre) {
    const productoEncontrado = productosSeleccionados.find(producto => producto.producto === nombre);

    if (productoEncontrado) {
        console.log(`Producto encontrado: ${productoEncontrado.cantidad} ${productoEncontrado.producto}(s) con envío a ${productoEncontrado.localidad}`);
    } else {
        console.log(`Producto no encontrado.`);
    }

    return productoEncontrado;
}

function filtrarProductosPorLocalidad(localidad) {
    const productosFiltrados = productosSeleccionados.filter(producto => producto.localidad === localidad);

    if (productosFiltrados.length > 0) {
        console.log(`Productos encontrados en ${localidad}:`);
        productosFiltrados.forEach(producto => {
            console.log(`${producto.cantidad} ${producto.producto}(s) con envío a ${producto.localidad}`);
        });
    } else {
        console.log(`No se encontraron productos en ${localidad}.`);
    }

    return productosFiltrados;
}

const preciosProductos = {
    A: 20,
    B: 25,
    C: 35
};

const preciosLocalidades = {
    Montevideo: 100,
    Canelones: 250,
    Maldonado: 400
};

function calcularCostoProducto(producto) {
    return preciosProductos[producto] || 0;
}

function calcularCostoLocalidad(localidad) {
    return preciosLocalidades[localidad] || 0;
}

function calcularCostoTotal() {
    let costoTotal = 0;

    for (let i = 0; i < productosSeleccionados.length; i++) {
        let { producto, localidad, cantidad } = productosSeleccionados[i];
        
        let costoProducto = calcularCostoProducto(producto);
        let costoLocalidad = calcularCostoLocalidad(localidad);

        if (cantidad > 3) {
            costoProducto *= 0.9;
        } else if (cantidad > 1) {
            costoProducto *= 0.95;
        }

        let costoProductoTotal = costoProducto * cantidad;
        costoTotal += costoProductoTotal;
        console.log(`El costo total de ${cantidad} ${producto}(s) con envío a ${localidad} es de: $${costoProductoTotal.toFixed(2)}`);
    }

    console.log(`El costo total de todos los productos es de: $${costoTotal.toFixed(2)}`);
}

function mostrarOpcionesYSeleccionar(opciones) {
    const eleccion = prompt(opciones);

    return eleccion;
}

function iniciarSimulador() {
    while (true) {
        const opcion = prompt("Selecciona una opción:\n1. Agregar Producto\n2. Buscar Producto\n3. Filtrar por Localidad\n4. Calcular Costo Total\n5. Salir");

        switch (opcion) {
            case "1":
                const producto = prompt("Ingrese la letra del producto en mayuscula (A, B, C):");
                const localidad = prompt("Ingrese la localidad de envío (Montevideo, Canelones, Maldonado):");
                const cantidad = parseInt(prompt("Ingrese la cantidad de productos:"));
                agregarProducto(producto, localidad, cantidad);
                break;
            case "2":
                const nombreProductoABuscar = prompt("Ingrese la letra del producto a buscar:");
                buscarProductoPorNombre(nombreProductoABuscar);
                break;
            case "3":
                const localidadAFiltrar = prompt("Ingrese la localidad para filtrar los productos:");
                filtrarProductosPorLocalidad(localidadAFiltrar);
                break;
            case "4":
                calcularCostoTotal();
                break;
            case "5":
                return;
            default:
                alert("Opción no válida. Por favor, elija una opción válida.");
        }
    }
}

iniciarSimulador();
