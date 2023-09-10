let productosSeleccionados = [];

function agregarProducto() {
    let producto = document.getElementById("producto").value;
    let localidad = document.getElementById("localidad").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);

    productosSeleccionados.push({ producto, localidad, cantidad });


    let listaProductos = document.getElementById("listaProductos");
    let li = document.createElement("li");
    li.textContent = `${cantidad} ${producto}(s) con envío a ${localidad}`;
    listaProductos.appendChild(li);

    console.log(`Producto agregado: ${cantidad} ${producto}(s) con envío a ${localidad}`);
}

function calcularCostoProducto(producto) {
    let preciosProductos = {
        A: 20,
        B: 25,
        C: 35
    };

    console.log(`Producto seleccionado: ${producto}`);
    return preciosProductos[producto] || 0;
}

function calcularCostoLocalidad(localidad) {
    let preciosLocalidades = {
        Montevideo: 100,
        Canelones: 250,
        Maldonado: 400
    };

    console.log(`Localidad seleccionada: ${localidad}`);
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
            console.log(`Se aplicó un descuento del 10% para ${cantidad} ${producto}(s).`);
        } else if (cantidad > 1) {
            costoProducto *= 0.95;
            console.log(`Se aplicó un descuento del 5% para ${cantidad} ${producto}(s).`);
        }

        let costoProductoTotal = costoProducto * cantidad;
        costoTotal += costoProductoTotal;
        console.log(`El costo total de ${cantidad} ${producto}(s) con envío a ${localidad} es de: $${costoProductoTotal.toFixed(2)}`);
    }

    console.log(`El costo total de todos los productos es de: $${costoTotal.toFixed(2)}`);


    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `El costo total de todos los productos es de: $${costoTotal.toFixed(2)}`;
}