document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarProductos() {
    // Usamos el ID que mostraste en tu imagen
    const contenedor = document.getElementById("reporteData");
    const mensajeVacio = document.getElementById("mensajeVacio");
    
    // Obtenemos la lista (Array) en lugar de un solo objeto
    const data = JSON.parse(localStorage.getItem("mis_productos")) || [];

    contenedor.innerHTML = ""; // Limpiar antes de pintar

    if (data.length === 0) {
        mensajeVacio.classList.remove("hidden");
    } else {
        mensajeVacio.classList.add("hidden");
        
        // Recorremos CADA producto guardado
        data.forEach((producto, index) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("product-card");

            // Usamos los Template Strings (backticks) como en tu foto
            tarjeta.innerHTML = `
                <div class="card-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="card-info">
                    <h3>${producto.nombre}</h3>
                    <p class="desc"><strong>Descripción:</strong> ${producto.descripcion}</p>
                    <div class="card-footer">
                        <span class="price">$${producto.precio}</span>
                        <button onclick="eliminarProducto(${index})" class="btn-delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });
    }
}

// Función extra para borrar
globalThis.eliminarProducto = function(index) {
    Swal.fire({
        title: '¿Borrar producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
    }).then((result) => {
        if (result.isConfirmed) {
            let lista = JSON.parse(localStorage.getItem("mis_productos")) || [];
            lista.splice(index, 1);
            localStorage.setItem("mis_productos", JSON.stringify(lista));
            cargarProductos(); // Recargar la lista
            Swal.fire('Eliminado', '', 'success');
        }
    });
}