document.addEventListener("DOMContentLoaded", function() {
    let preciosLocalidades = {
        Montevideo: 100,
        Canelones: 250,
        Maldonado: 400
    };

    const obtenerNombreUsuario = () => {
        const nombreUsuario = localStorage.getItem('nombreUsuario') ?? 'Usuario';
        return nombreUsuario;
    };

    const DateTime = luxon.DateTime;
    const now = DateTime.now();
    const fechaHoraActualElement = document.getElementById('fecha-hora-actual');

    fechaHoraActualElement.textContent = 'Fecha y hora actual: ' + now.toLocaleString(DateTime.DATETIME_FULL);

    fetch('productos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo cargar los datos.');
            }
            return response.json();
        })
        .then((data) => {
            const preciosProductos = data.preciosProductos;

            let productosSeleccionados = cargarProductosDesdeStorage();

            function mostrarCostoTotal(nombreUsuario, costoTotal) {
                const resultadoElement = document.getElementById('resultado');
                resultadoElement.textContent = `Hola, ${nombreUsuario}! El costo total es: $${costoTotal.toFixed(2)}`;
            }

            function actualizarProductosEnStorage() {
                localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
            }

            function cargarProductosDesdeStorage() {
                const productosGuardados = localStorage.getItem('productosSeleccionados');
                return productosGuardados ? JSON.parse(productosGuardados) : [];
            }

            function agregarProducto(producto, localidad, cantidad) {
                const productoExistente = productosSeleccionados.find(({ producto: p, localidad: l }) => p === producto && l === localidad);
                if (productoExistente) {
                    productoExistente.cantidad += cantidad;
                } else {
                    productosSeleccionados.push({ producto, localidad, cantidad });
                }
                actualizarProductosEnStorage();
                mostrarResultados();
            }

            function mostrarResultados() {
                const listaProductosElement = document.getElementById('listaProductos');
                listaProductosElement.innerHTML = '';

                productosSeleccionados.forEach(producto => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${producto.cantidad} ${producto.producto}(s) con envío a ${producto.localidad}`;
                    listaProductosElement.appendChild(listItem);
                });
            }

            const agregarProductoButton = document.getElementById('agregarprd');
            agregarProductoButton.addEventListener('click', function() {
                const producto = document.getElementById('producto').value;
                const localidad = document.getElementById('localidad').value;
                const cantidad = parseInt(document.getElementById('cantidad').value);

                agregarProducto(producto, localidad, cantidad);
            });

            const calcularCostoTotalBtn = document.getElementById('calcularCostoTotalBtn');
            calcularCostoTotalBtn.addEventListener('click', function() {
                calcularCostoTotal();
            });

            function calcularCostoTotal() {
                let costoTotal = 0;

                for (let i = 0; i < productosSeleccionados.length; i++) {
                    const { producto, localidad, cantidad } = productosSeleccionados[i];

                    let costoProducto = preciosProductos[producto];
                    const costoLocalidad = preciosLocalidades[localidad];

                    if (cantidad > 3) {
                        costoProducto *= 0.9;
                    } else if (cantidad > 1) {
                        costoProducto *= 0.95;
                    }

                    const costoProductoTotal = costoProducto * cantidad;
                    costoTotal += costoProductoTotal;
                }

                const nombreUsuario = document.getElementById('nombreUsuario').value;
                mostrarCostoTotal(nombreUsuario, costoTotal);
            }

            const busquedaProductoBtn = document.getElementById('busquedaProductoBtn');
            busquedaProductoBtn.addEventListener('click', function() {
                buscarProductoPorNombre();
            });

            function buscarProductoPorNombre() {
                const nombreProductoBuscado = document.getElementById('busquedaProducto').value;
                const resultadosBusqueda = productosSeleccionados.filter(producto => producto.producto === nombreProductoBuscado);
                mostrarResultadosBusqueda(resultadosBusqueda);
            }

            function mostrarResultadosBusqueda(resultados) {
                const resultadoBusquedaElement = document.getElementById('resultadoBusqueda');
                resultadoBusquedaElement.innerHTML = '';

                const mensaje = resultados.length === 0 ? "El producto no se encuentra disponible." : '';

                if (resultados.length === 0) {
                    resultadoBusquedaElement.textContent = mensaje;
                } else {
                    const listaResultados = document.createElement('ul');
                    resultados.forEach(producto => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${producto.cantidad} ${producto.producto}(s) con envío a ${producto.localidad}`;
                        listaResultados.appendChild(listItem);
                    });
                    resultadoBusquedaElement.appendChild(listaResultados);
                }
            }

            const filtrarLocalidadBtn = document.getElementById('filtrarLocalidadBtn');
            filtrarLocalidadBtn.addEventListener('click', function() {
                filtrarProductosPorLocalidad();
            });

            function filtrarProductosPorLocalidad() {
                const localidadFiltrar = document.getElementById('filtrarLocalidad').value;
                const resultadosFiltrados = productosSeleccionados.filter(producto => producto.localidad === localidadFiltrar);
                mostrarResultadosBusqueda(resultadosFiltrados);
            }

            const clearProductosBtn = document.getElementById('clearProductosBtn');
            clearProductosBtn.addEventListener('click', function() {
                productosSeleccionados = [];
                actualizarProductosEnStorage();
                mostrarResultados();
                const resultadoElement = document.getElementById('resultado');
                resultadoElement.textContent = '';

                document.getElementById('busquedaProducto').value = '';
                document.getElementById('filtrarLocalidad').value = '';

                document.getElementById('resultadoBusqueda').innerHTML = '';
            });

            const nombreUsuario = obtenerNombreUsuario();
            mostrarResultados();
        })
        .catch((error) => {
            const resultadoElement = document.getElementById('resultado');
            resultadoElement.textContent = 'Error: ' + error.message;
        });
});
