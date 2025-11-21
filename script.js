// 1. Previsualizar imagen
document.getElementById("imagen").addEventListener("change", function(event) {
    const archivo = event.target.files[0];
    const preview = document.getElementById("imgPreview");
    const container = document.getElementById("previewContainer");
    const labelSpan = document.querySelector(".upload-label span");

    if (archivo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            container.classList.remove("hidden");
            labelSpan.innerText = archivo.name;
        }
        reader.readAsDataURL(archivo);
    } else {
        container.classList.add("hidden");
        preview.src = "";
        labelSpan.innerText = "Clic aquí para buscar imagen";
    }
});

// 2. Guardar en Base de Datos
document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const inputImagen = document.getElementById("imagen");

    // Función auxiliar para procesar el guardado
    const procesarGuardado = (imgBase64) => {
        const nuevoProducto = {
            id: Date.now(),
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            imagen: imgBase64
        };

        // Obtenemos la lista actual o creamos una vacía
        let listaProductos = JSON.parse(localStorage.getItem("mis_productos")) || [];
        listaProductos.push(nuevoProducto);
        
        // Guardamos la lista actualizada
        localStorage.setItem("mis_productos", JSON.stringify(listaProductos));

        Swal.fire({
            title: '¡Guardado!',
            text: 'Producto registrado con éxito.',
            icon: 'success',
            confirmButtonColor: '#6200ea'
        });

        document.getElementById("formProducto").reset();
        document.getElementById("previewContainer").classList.add("hidden");
        document.querySelector(".upload-label span").innerText = "Clic aquí para buscar imagen";
    };

    if (inputImagen.files?.[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            procesarGuardado(event.target.result);
        };
        reader.readAsDataURL(inputImagen.files[0]);
    } else {
        procesarGuardado("https://via.placeholder.com/150?text=Sin+Imagen");
    }
});